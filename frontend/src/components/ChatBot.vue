<!-- ChatBot.vue -->
<template>
  <div class="chatbot-container" :class="{ 'chatbot-expanded': isOpen }">
    <!-- Chat button -->
    <button 
      @click="toggleChat" 
      class="chatbot-button"
      :class="{ 'chatbot-button-active': isOpen }"
    >
      <MessageCircle v-if="!isOpen" class="h-6 w-6" />
      <X v-else class="h-6 w-6" />
    </button>
    
    <!-- Chat window -->
    <div v-if="isOpen" class="chatbot-window">
      <!-- Chat header -->
      <div class="chatbot-header">
        <div class="flex items-center">
          <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
            <Bot class="h-5 w-5 text-blue-600" />
          </div>
          <h3 class="text-lg font-medium">Banking Assistant</h3>
        </div>
        <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Online</span>
      </div>
      
      <!-- Chat messages -->
      <div class="chatbot-messages" ref="messagesContainer">        <div 
          v-for="(message, index) in messages" 
          :key="index" 
          class="message"
          :class="message.sender === 'bot' ? 'message-bot' : 'message-user'"
        >
          <div class="message-content">
            <p v-if="typeof message.text === 'string'" v-html="formatMessage(message.text)"></p>
            <div v-else-if="message.type === 'balance'">
              <div class="balance-card">
                <h4 class="balance-title">Current Balance</h4>
                <div class="balance-amount">{{ formatCurrency(message.data.balance) }}</div>
                <div class="balance-status">
                  <span class="status-indicator" :class="getStatusClass(message.data.status)"></span>
                  <span>{{ getStatusText(message.data.status) }}</span>
                </div>
              </div>
            </div>
            
            <!-- Quick action buttons -->
            <div v-if="message.actions && message.actions.length" class="message-actions">
              <button 
                v-for="(action, actionIndex) in message.actions" 
                :key="actionIndex"
                @click="handleQuickAction(action.value)"
                class="action-button"
              >
                {{ action.label }}
              </button>
            </div>
          </div>
        </div>
        <div v-if="isTyping" class="message message-bot">
          <div class="message-content typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      <!-- Chat input -->
      <div class="chatbot-input">
        <input 
          type="text" 
          v-model="userInput" 
          @keyup.enter="sendMessage"
          placeholder="Ask a question..."
          class="chatbot-input-field"
          :disabled="isTyping"
        />
        <button 
          @click="sendMessage" 
          class="chatbot-send-button"
          :disabled="!userInput.trim() || isTyping"
        >
          <Send class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from 'vue';
import { MessageCircle, X, Bot, Send } from 'lucide-vue-next';
import axios from 'axios';
import api from '../services/api';
import ChatbotService from '../services/chatbot.service';

