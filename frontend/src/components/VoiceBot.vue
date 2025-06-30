<!-- VoiceBot.vue -->
<template>
  <div class="voicebot-container" :class="{ 'voicebot-expanded': isOpen }">
    <!-- Voice button -->
    <button 
      @click="toggleVoice" 
      class="voicebot-button"
      :class="{ 'voicebot-button-active': isOpen }"
    >
      <Phone v-if="!isOpen" class="h-6 w-6" />
      <X v-else class="h-6 w-6" />
    </button>
    
    <!-- Voice window -->
    <div v-if="isOpen" class="voicebot-window">
      <!-- Voice header -->
      <div class="voicebot-header">
        <div class="flex items-center">
          <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
            <Mic class="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 class="text-lg font-medium">Voice Assistant</h3>
            <span class="text-xs text-gray-500">Voice-Powered Support</span>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Online</span>
          <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full mt-1">AI-Powered</span>
        </div>
      </div>
      
      <!-- Voice interaction area -->
      <div class="voicebot-content">
        <div class="voice-messages" ref="messagesContainer">
          <div 
            v-for="(message, index) in messages" 
            :key="index" 
            class="message"
            :class="message.sender === 'bot' ? 'message-bot' : 'message-user'"
          >
            <div class="message-content">
              <p v-html="formatMessage(message.text)"></p>
            </div>
          </div>
          <div v-if="isProcessing" class="message message-bot">
            <div class="message-content processing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        
        <div class="voice-visualization">
          <div class="voice-waves" :class="{ active: isListening }">
            <div v-for="n in 5" :key="n" class="voice-wave"></div>
          </div>
          <div class="voice-status">{{ voiceStatus }}</div>
        </div>
        
        <!-- Voice control -->
        <div class="voice-controls">
          <button 
            @click="toggleListening" 
            class="voice-button"
            :class="{ 'listening': isListening }"
            :disabled="isProcessing"
          >
            <Mic v-if="!isListening" class="h-6 w-6" />
            <MicOff v-else class="h-6 w-6" />
            <span>{{ isListening ? 'Stop' : 'Speak' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue';
import { Phone, X, Mic, MicOff } from 'lucide-vue-next';
import ChatbotService from '../services/chatbot.service';

export default {
  name: 'VoiceBot',
  components: {
    Phone,
    X,
    Mic,
    MicOff
  },
  props: {
    customerData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isOpen = ref(false);
    const isListening = ref(false);
    const isProcessing = ref(false);
    const messages = ref([]);
    const messagesContainer = ref(null);
    const voiceStatus = ref('Click "Speak" to start');
    const dashboardData = ref(null);
    
    // Speech recognition setup
    let recognition = null;
    
    // Speech synthesis setup
    const synth = window.speechSynthesis;
    
    // Setup speech recognition
    const setupSpeechRecognition = () => {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
          isListening.value = true;
          voiceStatus.value = 'Listening...';
        };
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          voiceStatus.value = 'Processing...';
          
          // Add user message
          messages.value.push({
            sender: 'user',
            text: transcript
          });
          
          // Process user's voice input
          processVoiceInput(transcript);
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          isListening.value = false;
          voiceStatus.value = `Error: ${event.error}. Try again.`;
        };
        
        recognition.onend = () => {
          isListening.value = false;
          if (voiceStatus.value === 'Listening...') {
            voiceStatus.value = 'No speech detected. Try again.';
          }
        };
      } else {
        voiceStatus.value = 'Speech recognition not supported in this browser.';
        console.error('Speech Recognition API not supported in this browser');
      }
    };
    
    // Function to speak text
    const speakText = (text) => {
      // Stop any ongoing speech
      if (synth.speaking) {
        synth.cancel();
      }
      
      // Remove HTML tags for speech
      const cleanText = text.replace(/<\/?[^>]+(>|$)/g, '');
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      synth.speak(utterance);
    };
    
    // Toggle voice window
    const toggleVoice = () => {
      isOpen.value = !isOpen.value;
      
      if (isOpen.value && !recognition) {
        setupSpeechRecognition();
      }
      
      if (!isOpen.value) {
        // Stop speaking and listening when window is closed
        if (synth.speaking) synth.cancel();
        if (isListening.value && recognition) {
          recognition.abort();
          isListening.value = false;
        }
      }
    };
    
    // Toggle listening state
    const toggleListening = () => {
      if (!recognition) {
        setupSpeechRecognition();
      }
      
      if (isListening.value) {
        recognition.abort();
        isListening.value = false;
        voiceStatus.value = 'Listening stopped';
      } else {
        try {
          recognition.start();
        } catch (error) {
          console.error('Recognition start error:', error);
          // Recreate recognition instance if it's in a bad state
          setupSpeechRecognition();
          try {
            recognition.start();
          } catch (retryError) {
            voiceStatus.value = 'Could not start speech recognition';
            console.error('Failed to restart recognition:', retryError);
          }
        }
      }
    };
    
    // Process and respond to user's voice input
    const processVoiceInput = async (input) => {
      isProcessing.value = true;
      
      try {
        const response = await ChatbotService.askQuestion(input);
        if (response.data && response.data.status === 'success') {
          const aiResponse = response.data.data.response;
          
          // Add bot message
          messages.value.push({
            sender: 'bot',
            text: aiResponse
          });
          
          // Speak the response
          speakText(aiResponse);
        } else {
          throw new Error('Could not get response from chatbot API');
        }
      } catch (error) {
        console.error('Voice processing error:', error);
        
        // Fallback response
        const fallbackMessage = "I'm sorry, I'm having trouble processing your request right now. Please try again later.";
        messages.value.push({
          sender: 'bot',
          text: fallbackMessage
        });
        
        // Speak fallback message
        speakText(fallbackMessage);
      } finally {
        isProcessing.value = false;
        voiceStatus.value = 'Click "Speak" to ask another question';
      }
    };
    
    // Load initial welcome message
    onMounted(() => {
      messages.value = [
        {
          sender: 'bot',
          text: `Hello ${props.customerData?.name || 'there'}! I'm your voice banking assistant. Click the "Speak" button and ask me a question. I'm here to help with your banking needs.`
        }
      ];
      
      // Fetch dashboard data in background for context
      ChatbotService.getDashboardData()
        .then(response => {
          if (response.data && response.data.status === 'success') {
            dashboardData.value = response.data.data;
          }
        })
        .catch(error => {
          console.error('Could not fetch dashboard data:', error);
          dashboardData.value = {
            customer: props.customerData
          };
        });
    });
    
    // Clean up speech resources on component unmount
    onBeforeUnmount(() => {
      if (synth.speaking) synth.cancel();
      if (recognition) {
        recognition.abort();
      }
    });
    
    // Watch for new messages to scroll to bottom
    watch(messages, () => {
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
      });
    }, { deep: true });
    
    // Format message with line breaks
    const formatMessage = (text) => {
      return text;
    };
    
    return {
      isOpen,
      isListening,
      isProcessing,
      messages,
      voiceStatus,
      messagesContainer,
      toggleVoice,
      toggleListening,
      formatMessage
    };
  }
};
</script>

