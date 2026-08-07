import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

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

  // Real Dynamic Data persistence states
  const [pendingTasks, setPendingTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [userGoals, setUserGoals] = useState([]);
  const [dbTopics, setDbTopics] = useState([]);
  const [dbQuestions, setDbQuestions] = useState([]);
  const [dbDsaProblems, setDbDsaProblems] = useState([]);

  // Dynamically fetch live user tasks, goals & MongoDB Knowledge Base on mount / unlock
  useEffect(() => {
    let isMounted = true;
    const fetchLiveVoiceData = async () => {
      try {
        const [tasksRes, goalsRes, habitsRes, topicsRes, questionsRes, dsaRes] = await Promise.all([
          apiService.getPlannerTasks(),
          apiService.getGoals(),
          apiService.getHabits(),
          apiService.getCurriculumTopics(),
          apiService.getInterviewQuestions(),
          apiService.getDsaProblems()
        ]);
        if (isMounted) {
          if (tasksRes?.success && Array.isArray(tasksRes.data)) {
            setPendingTasks(tasksRes.data.filter((t) => !t.completed));
          }
          if (goalsRes?.success && Array.isArray(goalsRes.data)) {
            setUserGoals(goalsRes.data);
          }
          if (habitsRes?.success && Array.isArray(habitsRes.data)) {
            setHabits(habitsRes.data);
          }
          if (topicsRes?.success && Array.isArray(topicsRes.data)) {
            setDbTopics(topicsRes.data);
          }
          if (questionsRes?.success && Array.isArray(questionsRes.data)) {
            setDbQuestions(questionsRes.data);
          }
          if (dsaRes?.success && Array.isArray(dsaRes.data)) {
            setDbDsaProblems(dsaRes.data);
          }
        }
      } catch (err) {
        console.warn('Voice data dynamic fetch notice:', err.message);
      }
    };

    if (!isLocked) {
      fetchLiveVoiceData();
    }
    return () => { isMounted = false; };
  }, [isLocked]);


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

  // Dynamic MongoDB Atlas & Tech Dictionary AI Assistant Knowledge Engine
  const generateKnowledgeAnswer = useCallback((cleanQuery, targetLang) => {
    if (!cleanQuery) return targetLang === 'mr' ? 'नमस्कार! मी ऐकत आहे, सांगा काय मदत करू?' : 'Hi! LifeOS AI is listening, how can I help you?';

    const lowerQ = cleanQuery.toLowerCase().trim();

    // 1. Extract core tech keywords by removing Marathi & English stop words
    const stopWords = ['म्हणजे', 'काय', 'बद्दल', 'सांग', 'बघू', 'मदत', 'करा', 'आहे', 'आहेस', 'कसे', 'व्हाट', 'माहिती', 'उत्तर', 'what', 'is', 'tell', 'me', 'about', 'explain', 'how', 'to', 'the', 'a', 'an'];
    const tokens = lowerQ
      .split(/[\s,?.!]+/)
      .filter(w => w.length > 1 && !stopWords.includes(w));

    // Helper: Check if item contains any query token
    const matchesTokens = (text) => {
      if (!text) return false;
      const lowerText = text.toLowerCase();
      return tokens.some(token => lowerText.includes(token));
    };

    // 2. Search MongoDB Curriculum Topics
    const matchedTopic = dbTopics.find(t =>
      matchesTokens(t.topicName) ||
      matchesTokens(t.title) ||
      matchesTokens(t.conceptExplanation)
    );

    if (matchedTopic) {
      const titleStr = matchedTopic.topicName || matchedTopic.title;
      const exp = matchedTopic.conceptExplanation || matchedTopic.taskDescription || titleStr;
      return targetLang === 'mr'
        ? `${titleStr}: ${exp.slice(0, 160)}.`
        : `${titleStr}: ${exp.slice(0, 160)}.`;
    }

    // 3. Search MongoDB Interview Questions
    const matchedQuestion = dbQuestions.find(q =>
      matchesTokens(q.question) ||
      matchesTokens(q.marathiIntent) ||
      matchesTokens(q.answer)
    );

    if (matchedQuestion) {
      const qTitle = matchedQuestion.marathiIntent || matchedQuestion.question;
      const ans = matchedQuestion.answer || qTitle;
      return targetLang === 'mr'
        ? `${qTitle}: ${ans.slice(0, 160)}.`
        : `${qTitle}: ${ans.slice(0, 160)}.`;
    }

    // 4. Search MongoDB DSA Problems
    const matchedDsa = dbDsaProblems.find(d =>
      matchesTokens(d.title) ||
      matchesTokens(d.topic) ||
      matchesTokens(d.description)
    );

    if (matchedDsa) {
      const hint = matchedDsa.hint || matchedDsa.description;
      return targetLang === 'mr'
        ? `DSA समस्या (${matchedDsa.title}): ${hint.slice(0, 160)}.`
        : `DSA Problem (${matchedDsa.title}): ${hint.slice(0, 160)}.`;
    }

    // 5. Rich Full-Stack Tech Knowledge Dictionary (Fallback AI Engine)
    if (lowerQ.includes('react') || lowerQ.includes('रिॲक्ट')) {
      return targetLang === 'mr'
        ? 'रिॲक्ट ही युझर इंटरफेस (UI) तयार करण्यासाठी वापरली जाणारी लोकप्रिय जावास्क्रिप्ट लायब्ररी आहे, जी व्हर्च्युअल DOM वर काम करते.'
        : 'React is a popular JavaScript library for building user interfaces using Virtual DOM and reusable components.';
    }
    if (lowerQ.includes('express') || lowerQ.includes('एक्सप्रेस')) {
      return targetLang === 'mr'
        ? 'एक्सप्रेस हे Node.js मधील जलद आणि लाईटवेट REST API बॅकएंड फ्रेमवर्क आहे.'
        : 'Express is a minimal and flexible Node.js web application framework for building RESTful APIs.';
    }
    if (lowerQ.includes('mongo') || lowerQ.includes('मोंगो')) {
      return targetLang === 'mr' ? 'मोंगोडीबी हा NoSQL दस्तऐवज-आधारित डेटाबेस आहे जो JSON सारख्या BSON फॉरमॅटमध्ये डेटा स्टोअर करतो.' : 'MongoDB is a NoSQL document database that stores data in flexible BSON format.';
    }
    if (lowerQ.includes('node') || lowerQ.includes('नोड')) {
      return targetLang === 'mr' ? 'Node.js हा जावास्क्रिप्टचा बॅकएंड रनटाईम एन्व्हायर्नमेंट आहे जो व्हॉट्सॲप सारखे रिअल-टाईम सर्व्हर चालवतो.' : 'Node.js is an asynchronous event-driven JavaScript backend runtime environment.';
    }
    if (lowerQ.includes('docker') || lowerQ.includes('डॉकर')) {
      return targetLang === 'mr' ? 'डॉकर हे ॲप्लिकेशन लाईटवेट आणि पोर्टेबल कंटेनरमध्ये चालवणारे प्लॅटफॉर्म आहे.' : 'Docker is a containerization platform for deploying lightweight software applications.';
    }
    if (lowerQ.includes('vps') || lowerQ.includes('hostinger') || lowerQ.includes('nginx')) {
      return targetLang === 'mr' ? 'Nginx हा हाय-परफॉर्मन्स रिव्हर्स प्रॉक्सी सर्व्हर आहे जो पोर्ट १२३५ वरून ॲप्स सर्व्ह करतो.' : 'Nginx is a high-performance reverse proxy server that routes web requests.';
    }
    if (lowerQ.includes('state') || lowerQ.includes('स्टेट')) {
      return targetLang === 'mr' ? 'रिॲक्ट स्टेट हे कॉम्पोनंटचा डायनॅमिक डेटा स्टोअर करते आणि UI री-रेंडर करते.' : 'React State manages dynamic component data and triggers UI re-renders.';
    }
    if (lowerQ.includes('props') || lowerQ.includes('प्रॉप्स')) {
      return targetLang === 'mr' ? 'प्रॉप्स द्वारे पॅरेंट कॉम्पोनंटकडून चाईल्ड कॉम्पोनंटला डेटा पाठवला जातो.' : 'Props are read-only properties passed from parent to child components.';
    }
    if (lowerQ.includes('closure') || lowerQ.includes('क्लोजर')) {
      return targetLang === 'mr' ? 'क्लोजर मुळे इनर फंक्शन आऊटर फंक्शनच्या व्हेरियबल्सना ॲक्सेस करू शकते.' : 'A closure gives an inner function access to an outer function scope.';
    }
    if (lowerQ.includes('promise') || lowerQ.includes('प्रॉमिस')) {
      return targetLang === 'mr' ? 'प्रॉमिस हे जावास्क्रिप्ट मधील अस्ंक्रोनस ऑपरेशन्स हाताळण्यासाठी वापरले जाते.' : 'Promises represent the eventual completion or failure of an asynchronous operation.';
    }
    if (lowerQ.includes('dsa') || lowerQ.includes('array')) {
      return targetLang === 'mr' ? 'DSA म्हणजे डेटा स्ट्रक्चर्स आणि अल्गोरिदम्स, जे कोडिंग समस्या सोडवण्यासाठी लागतात.' : 'DSA stands for Data Structures and Algorithms for problem solving.';
    }

    return targetLang === 'mr'
      ? `मी मोंगो डेटाबेस आणि लर्निंग हबमध्ये शोधत आहे. तुम्ही मला MERN, Docker, React, State किंवा DSA बद्दल विचारू शकता.`
      : `Searching MERN & Engineering Knowledge Base. You can ask about React, Express, MongoDB, Docker, or DSA.`;
  }, [dbTopics, dbQuestions, dbDsaProblems]);

  // Process User Voice Query
  const processVoiceQuery = useCallback((query) => {
    if (!query || query.trim() === '') return;

    let cleanQuery = query.toLowerCase().trim();
    setUserTranscript(query);

    const wakePrefixes = [
      'hey life os', 'hi life os', 'hello life os', 'hey lifeos', 'hi lifeos',
      'hello lifeos', 'life os', 'live os', 'light os', 'lifeos',
      'hey assistant', 'hi assistant', 'hey jarvis', 'jarvis',
      'अहो lifeos', 'लायफ ओएस', 'लाइफ ओएस', 'लायफ', 'लाइफ',
      aiName.toLowerCase()
    ];
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
    } else if (cleanQuery.includes('habit') || cleanQuery.includes('हॅबिट') || cleanQuery.includes('सवयी')) {
      navTarget = '/app/habits';
      reply = language === 'mr' ? 'हॅबिट ट्रॅकर उघडत आहे!' : 'Opening Habit Tracker!';
    }
    // Standalone Wake Word Greeting (Natural & Helpful, No Robotic Echo!)
    else if (cleanQuery === '' || cleanQuery === 'hey' || cleanQuery === 'hi' || cleanQuery === 'hello' || cleanQuery === 'lifeos' || cleanQuery === 'life os') {
      reply = language === 'mr'
        ? `नमस्कार! मी ऐकत आहे, सांगा मी काय मदत करू?`
        : `Hi! LifeOS AI is listening, how can I help you?`;
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
  }, [language, aiName, speakText, navigate, generateKnowledgeAnswer]);

  // Unified Speech Recognition State Machine Engine
  const startListening = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (isLocked || voiceStatus === 'SPEAKING') return;

    // Strict Interlock: Do NOT start listening if browser TTS is currently speaking
    if ('speechSynthesis' in window && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) {
      return;
    }

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
            .replace(/liveos|lightos|life-os|life_os|lifehouse|laifos|laif/g, 'lifeos')
            .replace(/लाइफओएस|लायफओएस|लाइफओस|लायफओॲस|लायफ|लाइफ/g, 'lifeos');

          const wakeWords = [
            'lifeos', 'heylifeos', 'heyassistant', 'jarvis', 'अहोlifeos',
            'life', 'os', 'hey', 'hi', 'hello', 'laif', 'laifos',
            aiName.toLowerCase().replace(/\s+/g, ''),
            'hey' + aiName.toLowerCase().replace(/\s+/g, '')
          ];

          const hasWakeWord = wakeWords.some(w =>
            normalized.includes(w) ||
            rawClean.includes('life os') ||
            rawClean.includes('live os') ||
            rawClean.includes('light os') ||
            rawClean.includes('hi life') ||
            rawClean.includes('hey life') ||
            rawClean.includes('लाइफ') ||
            rawClean.includes('लायफ') ||
            rawClean.includes('hey') ||
            rawClean.includes('hi')
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

        const isBrowserSpeaking = 'speechSynthesis' in window && window.speechSynthesis.speaking;
        if (isHandsFreeEnabled && !isLocked && voiceStatus !== 'SPEAKING' && !isBrowserSpeaking) {
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
    console.warn('useVoiceGuider was used outside a VoiceGuiderProvider. Falling back to default voice guider state.');
    return {
      isVoiceGuided: false,
      setIsVoiceGuided: () => {},
      toggleVoiceGuided: () => {},
      isListening: false,
      isSpeaking: false,
      transcript: '',
      setTranscript: () => {},
      guiderLanguage: 'en-US',
      setGuiderLanguage: () => {},
      isPinLocked: false,
      setIsPinLocked: () => {},
      verifyPin: () => false,
      setPinCode: () => {},
      isAssistantModalOpen: false,
      setIsAssistantModalOpen: () => {},
      speakText: () => {},
      stopSpeaking: () => {}
    };
  }
  return context;
};