export default {
  name: 'ChatBot',
  components: {
    MessageCircle,
    X,
    Bot,
    Send
  },
  props: {
    customerData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isOpen = ref(false);
    const messages = ref([]);
    const userInput = ref('');
    const isTyping = ref(false);
    const messagesContainer = ref(null);
      // Load initial message when component mounts
    onMounted(() => {
      messages.value = [
        {
          sender: 'bot',
          text: `Hello ${props.customerData?.name || 'there'}! I'm your banking assistant. How can I help you today?<br><br>You can ask me about:<br>• Your account balance<br>• Recent transactions<br>• Banking FAQs<br>• Transfer instructions<br>• Deposit information`,
          actions: [
            { label: 'Check my balance', value: 'What is my current balance?' },
            { label: 'Recent transactions', value: 'Show my recent transactions' },
            { label: 'How to transfer money', value: 'How do I transfer money?' }
          ]
        }
      ];
    });
    
    // Watch for new messages to scroll to bottom
    watch(messages, () => {
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
      });
    }, { deep: true });
    
    // Format currency
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amount);
    };
    
    // Toggle chat window
    const toggleChat = () => {
      isOpen.value = !isOpen.value;
    };
      // Process and respond to user input
    const processUserInput = async (input) => {
      isTyping.value = true;
      
      try {
        const inputLower = input.toLowerCase();
          // Check for balance inquiry keywords
        if (inputLower.includes('balance') || inputLower.includes('how much') || inputLower.includes('my money')) {
          try {
            // Get real-time data from API using the service
            const response = await ChatbotService.getAccountInfo();
            if (response.data && response.data.status === 'success') {
              const accountInfo = response.data.data.customer;
                messages.value.push({
                sender: 'bot',
                type: 'balance',
                data: {
                  balance: accountInfo.balance,
                  status: accountInfo.status
                },
                actions: [
                  { label: 'Recent transactions', value: 'Show my recent transactions' },
                  { label: 'Make a deposit', value: 'How do I make a deposit?' }
                ]
              });
            } else {
              throw new Error('Could not retrieve account information');
            }
          } catch (error) {
            // Fallback to props if API fails
            messages.value.push({
              sender: 'bot',
              type: 'balance',
              data: {
                balance: props.customerData.balance,
                status: props.customerData.status
              }
            });
          }
        }
        // Check for transaction history keywords
        else if (inputLower.includes('transaction') || inputLower.includes('history') || inputLower.includes('recent')) {
          try {
            // Get recent transactions using the service
            const response = await ChatbotService.getRecentTransactions(3);
            if (response.data && response.data.status === 'success' && response.data.data.transactions.length > 0) {
              const transactions = response.data.data.transactions;
              let transactionText = 'Your most recent transactions:<br><br>';
              
              transactions.forEach((tx, index) => {
                const formattedDate = new Date(tx.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                });
                
                const formattedAmount = new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(tx.amount);
                
                transactionText += `${index + 1}. ${formattedDate} - ${tx.type.replace('_', ' ')} - ${formattedAmount}<br>`;
              });
              
              transactionText += '<br>You can view all transactions in the Transaction History section below.';
                messages.value.push({
                sender: 'bot',
                text: transactionText,
                actions: [
                  { label: 'Check balance', value: 'What is my current balance?' },
                  { label: 'Make a transfer', value: 'How do I transfer money?' }
                ]
              });
            } else {
              messages.value.push({
                sender: 'bot',
                text: `You don't have any recent transactions. Once you make transactions, they will be displayed in the Transaction History section below.`
              });
            }
          } catch (error) {
            messages.value.push({
              sender: 'bot',
              text: `You can view all your recent transactions in the Transaction History section below. The most recent transactions are displayed at the top.`
            });
          }
        }        else {
          // For other types of questions, use the backend chatbot API through the service
          try {
            const response = await ChatbotService.askQuestion(input);
            if (response.data && response.data.status === 'success') {
              messages.value.push({
                sender: 'bot',
                text: response.data.data.response
              });
            } else {
              throw new Error('Could not get response from chatbot API');
            }
          } catch (error) {
            // Fallback to local responses if API fails
            if (inputLower.includes('transfer') || inputLower.includes('send money')) {              messages.value.push({
                sender: 'bot',
                text: `To transfer money:<br>1. Click on the "Transfer" button in Quick Actions<br>2. Enter recipient's account details<br>3. Specify the amount<br>4. Review and confirm your transfer`,
                actions: [
                  { label: 'Check balance', value: 'What is my current balance?' },
                  { label: 'About deposits', value: 'How do I make a deposit?' }
                ]
              });            } else if (inputLower.includes('deposit') || inputLower.includes('add money')) {
              messages.value.push({
                sender: 'bot',
                text: `To make a deposit:<br>1. Click on the "Deposit" button in Quick Actions<br>2. Enter the deposit amount<br>3. Choose the deposit method<br>4. Follow the instructions to complete your deposit`,
                actions: [
                  { label: 'Check balance', value: 'What is my current balance?' },
                  { label: 'Transfer money', value: 'How do I transfer money?' }
                ]
              });
            } else if (inputLower.includes('card') || inputLower.includes('debit card')) {
              messages.value.push({
                sender: 'bot',
                text: `You can view your debit card details by clicking the "View your debit card" button in the Account Overview section.`
              });
            } else if (inputLower.includes('contact') || inputLower.includes('support') || inputLower.includes('help')) {
              messages.value.push({
                sender: 'bot',
                text: `For customer support:<br>• Email: support@bankingsystem.com<br>• Phone: 1800-123-4567<br>• Hours: Mon-Fri 9am-6pm`
              });
            } else {
              messages.value.push({
                sender: 'bot',
                text: `I'm sorry, I don't have information about that yet. For specific inquiries, please contact our customer support.`
              });
            }
          }
        }
      } catch (error) {
        console.error('Error processing chatbot input:', error);
        messages.value.push({
          sender: 'bot',
          text: `I'm having trouble processing your request at the moment. Please try again later.`
        });
      } finally {
        isTyping.value = false;
      }
    };
    
    // Send user message
    const sendMessage = async () => {
      const message = userInput.value.trim();
      if (!message || isTyping.value) return;
      
      // Add user message to chat
      messages.value.push({
        sender: 'user',
        text: message
      });
      
      userInput.value = '';
      
      // Process user input
      await processUserInput(message);
    };
    
    // Format message with line breaks
    const formatMessage = (text) => {
      return text;
    };
    
    // Get status class for styling
    const getStatusClass = (status) => {
      const normalizedStatus = status?.toLowerCase() || 'unknown';
      if (normalizedStatus === 'active') return 'status-active';
      if (['frozen', 'suspended'].includes(normalizedStatus)) return 'status-frozen';
      if (normalizedStatus === 'inactive') return 'status-inactive';
      return 'status-unknown';
    };
    
    // Get readable status text
    const getStatusText = (status) => {
      const normalizedStatus = status?.toLowerCase() || 'unknown';
      if (normalizedStatus === 'active') return 'Active Account';
      if (['frozen', 'suspended'].includes(normalizedStatus)) return 'Account Frozen';
      if (normalizedStatus === 'inactive') return 'Account Inactive';
      return 'Unknown Status';
    };
      // Handle quick action button clicks
    const handleQuickAction = async (value) => {
      // Add the selected action as a user message
      messages.value.push({
        sender: 'user',
        text: value
      });
      
      // Process the action
      await processUserInput(value);
    };
    
    return {
      isOpen,
      messages,
      userInput,
      isTyping,
      messagesContainer,
      toggleChat,
      sendMessage,
      formatMessage,
      formatCurrency,
      getStatusClass,
      getStatusText,
      handleQuickAction
    };
  }
};
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.chatbot-button {
  height: 3.5rem;
  width: 3.5rem;
  background-color: #4f46e5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  outline: none;
}

