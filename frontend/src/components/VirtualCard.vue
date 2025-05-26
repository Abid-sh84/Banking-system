<template>  <div class="virtual-card-container">
    <div 
      class="virtual-card" 
      :class="{ 
        'inactive': !card || card.status !== 'active',
        'active': card && card.status === 'active', 
        'flipped': isFlipped || overrideFlip
      }"
      @click="flipCard"
    >
      <!-- Front of the card -->      <div class="card-front">
        <div class="card-header">
          <div class="bank-name">
            <div class="bank-logo">MB</div>
            <div class="bank-text">Modern Bank India</div>
          </div>
          <div class="card-chip">
            <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
              <rect x="5" y="5" width="40" height="30" rx="3" stroke="currentColor" stroke-width="2" />
              <rect x="10" y="15" width="30" height="10" rx="1" stroke="currentColor" stroke-width="2" />
              <line x1="20" y1="7" x2="20" y2="33" stroke="currentColor" stroke-width="1" />
              <line x1="30" y1="7" x2="30" y2="33" stroke="currentColor" stroke-width="1" />
            </svg>
          </div>
        </div>
        
        <div class="card-number">
          <template v-if="card && card.status === 'active'">
            <span v-if="showFullDetails">{{ formattedCardNumber }}</span>
            <span v-else>•••• •••• •••• {{ lastFourDigits }}</span>
          </template>
          <template v-else>
            <span>•••• •••• •••• ••••</span>
          </template>
        </div>
        
        <div class="card-details">
          <div>
            <div class="label">CARD HOLDER</div>
            <div class="value">{{ card ? card.cardholder_name : 'YOUR NAME' }}</div>
          </div>
          <div>
            <div class="label">EXPIRES</div>
            <div class="value">{{ card && card.status === 'active' ? card.expiry_date : '••/••' }}</div>
          </div>
        </div>
        
        <div class="card-type">
          <span>Virtual Debit</span>
          <svg width="60" height="40" viewBox="0 0 60 40">
            <!-- Simple credit card network logo -->
            <circle cx="25" cy="20" r="16" fill="#ff5f00" opacity="0.8" />
            <circle cx="35" cy="20" r="16" fill="#eb001b" opacity="0.8" />
            <circle cx="30" cy="20" r="16" fill="#f79e1b" opacity="0.4" />
          </svg>
        </div>
      </div>
      
      <!-- Back of the card -->
      <div class="card-back">
        <div class="magnetic-strip"></div>
        <div class="signature-strip">
          <div class="cvv-container">
            <div class="cvv-label">CVV</div>
            <div class="cvv-value">
              <template v-if="card && card.status === 'active' && showFullDetails">
                {{ card.cvv }}
              </template>
              <template v-else>•••</template>
            </div>
          </div>
        </div>        <div class="card-info">
          <p>This is a virtual debit card issued by Modern Bank India.</p>
          <p>Card can be used for online transactions only.</p>
        </div>
      </div>
    </div>
    
    <div class="card-controls mt-4" v-if="card">
      <div class="flex justify-between items-center">
        <div>
          <span 
            class="px-2 py-1 text-xs rounded-full"
            :class="{
              'bg-green-100 text-green-800': card.status === 'active',
              'bg-yellow-100 text-yellow-800': card.status === 'inactive',
              'bg-red-100 text-red-800': card.status === 'blocked'
            }"
          >
            {{ cardStatusText }}
          </span>
        </div>
        <div>
          <button 
            @click.stop="toggleDetails" 
            class="text-sm px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
            v-if="card.status === 'active'"
          >
            {{ showFullDetails ? 'Hide Details' : 'Show Details' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Props
const props = defineProps({
  card: {
    type: Object,
    default: null
  },
  overrideFlip: {
    type: Boolean,
    default: false
  }
});

// State
const isFlipped = ref(false);
const showFullDetails = ref(false);

// Computed
const lastFourDigits = computed(() => {
  if (props.card && props.card.card_number) {
    return props.card.card_number.slice(-4);
  }
  return '••••';
});

const formattedCardNumber = computed(() => {
  if (props.card && props.card.card_number) {
    // Format as groups of 4 digits
    return props.card.card_number.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
  return '•••• •••• •••• ••••';
});

const cardStatusText = computed(() => {
  if (!props.card) return 'Not Available';
  
  switch(props.card.status) {
    case 'active': return 'Active';
    case 'inactive': return 'Awaiting Activation';
    case 'blocked': return 'Blocked';
    default: return props.card.status;
  }
});

// Methods
const flipCard = () => {
  isFlipped.value = !isFlipped.value;
  console.log('VirtualCard.flipCard - isFlipped set to:', isFlipped.value);
};

// These methods are used by the parent component
const viewFront = () => {
  isFlipped.value = false;
  console.log('VirtualCard.viewFront - isFlipped set to:', isFlipped.value);
};

const viewBack = () => {
  isFlipped.value = true;
  console.log('VirtualCard.viewBack - isFlipped set to:', isFlipped.value);
};

const toggleDetails = (event) => {
  event.stopPropagation(); // Prevent card from flipping when clicking button
  showFullDetails.value = !showFullDetails.value;
};

// Expose methods to parent component
defineExpose({
  viewFront,
  viewBack
});
</script>

<style scoped>
.virtual-card-container {
  width: 100%;
  max-width: 400px;
  perspective: 1000px;
  margin: 0 auto;
}

.virtual-card {
  position: relative;
  width: 100%;
  height: 220px;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.virtual-card.flipped {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  padding: 24px;
}

.card-front {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, #4f46e5, #3730a3);
  color: white;
}

.card-back {
  background: linear-gradient(135deg, #3730a3, #4f46e5);
  color: white;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.bank-name {
  display: flex;
  align-items: center;
  font-weight: 600;
  letter-spacing: 1px;
}

.bank-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: #4f46e5;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  margin-right: 8px;
  font-size: 0.8rem;
}

.bank-text {
  font-size: 0.9rem;
}

.card-number {
  font-size: 1.3rem;
  letter-spacing: 2px;
  text-align: center;
  margin: 15px 0;
  font-family: monospace;
}

.card-details {
  display: flex;
  justify-content: space-between;
}

.label {
  font-size: 0.625rem;
  text-transform: uppercase;
  opacity: 0.8;
  letter-spacing: 1px;
}

.value {
  font-size: 1rem;
  letter-spacing: 1px;
  margin-top: 4px;
}

.card-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

/* Back of card */
.magnetic-strip {
  height: 50px;
  background-color: rgba(0, 0, 0, 0.8);
  margin: 20px -24px;
}

.signature-strip {
  background-color: rgba(255, 255, 255, 0.8);
  height: 40px;
  margin-bottom: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}

.cvv-container {
  background-color: white;
  color: black;
  padding: 5px 10px;
  border-radius: 4px;
  display: flex;
  gap: 10px;
}

.cvv-label {
  font-size: 0.625rem;
  opacity: 0.7;
}

.cvv-value {
  font-family: monospace;
}

.card-info {
  font-size: 0.75rem;
  opacity: 0.8;
  text-align: center;
  margin-top: auto;
  line-height: 1.4;
}

/* Card states */
.virtual-card.inactive .card-front {
  background: linear-gradient(135deg, #64748b, #475569);
  opacity: 0.9;
}

.virtual-card.inactive .card-back {
  background: linear-gradient(135deg, #475569, #64748b);
  opacity: 0.9;
}

.virtual-card.active {
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.4);
}

/* Animation */
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(79, 70, 229, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
}

.virtual-card.active:hover {
  animation: pulse 2s infinite;
}
</style>
