import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceGuiderContext = createContext(null);

export const VoiceGuiderProvider = ({ children }) => {
  const navigate = useNavigate();

  // App Security State
  const [pinCode, setPinCode] = useState(() => {
    try {
      return localStorage.getItem('lifeos_user_pin') || '1234';
    } catch (e) {
      return '1234';
    }
  });

  const [isLocked, setIsLocked] = useState(() => {
    try {
      const session = localStorage.getItem('lifeos_session');
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed.onboardingCompleted) return false;
      }
      return true;
    } catch (e) {
      return true;
    }
  });

  const setupCustomPin = useCallback((newPin) => {
    if (newPin && newPin.length === 4) {
      setPinCode(newPin);
      localStorage.setItem('lifeos_user_pin', newPin);
      setIsLocked(false);
    }
  }, []);
  const [userName, setUserName] = useState('');
  const [aiName, setAiName] = useState('LifeOS');

  // Voice Personality Tone: 'sakhi' | 'coach' | 'mentor'
  const [voicePersonality, setVoicePersonality] = useState('sakhi');

  // Hands-Free Mode State
  const [isHandsFreeEnabled, setIsHandsFreeEnabled] = useState(true);
  const [language, setLanguage] = useState('mr');
  const [isMuted, setIsMuted] = useState(false);

  // Single Deterministic Voice State Machine: 'IDLE' | 'LISTENING' | 'SPEAKING'
  const [voiceStatus, setVoiceStatus] = useState('IDLE');

  const [userTranscript, setUserTranscript] = useState('');
  const [aiResponseText, setAiResponseText] = useState('');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const recognitionRef = useRef(null);
  const isMicRunningRef = useRef(false);
  const speechDebounceRef = useRef(null);
  const startListeningRef = useRef(null);

  const speechRate = voicePersonality === 'coach' ? 1.15 : voicePersonality === 'mentor' ? 0.95 : 1.0;
  const speechPitch = voicePersonality === 'coach' ? 1.1 : voicePersonality === 'mentor' ? 0.9 : 1.0;

  // Data persistence states
  const [pendingTasks, setPendingTasks] = useState([
    { id: 1, title: 'Complete React Advanced State Management', time: '11:00 AM' },
    { id: 2, title: 'System Design Interview Practice', time: '03:00 PM' }
  ]);

  const [habits, setHabits] = useState([
    { id: 1, title: 'Drink 3 Liters Water', streak: 5 }
  ]);

  const [userGoals, setUserGoals] = useState([
    { id: 1, title: 'Master MERN Fullstack & Hostinger VPS', status: 'In Progress' }
  ]);


  // Safe Microphone Stopper
  const safeStopMic = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      recognitionRef.current = null;
    }
    isMicRunningRef.current = false;
    setVoiceStatus('IDLE');
  }, []);

  // Safe Microphone Permission Requester
  const requestMicPermission = useCallback(async () => {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        return true;
      } catch (err) {
        return false;
      }
    }
    return false;
  }, []);

  // Text-To-Speech Synthesis Engine
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

    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.onstart = () => {
      setVoiceStatus('SPEAKING');
    };

    utterance.onend = () => {
      setVoiceStatus('IDLE');
      if (isHandsFreeEnabled && !isLocked) {
        setTimeout(() => {
          if (startListeningRef.current) startListeningRef.current();
        }, 400);
      }
    };

    utterance.onerror = () => {
      setVoiceStatus('IDLE');
      if (isHandsFreeEnabled && !isLocked) {
        setTimeout(() => {
          if (startListeningRef.current) startListeningRef.current();
        }, 400);
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [isMuted, language, speechRate, speechPitch, isHandsFreeEnabled, isLocked, safeStopMic]);

  // Expanded Knowledge Generator
  const generateKnowledgeAnswer = useCallback((cleanQuery, targetLang) => {
    if (cleanQuery.includes('docker') || cleanQuery.includes('डॉकर')) {
      return targetLang === 'mr' ? 'डॉकर हे ॲप्लिकेशन लाईटवेट कंटेनरमध्ये चालवणारे प्लॅटफॉर्म आहे.' : 'Docker is a containerization platform for light-weight apps.';
    }
    if (cleanQuery.includes('vps') || cleanQuery.includes('hostinger')) {
      return targetLang === 'mr' ? 'होस्टिंगर VPS वर Nginx आणि PM2 द्वारे ॲप लाईव्ह ठेवले जातात.' : 'Hostinger VPS runs Node.js live using Nginx and PM2.';
    }
    if (cleanQuery.includes('state') || cleanQuery.includes('स्टेट')) {
      return targetLang === 'mr' ? 'रिॲक्ट स्टेट हे कॉम्पोनंटचा डेटा स्टोअर करते व UI अपडेट करते.' : 'React State holds dynamic component data.';
    }
    if (cleanQuery.includes('mern') || cleanQuery.includes('मर्न')) {
      return targetLang === 'mr' ? 'मर्न स्टॅक मध्ये MongoDB, Express, React आणि Node.js समाविष्ट आहेत.' : 'MERN stack includes MongoDB, Express, React, and Node.js.';
    }
    return targetLang === 'mr'
      ? `मी तुमचे ऐकले: "${cleanQuery}". मी लाईफ ओएस मध्ये माहिती विश्लेषित करत आहे.`
      : `I heard: "${cleanQuery}". LifeOS AI is processing your input.`;
  }, []);

  // Process User Voice Query
  const processVoiceQuery = useCallback((query) => {
    if (!query || query.trim() === '') return;

    let cleanQuery = query.toLowerCase().trim();
    setUserTranscript(query);

    const wakePrefixes = ['hey lifeos', 'hey assistant', 'hi lifeos', 'lifeos', 'jarvis', 'अहो lifeos', aiName.toLowerCase()];
    for (const prefix of wakePrefixes) {
      if (cleanQuery.startsWith(prefix)) {
        cleanQuery = cleanQuery.slice(prefix.length).trim().replace(/^[,.\s]+/, '');
        break;
      }
    }

    let reply = '';
    let navTarget = null;

    // Navigation Matrix
    if (cleanQuery.includes('dashboard') || cleanQuery.includes('डॅशबोर्ड') || cleanQuery.includes('home')) {
      navTarget = '/app/dashboard';
      reply = language === 'mr' ? 'डॅशबोर्ड उघडत आहे!' : 'Opening Dashboard Overview!';
    } else if (cleanQuery.includes('planner') || cleanQuery.includes('प्लॅनर') || cleanQuery.includes('daily')) {
      navTarget = '/app/planner';
      reply = language === 'mr' ? 'डेली प्लॅनर उघडत आहे!' : 'Opening Daily Planner!';
    } else if (cleanQuery.includes('goals') || cleanQuery.includes('गोल्स') || cleanQuery.includes('ध्येय')) {
      navTarget = '/app/goals';
      reply = language === 'mr' ? 'तुमचे लाईफ गोल्स उघडत आहे!' : 'Opening Life Goals!';
    } else if (cleanQuery.includes('learning') || cleanQuery.includes('लर्निंग') || cleanQuery.includes('hub')) {
      navTarget = '/app/learning';
      reply = language === 'mr' ? 'लर्निंग हब उघडत आहे!' : 'Opening Learning Hub!';
    } else if (cleanQuery.includes('interview') || cleanQuery.includes('इंटरव्ह्यू') || cleanQuery.includes('मुलाखत')) {
      navTarget = '/app/interview';
      reply = language === 'mr' ? 'इंटरव्ह्यू प्रॅप उघडत आहे!' : 'Opening Interview Studio!';
    } else if (cleanQuery.includes('fitness') || cleanQuery.includes('फिटनेस') || cleanQuery.includes('gym')) {
      navTarget = '/app/fitness';
      reply = language === 'mr' ? 'फिटनेस ट्रॅकर उघडत आहे!' : 'Opening Fitness Tracker!';
    } else if (cleanQuery.includes('habit') || cleanQuery.includes('हॅबिट') || cleanQuery.includes('सवयी')) {
      navTarget = '/app/habits';
      reply = language === 'mr' ? 'हॅबिट ट्रॅकर उघडत आहे!' : 'Opening Habit Tracker!';
    }
    // Standalone Wake Word Greeting
    else if (cleanQuery === '' || cleanQuery === 'hey' || cleanQuery === 'hi') {
      reply = language === 'mr'
        ? `नमस्कार ${userName}! मी ${aiName} ऐकत आहे, बोला मी काय मदत करू?`
        : `Hi ${userName}! ${aiName} is listening, how can I help you?`;
    }
    // General Q&A
    else {
      reply = generateKnowledgeAnswer(cleanQuery, language);
    }

    setAiResponseText(reply);
    setIsVoiceModalOpen(true);
    speakText(reply, language);

    if (navTarget) {
      setTimeout(() => {
        navigate(navTarget);
      }, 1200);
    }
  }, [language, userName, aiName, speakText, navigate, generateKnowledgeAnswer]);

  // Unified Speech Recognition State Machine Engine
  const startListening = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (isLocked || voiceStatus === 'SPEAKING') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (isMicRunningRef.current) return;

    await requestMicPermission();

    try {
      safeStopMic();

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        isMicRunningRef.current = true;
        setVoiceStatus('LISTENING');
      };

      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const textChunk = event.results[i][0].transcript;
          if (!textChunk) continue;

          const rawClean = textChunk.toLowerCase().trim();
          const normalized = rawClean
            .replace(/\s+/g, '')
            .replace(/liveos|lightos|life-os|life_os|lifehouse/g, 'lifeos')
            .replace(/लाइफओएस|लायफओएस|लाइफओस|लायफओॲस/g, 'lifeos');

          const wakeWords = [
            'lifeos', 'heylifeos', 'heyassistant', 'jarvis', 'अहोlifeos',
            aiName.toLowerCase().replace(/\s+/g, ''),
            'hey' + aiName.toLowerCase().replace(/\s+/g, '')
          ];

          const hasWakeWord = wakeWords.some(w =>
            normalized.includes(w) ||
            rawClean.includes('life os') ||
            rawClean.includes('live os') ||
            rawClean.includes('light os') ||
            rawClean.includes('लाइफ') ||
            rawClean.includes('लायफ')
          );

          setUserTranscript(textChunk);

          if (hasWakeWord || isVoiceModalOpen) {
            if (event.results[i].isFinal) {
              if (speechDebounceRef.current) clearTimeout(speechDebounceRef.current);
              processVoiceQuery(textChunk);
            } else {
              if (speechDebounceRef.current) clearTimeout(speechDebounceRef.current);
              speechDebounceRef.current = setTimeout(() => {
                if (textChunk && textChunk.trim().length > 1) {
                  processVoiceQuery(textChunk);
                }
              }, 600);
            }
          }
        }
      };

      recognition.onerror = () => {
        isMicRunningRef.current = false;
        setVoiceStatus('IDLE');
      };

      recognition.onend = () => {
        isMicRunningRef.current = false;
        setVoiceStatus('IDLE');

        if (isHandsFreeEnabled && !isLocked && voiceStatus !== 'SPEAKING') {
          setTimeout(() => {
            if (!isMicRunningRef.current && !isLocked) {
              if (startListeningRef.current) startListeningRef.current();
            }
          }, 400);
        }
      };

      recognition.start();
    } catch (err) {
      isMicRunningRef.current = false;
      setVoiceStatus('IDLE');
    }
  }, [language, aiName, isHandsFreeEnabled, isLocked, voiceStatus, isVoiceModalOpen, processVoiceQuery, safeStopMic, requestMicPermission]);

  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  // Initial Hands-Free Start
  useEffect(() => {
    if (isLocked || !isHandsFreeEnabled || voiceStatus === 'SPEAKING') return;

    if (!isMicRunningRef.current) {
      const timer = setTimeout(() => {
        if (startListeningRef.current) startListeningRef.current();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLocked, isHandsFreeEnabled, voiceStatus]);

  // PIN Unlock Handler
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
    safeStopMic();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsLocked(true);
  }, [safeStopMic]);

  // Speech Briefing Trigger
  const speakGreetingAndBriefing = useCallback((customLang) => {
    const langToUse = customLang || language;
    let briefingMessage = langToUse === 'mr'
      ? `नमस्कार ${userName}! मी ${aiName} बोलत आहे. आज तुमची ${pendingTasks.length} प्रलंबित कामे आहेत. १. ${pendingTasks[0]?.title || 'डेली प्लॅनर'}, २. ${pendingTasks[1]?.title || 'लर्निंग हब'}. ऑल द बेस्ट!`
      : `Hi ${userName}! This is ${aiName}. You have ${pendingTasks.length} pending tasks for today. First, ${pendingTasks[0]?.title || 'Daily Planner'}, and second, ${pendingTasks[1]?.title || 'Learning Hub'}. Let's conquer the day!`;

    setAiResponseText(briefingMessage);
    speakText(briefingMessage, langToUse);
  }, [language, userName, aiName, pendingTasks, speakText]);

  // Value Bundle
  const value = {
    isLocked,
    setIsLocked,
    pinCode,
    setPinCode,
    userName,
    setUserName,
    aiName,
    setAiName,
    voicePersonality,
    setVoicePersonality,
    isHandsFreeEnabled,
    setIsHandsFreeEnabled,
    language,
    setLanguage,
    isMuted,
    setIsMuted,
    speechRate,
    speechPitch,
    voiceStatus,
    isListening: voiceStatus === 'LISTENING',
    isSpeaking: voiceStatus === 'SPEAKING',
    userTranscript,
    aiResponseText,
    isVoiceModalOpen,
    setIsVoiceModalOpen,
    pendingTasks,
    setPendingTasks,
    habits,
    setHabits,
    userGoals,
    setUserGoals,
    requestMicPermission,
    startListening,
    stopListening: safeStopMic,
    processVoiceQuery,
    unlockWithPin,
    setupCustomPin,
    lockApp,
    speakGreetingAndBriefing,
    speakText,
    stopSpeaking: safeStopMic
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
