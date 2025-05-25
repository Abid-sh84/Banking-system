<template>
  <div class="quick-actions-wrapper">
    <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
    
    <div class="quick-actions grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      <button
        v-for="action in actions"
        :key="action.id"
        @click="handleAction(action)"
        class="action-card flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 hover:scale-105"
      >
        <div :class="['action-icon p-2 rounded-full mb-2', action.iconClass]">
          <component :is="action.icon" class="h-5 w-5" />
        </div>
        <span class="text-sm font-medium">{{ action.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { 
  UserPlus, 
  DollarSign, 
  CreditCard, 
  FilePlus, 
  Search, 
  Lock, 
  AlertTriangle, 
  FileText 
} from 'lucide-vue-next';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

const emit = defineEmits(['action']);

const actions = [
  {
    id: 'add-customer',
    label: 'Add Customer',
    icon: UserPlus,
    iconClass: 'bg-blue-100 text-blue-600',
    handler: () => {
      toast.info("Please contact system administrator to add a new customer");
      emit('action', 'add-customer');
    }
  },
  {
    id: 'make-deposit',
    label: 'Make Deposit',
    icon: DollarSign,
    iconClass: 'bg-green-100 text-green-600',
    handler: () => {
      router.push('/banker/customer/deposit');
      emit('action', 'make-deposit');
    }
  },
  {
    id: 'check-account',
    label: 'Check Account',
    icon: Search,
    iconClass: 'bg-amber-100 text-amber-600',
    handler: () => {
      emit('action', 'check-account');
    }
  },
  {
    id: 'generate-report',
    label: 'Generate Report',
    icon: FileText,
    iconClass: 'bg-violet-100 text-violet-600',
    handler: () => {
      toast.info("Report generation feature coming soon");
      emit('action', 'generate-report');
    }
  },
  {
    id: 'flag-account',
    label: 'Flag Account',
    icon: AlertTriangle,
    iconClass: 'bg-red-100 text-red-600',
    handler: () => {
      toast.info("Account flagging feature coming soon");
      emit('action', 'flag-account');
    }
  },
  {
    id: 'update-kyc',
    label: 'Update KYC',
    icon: FilePlus,
    iconClass: 'bg-teal-100 text-teal-600',
    handler: () => {
      toast.info("KYC update feature coming soon");
      emit('action', 'update-kyc');
    }
  }
];

const handleAction = (action) => {
  if (action && action.handler) {
    action.handler();
  }
};
</script>

<style scoped>
.quick-actions-wrapper {
  width: 100%;
}

.action-card {
  min-height: 100px;
}
</style>
