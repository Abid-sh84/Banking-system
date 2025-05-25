<template>
  <div class="chart-container">
    <canvas ref="chartCanvas" class="chart"></canvas>
    <div v-if="loading" class="chart-loading">
      <Loader2 class="h-6 w-6 text-primary animate-spin" />
    </div>
    <div v-if="error" class="chart-error">
      <AlertCircle class="h-6 w-6 text-red-500" />
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Loader2, AlertCircle } from 'lucide-vue-next';
import Chart from 'chart.js/auto';

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const chartCanvas = ref(null);
const chartInstance = ref(null);
const error = ref('');

// Function to process transaction data for chart
const processChartData = (transactions) => {
  try {
    if (!transactions || transactions.length === 0) {
      return {
        labels: [],
        deposits: [],
        withdrawals: []
      };
    }

    // Group transactions by date
    const grouped = transactions.reduce((acc, transaction) => {
      // Ensure transaction_date exists, otherwise use created_at
      const dateStr = transaction.transaction_date || transaction.created_at;
      if (!dateStr) return acc;
      
      const date = new Date(dateStr);
      const dateKey = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      
      if (!acc[dateKey]) {
        acc[dateKey] = {
          deposits: 0,
          withdrawals: 0
        };
      }
      
      const amount = parseFloat(transaction.amount || 0);
      if (!isNaN(amount)) {
        if (transaction.type === 'deposit') {
          acc[dateKey].deposits += amount;
        } else if (transaction.type === 'withdrawal' || transaction.type === 'withdraw') {
          acc[dateKey].withdrawals += amount;
        }
      }
      
      return acc;
    }, {});
    
    // Sort dates and prepare chart data
    const sortedDates = Object.keys(grouped).sort();
    
    return {
      labels: sortedDates.map(date => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      deposits: sortedDates.map(date => grouped[date].deposits),
      withdrawals: sortedDates.map(date => grouped[date].withdrawals)
    };
  } catch (err) {
    console.error('Error processing chart data:', err);
    error.value = 'Failed to process transaction data for chart';
    return { labels: [], deposits: [], withdrawals: [] };
  }
};

// Function to initialize or update chart
const updateChart = () => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }
  
  if (!chartCanvas.value) return;
  
  try {
    const ctx = chartCanvas.value.getContext('2d');
    const { labels, deposits, withdrawals } = processChartData(props.transactions);
    
    chartInstance.value = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Deposits',
            data: deposits,
            backgroundColor: 'rgba(34, 197, 94, 0.6)',
            borderColor: 'rgb(34, 197, 94)',
            borderWidth: 1
          },
          {
            label: 'Withdrawals',
            data: withdrawals,
            backgroundColor: 'rgba(239, 68, 68, 0.6)',
            borderColor: 'rgb(239, 68, 68)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '₹' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR'
                  }).format(context.parsed.y);
                }
                return label;
              }
            }
          },
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Transaction Activity (Last 30 Days)'
          }
        }
      }
    });
  } catch (err) {
    console.error('Error creating chart:', err);
    error.value = 'Failed to create transaction chart';
  }
};

// Watch for changes in transaction data
watch(() => props.transactions, () => {
  if (!props.loading) {
    updateChart();
  }
}, { deep: true });

onMounted(() => {
  if (!props.loading && props.transactions.length > 0) {
    updateChart();
  }
});
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}

.chart {
  width: 100%;
  height: 100%;
}

.chart-loading,
.chart-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
}

.chart-error {
  color: #ef4444;
  text-align: center;
}

.chart-error p {
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
</style>