.chatbot-button:hover {
  background-color: #4338ca;
  transform: scale(1.05);
}

.chatbot-button-active {
  background-color: #ef4444;
}

.chatbot-button-active:hover {
  background-color: #dc2626;
}

.chatbot-window {
  position: absolute;
  bottom: 5rem;
  right: 0;
  width: 350px;
  height: 450px;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.chatbot-header {
  padding: 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scroll-behavior: smooth;
}

.message {
  display: flex;
  margin-bottom: 0.5rem;
}

.message-bot {
  justify-content: flex-start;
}

.message-user {
  justify-content: flex-end;
}

.message-content {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  max-width: 80%;
}

.message-bot .message-content {
  background-color: #f3f4f6;
  color: #1f2937;
  border-bottom-left-radius: 0.25rem;
}

.message-user .message-content {
  background-color: #4f46e5;
  color: white;
  border-bottom-right-radius: 0.25rem;
}

.typing-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.typing-indicator span {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #9ca3af;
  border-radius: 50%;
  display: inline-block;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.chatbot-input {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
}

.chatbot-input-field {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  outline: none;
  transition: border-color 0.2s ease;
}

.chatbot-input-field:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
}

.chatbot-send-button {
  height: 2.5rem;
  width: 2.5rem;
  background-color: #4f46e5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.2s ease;
}

.chatbot-send-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

.chatbot-send-button:hover:not(:disabled) {
  background-color: #4338ca;
}

.balance-card {
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.balance-title {
  font-size: 0.875rem;
  color: #0c4a6e;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.balance-amount {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 0.25rem;
}

.balance-status {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
}

.status-indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}

.status-active {
  background-color: #16a34a;
}

.status-frozen {
  background-color: #eab308;
}

.status-inactive {
  background-color: #dc2626;
}

.status-unknown {
  background-color: #9ca3af;
}

.message-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.action-button {
  padding: 0.375rem 0.75rem;
  background-color: #e0e7ff;
  color: #4f46e5;
  border: 1px solid #c7d2fe;
  border-radius: 9999px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  background-color: #c7d2fe;
}
</style>
