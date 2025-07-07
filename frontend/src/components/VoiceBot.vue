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
        <!-- Mobile close button -->
        <button v-if="isMobile" @click="toggleVoice" class="mobile-close-button">
          <X class="h-4 w-4" />
        </button>
      </div>
      
      <!-- Voice interaction area -->
      <div class="voicebot-content">
        <div class="voice-messages" :class="{ 'mobile-messages': isMobile }" ref="messagesContainer">
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
          
          <!-- Mobile compatibility notice -->
          <div v-if="isMobile && !speechSupported" class="mobile-notice error">
            <p class="text-xs text-red-700 text-center">
              <span v-if="isIOS">🍎 iOS: Please use Safari 14.5+ for voice features</span>
              <span v-else-if="isAndroid">🤖 Android: Please use Chrome 90+ for voice features</span>
              <span v-else>📱 Voice recognition not supported on this browser</span>
            </p>
          </div>
          
          <div v-else-if="isMobile && microphonePermission === 'denied'" class="mobile-notice warning">
            <p class="text-xs text-orange-700 text-center">
              <span v-if="isIOS">🎤 Microphone blocked. Go to Settings > Safari > Microphone</span>
              <span v-else-if="isAndroid">🎤 Microphone blocked. Tap the mic icon in address bar</span>
              <span v-else>🎤 Please allow microphone access to use voice features</span>
            </p>
          </div>
          
          <div v-else-if="isMobile && speechSupported" class="mobile-notice success">
            <p class="text-xs text-green-700 text-center">
              <span v-if="isIOS">✅ iOS Safari detected - Voice features ready</span>
              <span v-else-if="isAndroid">✅ Android Chrome detected - Voice features ready</span>
              <span v-else>✅ Voice features ready - Tap "Speak" to start</span>
            </p>
          </div>
        </div>
        
        <!-- Voice control -->
        <div class="voice-controls">
          <button 
            @click="toggleListening" 
            class="voice-button"
            :class="{ 
              'listening': isListening,
              'disabled': !speechSupported,
              'permission-denied': microphonePermission === 'denied'
            }"
            :disabled="isProcessing || (!speechSupported && !isMobile)"
          >
            <Mic v-if="!isListening && speechSupported" class="h-6 w-6" />
            <MicOff v-else-if="isListening" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
            
            <span v-if="speechSupported">
              {{ isListening ? 'Stop' : 'Speak' }}
            </span>
            <span v-else-if="isIOS">
              Safari Required
            </span>
            <span v-else-if="isAndroid">
              Chrome Required
            </span>
            <span v-else>
              Not Supported
            </span>
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
import AssistantStateService from '../services/assistant-state.service';

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
    const isMobile = ref(window.innerWidth <= 768);
    const isIOS = ref(false);
    const isAndroid = ref(false);
    const speechSupported = ref(false);
    const microphonePermission = ref('unknown'); // 'unknown', 'granted', 'denied'
    
    // Enhanced mobile device detection
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const width = window.innerWidth;
      
      isMobile.value = width <= 768;
      isIOS.value = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
      isAndroid.value = /Android/.test(userAgent);
      
      // Check for speech recognition support
      speechSupported.value = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    };
    
    // Function to handle window resize
    const handleResize = () => {
      detectDevice();
    };
    
    // Speech recognition setup
    let recognition = null;
    let recognitionTimeout = null;
    
    // Speech synthesis setup
    const synth = window.speechSynthesis;
    
    // Enhanced microphone permission check
    const checkMicrophonePermission = async () => {
      if (!navigator.permissions) {
        return 'unknown';
      }
      
      try {
        const permission = await navigator.permissions.query({ name: 'microphone' });
        microphonePermission.value = permission.state;
        
        permission.addEventListener('change', () => {
          microphonePermission.value = permission.state;
        });
        
        return permission.state;
      } catch (error) {
        console.warn('Could not check microphone permission:', error);
        return 'unknown';
      }
    };
    
    // Request microphone access with better mobile handling
    const requestMicrophoneAccess = async () => {
      try {
        // For iOS, we need to explicitly request permission
        if (isIOS.value) {
          // iOS requires user interaction before accessing microphone
          await navigator.mediaDevices.getUserMedia({ 
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
              sampleRate: 44100
            } 
          }).then(stream => {
            // Stop the stream immediately, we just needed permission
            stream.getTracks().forEach(track => track.stop());
            microphonePermission.value = 'granted';
            return true;
          });
        } else if (isAndroid.value) {
          // Android Chrome handling
          await navigator.mediaDevices.getUserMedia({ 
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            } 
          }).then(stream => {
            stream.getTracks().forEach(track => track.stop());
            microphonePermission.value = 'granted';
            return true;
          });
        } else {
          // Desktop/other browsers
          await navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            stream.getTracks().forEach(track => track.stop());
            microphonePermission.value = 'granted';
            return true;
          });
        }
        return true;
      } catch (error) {
        console.error('Microphone access denied:', error);
        microphonePermission.value = 'denied';
        return false;
      }
    };
    
    // Setup speech recognition with enhanced mobile support
    const setupSpeechRecognition = () => {
      if (!speechSupported.value) {
        const deviceInfo = isIOS.value ? 'iOS Safari' : isAndroid.value ? 'Android Chrome' : 'this browser';
        voiceStatus.value = `Speech recognition not supported on ${deviceInfo}. Please try a different browser.`;
        return false;
      }
      
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        // Enhanced configuration for all devices
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        // Device-specific settings
        if (isIOS.value) {
          // iOS Safari specific settings
          recognition.maxAlternatives = 1;
        } 
        else if (isAndroid.value) {
          // Android Chrome specific settings
          recognition.maxAlternatives = 1;
        } 
        else {
          // Desktop settings - more alternatives for better accuracy
          recognition.maxAlternatives = 5;
        }
        
        console.log('Speech recognition setup completed for:', isIOS.value ? 'iOS' : isAndroid.value ? 'Android' : 'Desktop');
        
        recognition.onstart = () => {
          isListening.value = true;
          voiceStatus.value = 'Listening... Speak now';
          console.log('Speech recognition started');
          
          // Set a timeout for all devices to prevent hanging
          recognitionTimeout = setTimeout(() => {
            if (isListening.value) {
              recognition.abort();
              voiceStatus.value = 'Listening timeout. Please try again.';
            }
          }, isMobile.value ? 10000 : 15000); // 10 seconds for mobile, 15 for desktop
        };
        
        recognition.onresult = (event) => {
          if (recognitionTimeout) {
            clearTimeout(recognitionTimeout);
            recognitionTimeout = null;
          }
          
          const transcript = event.results[0][0].transcript.trim();
          const confidence = event.results[0][0].confidence || 1.0; // Default to 1.0 if confidence not provided
          
          voiceStatus.value = 'Processing your request...';
          console.log('Speech recognized:', transcript, 'Confidence:', confidence);
          
          // Process speech if transcript exists and meets confidence threshold
          // Lower threshold for mobile devices, standard threshold for desktop
          const minConfidence = isMobile.value ? 0.3 : 0.5;
          
          if (transcript && transcript.length > 0 && confidence >= minConfidence) {
            // Add user message
            messages.value.push({
              sender: 'user',
              text: transcript
            });
            
            // Process user's voice input
            processVoiceInput(transcript);
          } else {
            console.log('Speech rejected - Transcript:', transcript, 'Confidence:', confidence, 'Required:', minConfidence);
            voiceStatus.value = 'Could not understand clearly. Please speak louder and try again.';
            isListening.value = false;
          }
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          isListening.value = false;
          
          if (recognitionTimeout) {
            clearTimeout(recognitionTimeout);
            recognitionTimeout = null;
          }
          
          // Enhanced error handling for mobile devices
          switch(event.error) {
            case 'not-allowed':
              microphonePermission.value = 'denied';
              if (isIOS.value) {
                voiceStatus.value = 'Microphone access denied. Go to Settings > Safari > Microphone and allow access.';
              } else if (isAndroid.value) {
                voiceStatus.value = 'Microphone access denied. Tap the microphone icon in the address bar to allow access.';
              } else {
                voiceStatus.value = 'Microphone access denied. Please allow microphone access and try again.';
              }
              break;
            case 'no-speech':
              voiceStatus.value = 'No speech detected. Please speak clearly and try again.';
              break;
            case 'audio-capture':
              voiceStatus.value = 'Microphone not available. Please check your device settings.';
              break;
            case 'network':
              voiceStatus.value = 'Network error. Please check your internet connection.';
              break;
            case 'service-not-allowed':
              voiceStatus.value = 'Speech service not available. Please try again later.';
              break;
            case 'bad-grammar':
              voiceStatus.value = 'Speech recognition error. Please try again.';
              break;
            default:
              voiceStatus.value = `Speech error (${event.error}). Please try again.`;
          }
        };
        
        recognition.onend = () => {
          isListening.value = false;
          
          if (recognitionTimeout) {
            clearTimeout(recognitionTimeout);
            recognitionTimeout = null;
          }
          
          console.log('Speech recognition ended. Status was:', voiceStatus.value);
          
          if (voiceStatus.value === 'Listening... Speak now') {
            voiceStatus.value = 'No speech detected. Click "Speak" to try again.';
          }
        };
        
        return true;
      } catch (error) {
        console.error('Failed to setup speech recognition:', error);
        voiceStatus.value = 'Speech recognition setup failed. Please refresh and try again.';
        return false;
      }
    };
    
    // Enhanced speech synthesis with mobile optimizations
    const speakText = (text) => {
      // Check if speech synthesis is available
      if (!synth) {
        console.warn('Speech synthesis not available');
        return;
      }
      
      // Stop any ongoing speech
      if (synth.speaking) {
        synth.cancel();
      }
      
      // Remove HTML tags for speech
      const cleanText = text.replace(/<\/?[^>]+(>|$)/g, '');
      
      // Don't speak if text is empty
      if (!cleanText.trim()) return;
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Enhanced settings for different devices
      if (isIOS.value) {
        // iOS Safari specific settings
        utterance.lang = 'en-US';
        utterance.rate = 0.8; // Slower for better clarity on iOS
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // iOS often has limited voices, use default
        const voices = synth.getVoices();
        const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      } else if (isAndroid.value) {
        // Android Chrome specific settings
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Try to find a good English voice
        const voices = synth.getVoices();
        const englishVoice = voices.find(voice => 
          voice.lang.startsWith('en') && !voice.name.includes('eSpeak')
        );
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      } else {
        // Desktop settings
        utterance.lang = 'en-US';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
      }
      
      // Enhanced error handling for mobile devices
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        
        if (isMobile.value && event.error === 'not-allowed') {
          // Some mobile browsers require user interaction for speech synthesis
          console.warn('Speech synthesis blocked - requires user interaction');
        }
      };
      
      utterance.onend = () => {
        console.log('Speech synthesis completed');
      };
      
      utterance.onstart = () => {
        console.log('Speech synthesis started');
      };
      
      // Handle potential mobile limitations with retry mechanism
      try {
        // For iOS, sometimes we need to wait for voices to load
        if (isIOS.value && synth.getVoices().length === 0) {
          setTimeout(() => {
            try {
              synth.speak(utterance);
            } catch (retryError) {
              console.error('Failed to speak after retry:', retryError);
            }
          }, 100);
        } else {
          synth.speak(utterance);
        }
      } catch (error) {
        console.error('Failed to speak text:', error);
        
        // Retry once for mobile devices
        if (isMobile.value) {
          setTimeout(() => {
            try {
              synth.speak(utterance);
            } catch (retryError) {
              console.error('Speech synthesis retry failed:', retryError);
            }
          }, 500);
        }
      }
    };
    
    // Toggle voice window
    const toggleVoice = () => {
      // If already open, close it
      if (isOpen.value) {
        isOpen.value = false;
        AssistantStateService.clearActiveAssistant();
        
        // Stop speaking and listening when window is closed
        if (synth.speaking) synth.cancel();
        if (isListening.value && recognition) {
          recognition.abort();
          isListening.value = false;
        }
      } else {
        // If opening, set as active assistant
        isOpen.value = true;
        AssistantStateService.setActiveAssistant('voice');
        
        if (!recognition) {
          setupSpeechRecognition();
        }
      }
    };
    
    // Enhanced toggle listening with better mobile support
    const toggleListening = async () => {
      console.log('Toggle listening called. Current state:', {
        isListening: isListening.value,
        speechSupported: speechSupported.value,
        microphonePermission: microphonePermission.value,
        isIOS: isIOS.value,
        isAndroid: isAndroid.value,
        isMobile: isMobile.value
      });
      
      // Check speech recognition support first
      if (!speechSupported.value) {
        let message = 'Speech recognition not supported. ';
        if (isIOS.value) {
          message += 'Please use Safari browser on iOS 14.5 or later.';
        } else if (isAndroid.value) {
          message += 'Please use Chrome browser on Android 7.0 or later.';
        } else {
          message += 'Please use a modern browser like Chrome, Edge, or Firefox.';
        }
        voiceStatus.value = message;
        return;
      }
      
      // If currently listening, stop
      if (isListening.value) {
        if (recognition) {
          recognition.abort();
        }
        if (recognitionTimeout) {
          clearTimeout(recognitionTimeout);
          recognitionTimeout = null;
        }
        isListening.value = false;
        voiceStatus.value = 'Listening stopped. Click "Speak" to start again.';
        return;
      }
      
      // Check and request microphone permission
      if (microphonePermission.value === 'denied') {
        if (isIOS.value) {
          voiceStatus.value = 'Microphone blocked. Go to Settings > Safari > Microphone and allow access, then refresh the page.';
        } else if (isAndroid.value) {
          voiceStatus.value = 'Microphone blocked. Tap the microphone icon in your browser\'s address bar to allow access.';
        } else {
          voiceStatus.value = 'Microphone access denied. Please allow microphone access in your browser settings.';
        }
        return;
      }
      
      // Request microphone access if needed
      if (microphonePermission.value !== 'granted') {
        voiceStatus.value = 'Requesting microphone access...';
        const hasAccess = await requestMicrophoneAccess();
        
        if (!hasAccess) {
          if (isIOS.value) {
            voiceStatus.value = 'Microphone access required. Please allow microphone access when prompted.';
          } else if (isAndroid.value) {
            voiceStatus.value = 'Please allow microphone access to use voice features.';
          } else {
            voiceStatus.value = 'Microphone access denied. Please click the microphone icon in your browser\'s address bar and allow access.';
          }
          return;
        }
      }
      
      // Setup recognition if needed
      if (!recognition) {
        const setupSuccess = setupSpeechRecognition();
        if (!setupSuccess) {
          return;
        }
      }
      
      // Start recognition with enhanced error handling
      startRecognition();
    };
    
    // Enhanced recognition start with mobile optimizations
    const startRecognition = () => {
      if (!recognition) {
        voiceStatus.value = 'Speech recognition not available. Please try refreshing the page.';
        return;
      }
      
      try {
        // Prevent multiple instances
        if (isListening.value) {
          recognition.abort();
          
          // Wait a bit before restarting
          setTimeout(() => {
            startRecognition();
          }, 200);
          return;
        }
        
        // Mobile-specific delays and handling
        if (isIOS.value) {
          // iOS Safari sometimes needs a longer delay
          voiceStatus.value = 'Preparing microphone...';
          setTimeout(() => {
            try {
              recognition.start();
            } catch (error) {
              handleRecognitionStartError(error);
            }
          }, 300);
        } else if (isAndroid.value) {
          // Android Chrome optimization
          voiceStatus.value = 'Starting voice recognition...';
          setTimeout(() => {
            try {
              recognition.start();
            } catch (error) {
              handleRecognitionStartError(error);
            }
          }, 100);
        } else {
          // Desktop - start immediately with better error handling
          try {
            recognition.start();
          } catch (error) {
            handleRecognitionStartError(error);
          }
        }
      } catch (error) {
        handleRecognitionStartError(error);
      }
    };
    
    // Handle recognition start errors
    const handleRecognitionStartError = (error) => {
      console.error('Recognition start error:', error);
      isListening.value = false;
      
      if (error.name === 'InvalidStateError') {
        // Recognition is already running or in bad state
        voiceStatus.value = 'Speech recognition is busy. Please wait and try again.';
        
        // Try to reset and restart
        setTimeout(() => {
          if (recognition) {
            recognition.abort();
            setTimeout(() => {
              const setupSuccess = setupSpeechRecognition();
              if (setupSuccess) {
                voiceStatus.value = 'Ready to listen. Click "Speak" to try again.';
              }
            }, 500);
          }
        }, 1000);
      } else if (error.name === 'NotAllowedError') {
        microphonePermission.value = 'denied';
        if (isIOS.value) {
          voiceStatus.value = 'Microphone blocked. Check Safari settings and refresh the page.';
        } else if (isAndroid.value) {
          voiceStatus.value = 'Microphone blocked. Allow access in browser settings.';
        } else {
          voiceStatus.value = 'Microphone access denied. Please allow access and try again.';
        }
      } else {
        voiceStatus.value = 'Could not start voice recognition. Please try again.';
        
        // Attempt to recreate recognition
        setTimeout(() => {
          setupSpeechRecognition();
        }, 1000);
      }
    };
    
    // Process and respond to user's voice input
    const processVoiceInput = async (input) => {
      isProcessing.value = true;
      
      try {
        const response = await ChatbotService.askQuestion(input);
        // The service now handles errors and always returns a formatted response
        const aiResponse = response.data?.data?.response || "I'm sorry, I couldn't understand that.";
        
        // Add bot message
        messages.value.push({
          sender: 'bot',
          text: aiResponse
        });
        
        // Speak the response
        speakText(aiResponse);
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
    
    // Watch for active assistant changes
    watch(() => AssistantStateService.activeAssistant.value, (newActiveAssistant) => {
      // If another assistant becomes active, close this one
      if (newActiveAssistant && newActiveAssistant !== 'voice' && isOpen.value) {
        isOpen.value = false;
        
        // Stop speaking and listening
        if (synth.speaking) synth.cancel();
        if (isListening.value && recognition) {
          recognition.abort();
          isListening.value = false;
        }
      }
    });
    
    // Load initial welcome message
    onMounted(async () => {
      // Detect device capabilities
      detectDevice();
      
      // Check microphone permission on mount
      await checkMicrophonePermission();
      
      // Add debugging function to window for testing (only in development)
      if (process.env.NODE_ENV === 'development' || true) {
        window.debugVoiceBot = {
          testSpeechRecognition: () => {
            console.log('Testing speech recognition...');
            console.log('Speech supported:', speechSupported.value);
            console.log('User agent:', navigator.userAgent);
            console.log('Device detection:', {
              isMobile: isMobile.value,
              isIOS: isIOS.value,
              isAndroid: isAndroid.value
            });
            
            if (window.SpeechRecognition || window.webkitSpeechRecognition) {
              console.log('SpeechRecognition API available');
              const testRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
              console.log('Test recognition object created:', testRecognition);
            } else {
              console.log('SpeechRecognition API not available');
            }
          },
          getCurrentState: () => ({
            isListening: isListening.value,
            isProcessing: isProcessing.value,
            speechSupported: speechSupported.value,
            microphonePermission: microphonePermission.value,
            voiceStatus: voiceStatus.value
          })
        };
      }
      
      // If opened by default, register as active assistant
      if (isOpen.value) {
        AssistantStateService.setActiveAssistant('voice');
      }
      
      // Create device-specific welcome message
      let welcomeMessage = `Hello ${props.customerData?.name || 'there'}! I'm your voice banking assistant. `;
      
      if (!speechSupported.value) {
        if (isIOS.value) {
          welcomeMessage += 'Speech recognition requires Safari browser on iOS 14.5+. You can still type your questions!';
        } else if (isAndroid.value) {
          welcomeMessage += 'Speech recognition requires Chrome browser on Android 7.0+. You can still type your questions!';
        } else {
          welcomeMessage += 'Speech recognition is not supported in this browser. Please use Chrome or Safari.';
        }
      } else if (isMobile.value) {
        if (isIOS.value) {
          welcomeMessage += 'For best results on iOS: Use Safari, allow microphone access when prompted, and speak clearly.';
        } else if (isAndroid.value) {
          welcomeMessage += 'For best results on Android: Use Chrome, allow microphone access when prompted, and speak clearly.';
        } else {
          welcomeMessage += 'For best mobile experience: Allow microphone access when prompted and speak clearly.';
        }
      } else {
        welcomeMessage += 'Click the "Speak" button and ask me anything about your banking needs.';
      }
      
      welcomeMessage += ' I\'m here to help!';
      
      messages.value = [
        {
          sender: 'bot',
          text: welcomeMessage
        }
      ];
      
      // Setup responsive behavior
      window.addEventListener('resize', handleResize);
      
      // Set basic customer data without making API request
      dashboardData.value = {
        customer: props.customerData,
        // Add safe default values
        account: {
          balance: 0,
          transactions: []
        }
      };
      
      // Initialize speech synthesis voices for mobile
      if (isMobile.value && synth) {
        // Force load voices on mobile
        const loadVoices = () => {
          const voices = synth.getVoices();
          if (voices.length > 0) {
            console.log('Speech synthesis voices loaded:', voices.length);
          }
        };
        
        if (synth.addEventListener) {
          synth.addEventListener('voiceschanged', loadVoices);
        }
        
        // Trigger voices loading
        loadVoices();
      }
    });
    
    // Clean up speech resources and event listeners on component unmount
    onBeforeUnmount(() => {
      if (synth && synth.speaking) {
        synth.cancel();
      }
      
      if (recognition) {
        recognition.abort();
        recognition = null;
      }
      
      if (recognitionTimeout) {
        clearTimeout(recognitionTimeout);
        recognitionTimeout = null;
      }
      
      window.removeEventListener('resize', handleResize);
      
      // Clear assistant state
      if (isOpen.value) {
        AssistantStateService.clearActiveAssistant();
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
      formatMessage,
      isMobile,
      isIOS,
      isAndroid,
      speechSupported,
      microphonePermission
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
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.voice-button.listening {
  background-color: #ef4444;
  animation: pulse 2s infinite;
}

.voice-button.disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.voice-button.permission-denied {
  background-color: #f59e0b;
}

.voice-button:hover:not(:disabled):not(.disabled) {
  transform: scale(1.05);
}

.voice-button:active {
  transform: scale(0.95);
}

.voice-button:disabled {
  cursor: not-allowed;
  transform: none;
}

.voice-button span {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-weight: 500;
}

@keyframes pulse {
  0%, 100% { 
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  50% { 
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
}

/* Mobile responsive styles */
@media screen and (max-width: 768px) {
  .voicebot-container {
    bottom: 5rem; /* Position above the chat button instead of beside it */
    right: 1rem;
  }
  
  .voicebot-window {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
    z-index: 1001;
    /* Prevent bounce scrolling on iOS */
    -webkit-overflow-scrolling: touch;
    overflow: hidden;
  }
  
  .voicebot-header {
    padding: 1rem;
    position: relative;
    /* Ensure header stays fixed on iOS */
    flex-shrink: 0;
  }
  
  .voicebot-content {
    /* Fix for iOS Safari viewport units */
    height: calc(100vh - 120px);
    height: calc(100dvh - 120px); /* Dynamic viewport height for modern browsers */
  }
  
  .mobile-close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: #ef4444;
    color: white;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    outline: none;
    z-index: 2;
  }

  .voice-controls {
    padding-bottom: 2rem;
    /* Safe area for iOS devices with home indicator */
    padding-bottom: calc(2rem + env(safe-area-inset-bottom));
    flex-shrink: 0;
  }
  
  .voice-button {
    width: 6rem;
    height: 6rem;
  }
  
  .mobile-messages {
    max-height: calc(100vh - 220px);
  }

  .mobile-notice {
    padding: 0.5rem;
    border-radius: 0.375rem;
    margin-top: 0.5rem;
    text-align: center;
  }

  .mobile-notice.success {
    background-color: #d1fae5;
    border: 1px solid #a7f3d0;
  }

  .mobile-notice.warning {
    background-color: #fef3c7;
    border: 1px solid #fde68a;
  }

  .mobile-notice.error {
    background-color: #fee2e2;
    border: 1px solid #fecaca;
  }

  .voice-button {
    width: 6rem;
    height: 6rem;
    font-size: 0.875rem;
  }

  .voice-button span {
    font-size: 0.6875rem;
  }

  /* Enhanced touch targets for mobile */
  .voicebot-button {
    width: 4rem;
    height: 4rem;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .mobile-close-button {
    width: 2.5rem;
    height: 2.5rem;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  /* Improve scrolling on mobile */
  .mobile-messages {
    max-height: calc(100vh - 280px);
    max-height: calc(100dvh - 280px);
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
  }

  /* Prevent zoom on input focus for iOS */
  .voicebot-window * {
    font-size: 16px !important;
  }
  
  /* iOS Safari specific fixes */
  @supports (-webkit-touch-callout: none) {
    .voicebot-window {
      /* Fix for iOS Safari viewport */
      height: -webkit-fill-available;
    }
    
    .voicebot-content {
      height: calc(-webkit-fill-available - 120px);
    }
  }
}
</style>
