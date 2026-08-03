import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceGuiderContext = createContext(null);

export const VoiceGuiderProvider = ({ children }) => {
  const navigate = useNavigate();

  // Security & App Lock State
  const [isLocked, setIsLocked] = useState(() => {
    const saved = localStorage.getItem('lifeos_app_locked');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [pinCode, setPinCode] = useState(() => {
    return localStorage.getItem('lifeos_pin_code') || '1234';
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('lifeos_user_name') || 'Manoj';
  });

  // AI Assistant Wake Name (e.g. LifeOS, Jarvis, Anya, सखी)
  const [aiName, setAiName] = useState(() => {
    return localStorage.getItem('lifeos_ai_name') || 'LifeOS';
  });

  // Hands-Free Always-On Mode State (Default: true)
  const [isHandsFreeEnabled, setIsHandsFreeEnabled] = useState(() => {
    const saved = localStorage.getItem('lifeos_handsfree_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('lifeos_voice_lang') || 'mr'; // 'mr' (Marathi) or 'en' (English)
  });

  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('lifeos_voice_muted');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [speechRate, setSpeechRate] = useState(1.0);
  const [speechPitch, setSpeechPitch] = useState(1.0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Speech Recognition (STT - Mic Input) State
  const [isListening, setIsListening] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [aiResponseText, setAiResponseText] = useState('');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const recognitionRef = useRef(null);
  const isMicRunningRef = useRef(false);
  const lastSpokenTimeRef = useRef(0);
  const restartTimeoutRef = useRef(null);

  // Periodic Reminder Interval in minutes (default 30 mins, 0 for off)
  const [reminderIntervalMins, setReminderIntervalMins] = useState(30);
  const [availableVoices, setAvailableVoices] = useState([]);

  // Sample pending tasks for briefing
  const [pendingTasks, setPendingTasks] = useState([
    { id: 1, title: 'Complete React Advanced State Management', time: '11:00 AM' },
    { id: 2, title: 'System Design Interview Practice', time: '03:00 PM' },
    { id: 3, title: 'Evening Workout & Cardio Session', time: '06:30 PM' }
  ]);

  // Browser Microphone Permission Requester
  const requestMicPermission = useCallback(async () => {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        return true;
      } catch (err) {
        console.warn('Microphone permission info:', err);
        return false;
      }
    }
    return false;
  }, []);

  // Load available speech synthesis voices
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Save locked & settings state
  useEffect(() => {
    localStorage.setItem('lifeos_app_locked', JSON.stringify(isLocked));
  }, [isLocked]);

  useEffect(() => {
    localStorage.setItem('lifeos_pin_code', pinCode);
  }, [pinCode]);

  useEffect(() => {
    localStorage.setItem('lifeos_ai_name', aiName);
  }, [aiName]);

  useEffect(() => {
    localStorage.setItem('lifeos_user_name', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('lifeos_voice_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('lifeos_voice_muted', JSON.stringify(isMuted));
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem('lifeos_handsfree_mode', JSON.stringify(isHandsFreeEnabled));
  }, [isHandsFreeEnabled]);

  // Helper to safely stop mic
  const safeStopMic = useCallback(() => {
    if (recognitionRef.current && isMicRunningRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      isMicRunningRef.current = false;
      setIsListening(false);
    }
  }, []);

  // Text-To-Speech Helper
  const speakText = useCallback((text, targetLang = language) => {
    if (isMuted) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    safeStopMic();

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;

    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    if (targetLang === 'mr') {
      selectedVoice = voices.find(v => v.lang.startsWith('mr') || v.lang.includes('Marathi')) ||
                      voices.find(v => v.lang.includes('hi-IN') || v.name.includes('Hindi')) ||
                      voices.find(v => v.lang.includes('en-IN'));
      utterance.lang = selectedVoice ? selectedVoice.lang : 'mr-IN';
    } else {
      selectedVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-IN') || v.lang.startsWith('en'));
      utterance.lang = selectedVoice ? selectedVoice.lang : 'en-US';
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isMuted, language, speechRate, speechPitch, safeStopMic]);

  // Stop TTS
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Process User Voice Query (Intent Engine with Wake-Word Parsing)
  const processVoiceQuery = useCallback((query) => {
    if (!query || query.trim() === '') return;

    let cleanQuery = query.toLowerCase().trim();
    setUserTranscript(query);

    // Strip wake-words if present (e.g. "hey lifeos", "lifeos", "jarvis", "अहो lifeos")
    const wakePrefixes = ['hey lifeos', 'hey assistant', 'hi lifeos', 'lifeos', 'jarvis', 'अहो lifeos', aiName.toLowerCase()];
    for (const prefix of wakePrefixes) {
      if (cleanQuery.startsWith(prefix)) {
        cleanQuery = cleanQuery.slice(prefix.length).trim();
        cleanQuery = cleanQuery.replace(/^[,.\s]+/, '');
        break;
      }
    }

    let reply = '';
    let navTarget = null;

    // 0. AI Name / Identity Query
    if (
      cleanQuery.includes('who are you') ||
      cleanQuery.includes('what is your name') ||
      cleanQuery.includes('name') ||
      cleanQuery.includes('नाव काय') ||
      cleanQuery.includes('कोण आहेस') ||
      cleanQuery === ''
    ) {
      if (language === 'mr') {
        reply = `नमस्कार ${userName}! मी तुमची AI असिस्टंट ${aiName} आहे. मला तुम्ही "${aiName}" नावाने हाक मारू शकता!`;
      } else {
        reply = `Hi ${userName}! I am ${aiName}, your personal AI voice assistant. You can call me "${aiName}" anytime!`;
      }
    }
    // 1. Pending Tasks Query
    else if (
      cleanQuery.includes('pending') ||
      cleanQuery.includes('काम') ||
      cleanQuery.includes('task') ||
      cleanQuery.includes('आज काय') ||
      cleanQuery.includes('schedule') ||
      cleanQuery.includes('todo')
    ) {
      if (language === 'mr') {
        reply = `मनोज, आज तुमची ${pendingTasks.length} प्रलंबित कामे आहेत: १. ${pendingTasks[0]?.title || 'रिॲक्ट आर्किटेक्चर'}, २. ${pendingTasks[1]?.title || 'मुलाखत तयारी'}.`;
      } else {
        reply = `Hi ${userName}, you have ${pendingTasks.length} pending tasks for today: First, ${pendingTasks[0]?.title || 'React Architecture'}, and second, ${pendingTasks[1]?.title || 'Interview Practice'}.`;
      }
    }
    // 2. Navigation Commands
    else if (cleanQuery.includes('learning') || cleanQuery.includes('लर्निंग') || cleanQuery.includes('react') || cleanQuery.includes('mern')) {
      navTarget = '/app/learning';
      reply = language === 'mr' ? 'मी तुम्हाला लर्निंग हब वर घेऊन जात आहे.' : 'Navigating you to the Learning Hub now!';
    } else if (cleanQuery.includes('planner') || cleanQuery.includes('प्लॅनर') || cleanQuery.includes('daily')) {
      navTarget = '/app/planner';
      reply = language === 'mr' ? 'डेली प्लॅनर उघडत आहे.' : 'Opening your Daily Planner!';
    } else if (cleanQuery.includes('interview') || cleanQuery.includes('मुलाखत')) {
      navTarget = '/app/interview';
      reply = language === 'mr' ? 'इंटरव्ह्यू प्रॅप सिम्युलेटर उघडत आहे.' : 'Opening AI Interview Simulator!';
    } else if (cleanQuery.includes('fitness') || cleanQuery.includes('gym') || cleanQuery.includes('फिटनेस')) {
      navTarget = '/app/fitness';
      reply = language === 'mr' ? 'फिटनेस ट्रॅकर उघडत आहे.' : 'Opening Fitness Tracker!';
    } else if (cleanQuery.includes('project') || cleanQuery.includes('प्रकल्प')) {
      navTarget = '/app/projects';
      reply = language === 'mr' ? 'प्रोजेक्ट मॅनेजर उघडत आहे.' : 'Opening Project Manager!';
    } else if (cleanQuery.includes('goal') || cleanQuery.includes('ध्येय') || cleanQuery.includes('उद्दिष्ट')) {
      navTarget = '/app/goals';
      reply = language === 'mr' ? 'तुमचे लाईफ गोल्स उघडत आहे.' : 'Opening your Life Goals!';
    } else if (cleanQuery.includes('setting') || cleanQuery.includes('सेटअप') || cleanQuery.includes('पिन')) {
      navTarget = '/app/settings';
      reply = language === 'mr' ? 'सिस्टम सेटिंग्ज उघडत आहे.' : 'Opening System Settings!';
    }
    // 3. Greetings
    else if (cleanQuery.includes('hi') || cleanQuery.includes('hello') || cleanQuery.includes('नमस्कार') || cleanQuery.includes('मित्रा')) {
      if (language === 'mr') {
        reply = `नमस्कार ${userName}! काय चाललंय? आज मी ${aiName} तुम्हाला कशात मदत करू?`;
      } else {
        reply = `Hi ${userName}! What's up dude! ${aiName} is ready to help you!`;
      }
    }
    // 4. Default Q&A Response
    else {
      if (language === 'mr') {
        reply = `मी (${aiName}) तुमचे ऐकले: "${query}". लाइफ ओएस तुमची उत्पादकता वाढवण्यासाठी तयार आहे!`;
      } else {
        reply = `I (${aiName}) heard: "${query}". LifeOS AI is powered up and ready for your next command!`;
      }
    }

    setAiResponseText(reply);
    setIsVoiceModalOpen(true);

    // Speak AI Reply out loud
    speakText(reply, language);

    // Execute Navigation if targeted
    if (navTarget) {
      setTimeout(() => {
        navigate(navTarget);
      }, 1500);
    }
  }, [language, pendingTasks, userName, aiName, speakText, navigate]);

  // Robust Unified Speech Recognition Engine
  const startListening = useCallback(async () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (isMicRunningRef.current) return;

    // Prompt browser mic permission if not already active
    await requestMicPermission();

    try {
      safeStopMic();

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === 'mr' ? 'mr-IN' : 'en-US';

      recognition.onstart = () => {
        isMicRunningRef.current = true;
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const textChunk = event.results[i][0].transcript;
          const cleanChunk = textChunk.toLowerCase();

          // Check strictly for full wake words (e.g. "hey lifeos", "lifeos", "hey " + aiName)
          const wakeWords = ['hey lifeos', 'lifeos', 'hey ' + aiName.toLowerCase(), aiName.toLowerCase(), 'jarvis', 'अहो lifeos'];
          const hasWakeWord = wakeWords.some(w => cleanChunk.includes(w));

          // Only process voice query if full wake word is spoken OR voice modal is actively open
          if (hasWakeWord || (isVoiceModalOpen && event.results[i].isFinal)) {
            if (textChunk && textChunk.trim().length > 2) {
              processVoiceQuery(textChunk);
            }
          } else {
            setUserTranscript(textChunk);
          }
        }
      };

      recognition.onerror = (e) => {
        if (e.error !== 'no-speech' && e.error !== 'aborted') {
          console.warn('SpeechRecognition info:', e.error);
        }
        isMicRunningRef.current = false;
        setIsListening(false);
      };

      recognition.onend = () => {
        isMicRunningRef.current = false;
        setIsListening(false);

        if (isHandsFreeEnabled && !isLocked && !isSpeaking) {
          if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
          restartTimeoutRef.current = setTimeout(() => {
            if (!isMicRunningRef.current && !isLocked) {
              startListening();
            }
          }, 400);
        }
      };

      recognition.start();
    } catch (err) {
      isMicRunningRef.current = false;
      setIsListening(false);
    }
  }, [language, aiName, isHandsFreeEnabled, isLocked, isSpeaking, processVoiceQuery, safeStopMic, requestMicPermission]);

  // Hands-Free Auto Start Effect
  useEffect(() => {
    if (isLocked || !isHandsFreeEnabled) {
      safeStopMic();
      return;
    }

    if (!isMicRunningRef.current && !isSpeaking) {
      const timer = setTimeout(() => {
        startListening();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLocked, isHandsFreeEnabled, isSpeaking, startListening, safeStopMic]);

  // PIN Unlock Handler & Speech Trigger
  const unlockWithPin = useCallback(async (enteredPin) => {
    if (enteredPin === pinCode) {
      setIsLocked(false);
      await requestMicPermission();

      setTimeout(() => {
        speakGreetingAndBriefing();
      }, 400);

      return { success: true };
    }
    return { success: false, message: 'Invalid PIN Code. Please try again.' };
  }, [pinCode, requestMicPermission]);

  // Lock App
  const lockApp = useCallback(() => {
    stopSpeaking();
    safeStopMic();
    setIsLocked(true);
  }, [stopSpeaking, safeStopMic]);

  // Speech Briefing Trigger
  const speakGreetingAndBriefing = useCallback((customLang) => {
    const langToUse = customLang || language;
    const taskCount = pendingTasks.length;

    let briefingMessage = '';

    if (langToUse === 'mr') {
      briefingMessage = `नमस्कार ${userName}! काय चाललंय मित्रा? मी ${aiName} बोलत आहे. आज तुमची ${taskCount} प्रलंबित कामे आहेत. १. ${pendingTasks[0]?.title || 'डेली प्लॅनर'}, २. ${pendingTasks[1]?.title || 'लर्निंग हब'}. ऑल द बेस्ट!`;
    } else {
      briefingMessage = `Hi ${userName}! What's up dude! This is ${aiName}. You have ${taskCount} pending tasks for today. First, ${pendingTasks[0]?.title || 'Daily Planner'}, and second, ${pendingTasks[1]?.title || 'Learning Hub'}. Let's conquer the day!`;
    }

    setAiResponseText(briefingMessage);
    speakText(briefingMessage, langToUse);
  }, [language, userName, aiName, pendingTasks, speakText]);

  // Periodic Reminder Speech
  const speakPeriodicReminder = useCallback(() => {
    if (isLocked || isMuted || pendingTasks.length === 0) return;

    const randomTask = pendingTasks[Math.floor(Math.random() * pendingTasks.length)];
    let reminderText = '';

    if (language === 'mr') {
      reminderText = `अहो ${userName}! ${aiName} वेळेनुसार तुमचे काम आठवण करून देत आहे: ${randomTask.title}. कृपया वेळेवर पूर्ण करा!`;
    } else {
      reminderText = `Hey ${userName}! ${aiName} here with a reminder for your pending task: ${randomTask.title}. Keep up the momentum!`;
    }

    setAiResponseText(reminderText);
    speakText(reminderText, language);
  }, [isLocked, isMuted, pendingTasks, language, userName, aiName, speakText]);

  // Periodic Timer for Logged-In Users
  useEffect(() => {
    if (isLocked || reminderIntervalMins <= 0) return;

    const intervalMs = reminderIntervalMins * 60 * 1000;
    const timer = setInterval(() => {
      const now = Date.now();
      if (now - lastSpokenTimeRef.current >= intervalMs - 2000) {
        lastSpokenTimeRef.current = now;
        speakPeriodicReminder();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isLocked, reminderIntervalMins, speakPeriodicReminder]);

  const value = {
    isLocked,
    setIsLocked,
    pinCode,
    setPinCode,
    userName,
    setUserName,
    aiName,
    setAiName,
    isHandsFreeEnabled,
    setIsHandsFreeEnabled,
    language,
    setLanguage,
    isMuted,
    setIsMuted,
    speechRate,
    setSpeechRate,
    speechPitch,
    setSpeechPitch,
    isSpeaking,
    isListening,
    userTranscript,
    aiResponseText,
    isVoiceModalOpen,
    setIsVoiceModalOpen,
    pendingTasks,
    setPendingTasks,
    reminderIntervalMins,
    setReminderIntervalMins,
    availableVoices,
    requestMicPermission,
    startListening,
    stopListening: safeStopMic,
    processVoiceQuery,
    unlockWithPin,
    lockApp,
    speakGreetingAndBriefing,
    speakPeriodicReminder,
    speakText,
    stopSpeaking
  };

  return (
    <VoiceGuiderContext.Provider value={value}>
      {children}
    </VoiceGuiderContext.Provider>
  );
};

export const useVoiceGuider = () => {
  const context = useContext(VoiceGuiderContext);
  if (!context) {
    throw new Error('useVoiceGuider must be used within a VoiceGuiderProvider');
  }
  return context;
};
