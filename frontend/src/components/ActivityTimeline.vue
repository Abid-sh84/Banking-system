<template>
  <div class="activity-timeline">
    <h3 class="text-lg font-semibold mb-4">Recent Activities</h3>
    
    <div v-if="loading" class="flex items-center justify-center py-6">
      <Loader2 class="h-6 w-6 text-primary animate-spin" />
    </div>
    
    <div v-else-if="activities.length === 0" class="flex flex-col items-center justify-center py-6 text-gray-500">
      <Activity class="h-10 w-10 mb-2" />
      <p>No recent activities found</p>
    </div>
    
    <div v-else class="timeline-container relative">
      <div class="timeline-line absolute top-0 bottom-0 left-6 ml-px w-0.5 bg-gray-200"></div>
      
      <div
        v-for="(activity, index) in activities"
        :key="index"
        class="timeline-item relative pb-6 pl-8 animate-fadeIn"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="timeline-icon absolute top-0 left-0 flex items-center justify-center h-6 w-6 rounded-full"
             :class="getIconClass(activity.type)">
          <component :is="getIcon(activity.type)" class="h-4 w-4" />
        </div>
        
        <div>
          <div class="flex flex-row justify-between">
            <p class="font-medium text-sm" :class="getTextClass(activity.type)">
              {{ activity.title }}
            </p>
            <span class="text-xs text-gray-500">{{ formatTimeAgo(activity.timestamp) }}</span>
          </div>
          
          <p class="text-gray-600 text-sm mt-1">{{ activity.description }}</p>
          
          <div v-if="activity.details" class="mt-2 text-xs text-gray-500">
            {{ activity.details }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Loader2, DollarSign, CreditCard, User, AlertCircle, LogIn, Activity } from 'lucide-vue-next';

const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// Convert transactions to activity format
const activities = computed(() => {
  if (!props.transactions || props.transactions.length === 0) return [];
  
  return props.transactions.slice(0, 8).map(transaction => {
    const type = transaction.type || 'unknown';
    const timestamp = transaction.transaction_date || transaction.created_at || new Date().toISOString();
    let title, description, details;
    
    if (type === 'deposit') {
      title = `Deposit of ${formatCurrency(transaction.amount)}`;
      description = `${transaction.customer_name || 'Customer'} made a deposit`;
      details = transaction.description || 'Funds deposited to account';
    } else if (type === 'withdrawal' || type === 'withdraw') {
      title = `Withdrawal of ${formatCurrency(transaction.amount)}`;
      description = `${transaction.customer_name || 'Customer'} made a withdrawal`;
      details = transaction.description || 'Funds withdrawn from account';
    } else if (type === 'transfer') {
      title = `Transfer of ${formatCurrency(transaction.amount)}`;
      description = `${transaction.customer_name || 'Customer'} transferred funds`;
      details = transaction.description || 'Funds transferred';
    } else {
      title = `Transaction of ${formatCurrency(transaction.amount)}`;
      description = `${transaction.customer_name || 'Customer'} made a transaction`;
      details = transaction.description || 'Transaction processed';
    }
    
    return {
      type,
      title,
      description, 
      details,
      timestamp,
      id: transaction.id
    };
  });
});

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount || 0);
};

// Helper function to get icon
const getIcon = (type) => {
  switch (type) {
    case 'deposit': return DollarSign;
    case 'withdrawal': 
    case 'withdraw': return CreditCard;
    case 'transfer': return Activity;
    case 'login': return LogIn;
    case 'error': return AlertCircle;
    default: return User;
  }
};

// Helper function to get icon background color
const getIconClass = (type) => {
  switch (type) {
    case 'deposit': return 'bg-green-100 text-green-600';
    case 'withdrawal':
    case 'withdraw': return 'bg-red-100 text-red-600';
    case 'transfer': return 'bg-blue-100 text-blue-600';
    case 'login': return 'bg-purple-100 text-purple-600';
    case 'error': return 'bg-orange-100 text-orange-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

// Helper function to get text color
const getTextClass = (type) => {
  switch (type) {
    case 'deposit': return 'text-green-600';
    case 'withdrawal':
    case 'withdraw': return 'text-red-600';
    case 'transfer': return 'text-blue-600';
    case 'login': return 'text-purple-600';
    case 'error': return 'text-orange-600';
    default: return 'text-gray-600';
  }
};

// Helper function to format relative time
const formatTimeAgo = (dateString) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (isNaN(diffInSeconds)) {
      return 'Invalid date';
    }
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease forwards;
}
</style>