<style scoped>
.voicebot-container {
  position: fixed;
  bottom: 2rem;
  right: 6.5rem; /* Positioned to the left of chatbot */
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.voicebot-button {
  height: 3.5rem;
  width: 3.5rem;
  background-color: #10b981;
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

.voicebot-button:hover {
  background-color: #059669;
  transform: scale(1.05);
}

.voicebot-button-active {
  background-color: #ef4444;
}

.voicebot-button-active:hover {
  background-color: #dc2626;
}

.voicebot-window {
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

.voicebot-header {
  padding: 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.voicebot-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.voice-messages {
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
  background-color: #10b981;
  color: white;
  border-bottom-right-radius: 0.25rem;
}

.processing-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.processing-indicator span {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #9ca3af;
  border-radius: 50%;
  display: inline-block;
  animation: processing 1.4s infinite ease-in-out both;
}

.processing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.processing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes processing {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.voice-visualization {
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.voice-waves {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 40px;
  width: 100%;
  margin-bottom: 0.5rem;
}

.voice-wave {
  width: 3px;
  margin: 0 2px;
  height: 10px;
  background-color: #d1d5db;
  border-radius: 1px;
  transition: height 0.2s ease;
}

.voice-waves.active .voice-wave {
  animation: wave 1.2s infinite ease-in-out;
}

.voice-waves.active .voice-wave:nth-child(1) {
  animation-delay: -1.2s;
  height: 15px;
}

.voice-waves.active .voice-wave:nth-child(2) {
  animation-delay: -1.0s;
  height: 25px;
}

.voice-waves.active .voice-wave:nth-child(3) {
  animation-delay: -0.8s;
  height: 35px;
}

.voice-waves.active .voice-wave:nth-child(4) {
  animation-delay: -1.0s;
  height: 25px;
}

.voice-waves.active .voice-wave:nth-child(5) {
  animation-delay: -1.2s;
  height: 15px;
}

@keyframes wave {
  0%, 100% { height: 10px; }
  50% { height: 30px; }
}

.voice-status {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}

.voice-controls {
  padding: 1rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid #e5e7eb;
}

.voice-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #10b981;
  color: white;
  padding: 0.75rem;
  border-radius: 9999px;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.2s ease;
  width: 5.5rem;
  height: 5.5rem;
}

.voice-button.listening {
  background-color: #ef4444;
}

.voice-button:hover:not(:disabled) {
  transform: scale(1.05);
}

.voice-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

.voice-button span {
  font-size: 0.75rem;
  margin-top: 0.25rem;
}
</style>
