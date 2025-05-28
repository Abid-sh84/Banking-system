<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\components\CibilScoreGauge.vue -->
<template>
  <div>
    <div class="bg-white overflow-hidden shadow-md rounded-lg p-4 mb-6 border border-gray-100">
      <h3 class="text-lg font-medium text-gray-900 mb-4">CIBIL Score</h3>
      
      <div class="relative">
        <!-- Score Gauge Background -->
        <div class="h-5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-700 ease-out"
            :class="scoreColorClass" 
            :style="{ width: `${scorePercentage}%` }"
          ></div>
        </div>
        
        <!-- Score Markers -->
        <div class="flex justify-between mt-1 px-1">
          <span class="text-xs text-gray-500">Poor</span>
          <span class="text-xs text-gray-500">Fair</span>
          <span class="text-xs text-gray-500">Good</span>
          <span class="text-xs text-gray-500">Excellent</span>
        </div>
        
        <!-- Score Value -->
        <div class="mt-4 text-center">
          <div class="text-3xl font-bold" :class="scoreTextClass">{{ score }}</div>
          <div class="text-sm text-gray-500">{{ scoreRating }}</div>
        </div>
      </div>
      
      <div class="mt-4 text-sm text-gray-600">
        <p v-if="score >= 750" class="text-sm text-green-600">
          Excellent credit score! You qualify for the best loan rates.
        </p>
        <p v-else-if="score >= 700" class="text-sm text-green-600">
          Good credit score. You have access to most loan products.
        </p>
        <p v-else-if="score >= 650" class="text-sm text-yellow-600">
          Fair credit score. Consider improving your credit behavior.
        </p>
        <p v-else class="text-sm text-red-600">
          Poor credit score. Take steps to improve your financial habits.
        </p>
      </div>
      
      <div class="mt-3 border-t border-gray-100 pt-3">
        <div class="flex justify-between text-xs text-gray-500">
          <span>Last Updated: {{ formattedDate }}</span>
          <button 
            @click="$emit('refresh')" 
            class="text-primary hover:underline flex items-center"
          >
            <RefreshCw class="h-3 w-3 mr-1" /> Refresh
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { RefreshCw } from 'lucide-vue-next';

const props = defineProps({
  score: {
    type: Number,
    required: true,
    default: 750
  },
  lastUpdated: {
    type: Date,
    default: () => new Date()
  }
});

const formattedDate = computed(() => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return props.lastUpdated.toLocaleDateString('en-US', options);
});

const scorePercentage = computed(() => {
  // CIBIL scores are typically between 300 and 900
  return ((props.score - 300) / (900 - 300)) * 100;
});

const scoreColorClass = computed(() => {
  if (props.score >= 750) return 'bg-green-500';
  if (props.score >= 700) return 'bg-green-400';
  if (props.score >= 650) return 'bg-yellow-500';
  if (props.score >= 600) return 'bg-orange-500';
  return 'bg-red-500';
});

const scoreTextClass = computed(() => {
  if (props.score >= 750) return 'text-green-600';
  if (props.score >= 700) return 'text-green-500';
  if (props.score >= 650) return 'text-yellow-600';
  if (props.score >= 600) return 'text-orange-600';
  return 'text-red-600';
});

const scoreRating = computed(() => {
  if (props.score >= 750) return 'Excellent';
  if (props.score >= 700) return 'Good';
  if (props.score >= 650) return 'Fair';
  if (props.score >= 600) return 'Poor';
  return 'Very Poor';
});
</script>
