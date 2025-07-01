// assistant-state.service.js
import { ref, watch } from 'vue';

// Shared state for assistant components
const activeAssistant = ref(null); // can be 'chat', 'voice', or null

// Subscribe to active assistant changes
const onActiveAssistantChange = (callback) => {
  return watch(activeAssistant, callback);
};

// Set the active assistant
const setActiveAssistant = (assistant) => {
  activeAssistant.value = assistant;
};

// Clear the active assistant
const clearActiveAssistant = () => {
  activeAssistant.value = null;
};

export default {
  activeAssistant,
  setActiveAssistant,
  clearActiveAssistant,
  onActiveAssistantChange
};
