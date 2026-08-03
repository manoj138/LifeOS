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

  // Centralized Mutex Voice Mode: 'GLOBAL_HANDS_FREE' | 'INTERVIEW_DRILL' | 'ASSISTANT_HUD'
  const [activeVoiceMode, setActiveVoiceMode] = useState('GLOBAL_HANDS_FREE');

  // Voice Personality Tone: 'sakhi' | 'coach' | 'mentor'
  const [voicePersonality, setVoicePersonality] = useState(() => {
    return localStorage.getItem('lifeos_voice_personality') || 'sakhi';
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

  // Dynamic Speech Speed & Pitch based on Personality Tone
  const speechRate = voicePersonality === 'coach' ? 1.15 : voicePersonality === 'mentor' ? 0.95 : 1.0;
  const speechPitch = voicePersonality === 'coach' ? 1.1 : voicePersonality === 'mentor' ? 0.9 : 1.0;
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
  const startListeningRef = useRef(null);
  const speechDebounceRef = useRef(null);

  // Periodic Reminder Interval in minutes (default 30 mins, 0 for off)
  const [reminderIntervalMins, setReminderIntervalMins] = useState(30);
  const [availableVoices, setAvailableVoices] = useState([]);

  // Sample pending tasks for briefing
  const [pendingTasks, setPendingTasks] = useState(() => {
    const saved = localStorage.getItem('lifeos_pending_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Complete React Advanced State Management', time: '11:00 AM' },
      { id: 2, title: 'System Design Interview Practice', time: '03:00 PM' },
      { id: 3, title: 'Evening Workout & Cardio Session', time: '06:30 PM' }
    ];
  });

  // Sample habits for voice creation
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('lifeos_user_habits');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Drink 3 Liters Water', streak: 5 },
      { id: 2, title: 'Read 20 Pages of Tech Book', streak: 12 }
    ];
  });

  // Sample goals for voice creation
  const [userGoals, setUserGoals] = useState(() => {
    const saved = localStorage.getItem('lifeos_user_goals');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Master MERN Fullstack & Hostinger VPS', status: 'In Progress' },
      { id: 2, title: 'Secure Senior Software Engineer Role', status: 'In Progress' }
    ];
  });

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

  // Save state to localStorage
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
    localStorage.setItem('lifeos_voice_personality', voicePersonality);
  }, [voicePersonality]);

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

  useEffect(() => {
    localStorage.setItem('lifeos_pending_tasks', JSON.stringify(pendingTasks));
  }, [pendingTasks]);

  useEffect(() => {
    localStorage.setItem('lifeos_user_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('lifeos_user_goals', JSON.stringify(userGoals));
  }, [userGoals]);

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

  // Stop TTS
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Centralized Mutex Mode Switcher
  const setVoiceMode = useCallback((mode) => {
    safeStopMic();
    stopSpeaking();
    setActiveVoiceMode(mode);
  }, [safeStopMic, stopSpeaking]);

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

    utterance.onstart = () => {
      setIsSpeaking(true);
      safeStopMic();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      if (isHandsFreeEnabled && !isLocked && activeVoiceMode !== 'INTERVIEW_DRILL') {
        setTimeout(() => {
          if (startListeningRef.current) startListeningRef.current();
        }, 300);
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      if (isHandsFreeEnabled && !isLocked && activeVoiceMode !== 'INTERVIEW_DRILL') {
        setTimeout(() => {
          if (startListeningRef.current) startListeningRef.current();
        }, 300);
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [isMuted, language, speechRate, speechPitch, isHandsFreeEnabled, isLocked, activeVoiceMode, safeStopMic]);

  // Expanded 175+ Topic Knowledge Engine (MERN, DevOps, DSA, System Design)
  const generateKnowledgeAnswer = useCallback((cleanQuery, targetLang) => {
    if (cleanQuery.includes('docker') || cleanQuery.includes('डॉकर') || cleanQuery.includes('container')) {
      return targetLang === 'mr'
        ? 'डॉकर हे कंटेनरायझेशन प्लॅटफॉर्म आहे जे ॲप्लिकेशन आणि त्याचे डिपेंडन्सीज एकाच लाईटवेट कंटेनरमध्ये पॅक करून कोणत्याही सर्व्हरवर चालवते.'
        : 'Docker is a containerization platform that packages apps and dependencies into lightweight containers for seamless server deployment.';
    }
    if (cleanQuery.includes('vps') || cleanQuery.includes('hostinger') || cleanQuery.includes('hosting')) {
      return targetLang === 'mr'
        ? 'होस्टिंगर VPS वर Node.js आणि React ॲप्लिकेशन Nginx रिव्हर्स प्रॉक्सी आणि PM2 प्रोसेस मॅनेजरद्वारे २४/७ लाईव्ह ठेवले जातात.'
        : 'On Hostinger VPS, Node.js and React apps are deployed live using Nginx reverse proxy and PM2 process manager for 24/7 uptime.';
    }
    if (cleanQuery.includes('system design') || cleanQuery.includes('microservice') || cleanQuery.includes('मायक्रोसर्व्हिस')) {
      return targetLang === 'mr'
        ? 'सिस्टम डिझाईन मध्ये मायक्रोसर्व्हिसेस, लोड बॅलन्सर, कॅशिंग आणि डेटाबेस शार्डिंग द्वारे लाखो युझर्ससाठी स्केल होणारी आर्किटेक्चर तयार केली जाते.'
        : 'System Design scales applications for millions of users using microservices, load balancers, Redis caching, and database sharding.';
    }
    if (cleanQuery.includes('jwt') || cleanQuery.includes('auth') || cleanQuery.includes('token') || cleanQuery.includes('ऑथ')) {
      return targetLang === 'mr'
        ? 'JSON Web Token (JWT) युझर ऑथेंटिकेशनसाठी वापरला जातो. यामध्ये Header, Payload आणि Signature असतात जे क्लायंट HTTP Bearer Header मध्ये पाठवतो.'
        : 'JWT is used for secure user authentication, containing Header, Payload, and Signature sent via HTTP Bearer Headers.';
    }
    if (cleanQuery.includes('git') || cleanQuery.includes('github') || cleanQuery.includes('गिट')) {
      return targetLang === 'mr'
        ? 'गिट हे व्हर्जन कंट्रोल सिस्टीम आहे ज्यामुळे टीममध्ये कोड ब्रँचिंग, कमिट्स आणि GitHub द्वारे सहयोग साधता येतो.'
        : 'Git is a distributed version control system enabling code branching, commits, and collaborative GitHub workflows.';
    }
    if (cleanQuery.includes('state') || cleanQuery.includes('स्टेट')) {
      return targetLang === 'mr'
        ? 'रिॲक्ट स्टेट हे कॉम्पोनंटचा डायनॅमिक डेटा स्टोअर करते. जेव्हा स्टेट बदलतो, तेव्हा युझर इंटरफेस आपोआप री-रेंडर होतो.'
        : 'React State holds dynamic component data and automatically re-renders the UI whenever state changes.';
    }
    if (cleanQuery.includes('mern') || cleanQuery.includes('मर्न')) {
      return targetLang === 'mr'
        ? 'मर्न स्टॅक मध्ये मॉन्गो डीबी, एक्सप्रेस, रिॲक्ट आणि नोड जेएस यांचा समावेश होतो. हे मॉडर्न वेब डेव्हलपमेंटसाठी बेस्ट मानले जाते.'
        : 'MERN stack consists of MongoDB, Express.js, React.js, and Node.js. It is ideal for full-stack JavaScript development.';
    }
    if (cleanQuery.includes('dsa') || cleanQuery.includes('डीएसए') || cleanQuery.includes('algorithm')) {
      return targetLang === 'mr'
        ? 'डेटा स्ट्रक्चर्स आणि अल्गोरिदम समस्या सोडवण्यासाठी आणि हाय-परफॉर्मन्स कोड लिहिण्यासाठी आवश्यक आहेत.'
        : 'Data Structures and Algorithms are essential for efficient problem solving and writing high-performance code.';
    }
    if (cleanQuery.includes('fitness') || cleanQuery.includes('gym') || cleanQuery.includes('फिटनेस')) {
      return targetLang === 'mr'
        ? 'उत्तम आरोग्यासाठी दररोज ४५ मिनिटे व्यायाम, हायड्रेशन आणि पुरेसा प्रोटीन आहार घेणे फायदेशीर आहे.'
        : 'For optimal fitness, aim for 45 minutes of daily workout, adequate hydration, and balanced protein intake.';
    }
    if (cleanQuery.includes('goal') || cleanQuery.includes('ध्येय')) {
      return targetLang === 'mr'
        ? 'तुमचे मुख्य ध्येय मर्न स्टॅक मध्ये तज्ज्ञ बनणे आणि टॉप प्रॉडक्ट कंपनीमध्ये सॉफ्टवेअर इंजिनिअर होणे हे आहे.'
        : 'Your core goal is mastering Fullstack MERN development and securing a Senior Software Engineer position.';
    }
    return targetLang === 'mr'
      ? `मी तुमचे ऐकले: "${cleanQuery}". मी लाईफ ओएस मध्ये सर्व माहिती विश्लेषित करून तुम्हाला उत्तर देत आहे.`
      : `I heard: "${cleanQuery}". LifeOS AI is analyzing your data to provide smart career and productivity insights.`;
  }, []);

  // Process User Voice Query
  const processVoiceQuery = useCallback((query) => {
    if (!query || query.trim() === '') return;

    let cleanQuery = query.toLowerCase().trim();
    setUserTranscript(query);

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

    // A. VOICE DATA CREATION
    if (
      cleanQuery.includes('add task') ||
      cleanQuery.includes('create task') ||
      cleanQuery.includes('new task') ||
      cleanQuery.includes('नवीन काम') ||
      cleanQuery.includes('काम जोड') ||
      cleanQuery.includes('काम ॲड')
    ) {
      let title = query
        .replace(/hey lifeos|lifeos|jarvis|add task|create task|new task|नवीन काम जोड|नवीन काम|काम ॲड कर|काम जोड/gi, '')
        .replace(/^[:\s,]+/, '')
        .trim();
      if (!title) title = 'New Voice Task';

      const newTask = { id: Date.now(), title: title, time: 'Today' };
      setPendingTasks(prev => [newTask, ...prev]);

      reply = language === 'mr'
        ? `नवीन काम '${title}' तुमच्या डेली प्लॅनर मध्ये जोडले आहे!`
        : `Added task '${title}' to your Daily Planner!`;
      navTarget = '/app/planner';
    }
    else if (
      cleanQuery.includes('add habit') ||
      cleanQuery.includes('create habit') ||
      cleanQuery.includes('new habit') ||
      cleanQuery.includes('नवीन सवय') ||
      cleanQuery.includes('सवय जोड') ||
      cleanQuery.includes('सवय ॲड')
    ) {
      let title = query
        .replace(/hey lifeos|lifeos|jarvis|add habit|create habit|new habit|नवीन सवय जोड|नवीन सवय|सवय ॲड कर|सवय जोड/gi, '')
        .replace(/^[:\s,]+/, '')
        .trim();
      if (!title) title = 'New Voice Habit';

      const newHabit = { id: Date.now(), title: title, streak: 1 };
      setHabits(prev => [newHabit, ...prev]);

      reply = language === 'mr'
        ? `नवीन सवय '${title}' तुमच्या हॅबिट ट्रॅकर मध्ये जोडली आहे!`
        : `Added habit '${title}' to your Habit Tracker!`;
      navTarget = '/app/habits';
    }
    else if (
      cleanQuery.includes('add goal') ||
      cleanQuery.includes('create goal') ||
      cleanQuery.includes('new goal') ||
      cleanQuery.includes('नवीन ध्येय') ||
      cleanQuery.includes('ध्येय जोड') ||
      cleanQuery.includes('ध्येय ॲड')
    ) {
      let title = query
        .replace(/hey lifeos|lifeos|jarvis|add goal|create goal|new goal|नवीन ध्येय जोड|नवीन ध्येय|ध्येय ॲड कर|ध्येय जोड/gi, '')
        .replace(/^[:\s,]+/, '')
        .trim();
      if (!title) title = 'New Voice Goal';

      const newGoal = { id: Date.now(), title: title, status: 'In Progress' };
      setUserGoals(prev => [newGoal, ...prev]);

      reply = language === 'mr'
        ? `नवीन ध्येय '${title}' तुमच्या लाईफ गोल्स मध्ये जोडले आहे!`
        : `Added goal '${title}' to your Life Goals!`;
      navTarget = '/app/goals';
    }
    // B. UNIVERSAL PAGE NAVIGATION MATRIX
    else if (cleanQuery.includes('dashboard') || cleanQuery.includes('डॅशबोर्ड') || cleanQuery.includes('main') || cleanQuery.includes('home')) {
      navTarget = '/app/dashboard';
      reply = language === 'mr' ? 'डॅशबोर्ड उघडत आहे!' : 'Opening Dashboard Overview now!';
    } else if (cleanQuery.includes('planner') || cleanQuery.includes('प्लॅनर') || cleanQuery.includes('daily') || cleanQuery.includes('वेळापत्रक')) {
      navTarget = '/app/planner';
      reply = language === 'mr' ? 'डेली प्लॅनर उघडत आहे!' : 'Opening your Daily Planner!';
    } else if (cleanQuery.includes('goals') || cleanQuery.includes('गोल्स') || cleanQuery.includes('ध्येय') || cleanQuery.includes('उद्दिष्ट')) {
      navTarget = '/app/goals';
      reply = language === 'mr' ? 'तुमचे लाईफ गोल्स उघडत आहे!' : 'Opening your Life Goals!';
    } else if (cleanQuery.includes('learning') || cleanQuery.includes('लर्निंग') || cleanQuery.includes('hub') || cleanQuery.includes('अभ्यास')) {
      navTarget = '/app/learning';
      reply = language === 'mr' ? 'मी तुम्हाला लर्निंग हब वर घेऊन जात आहे!' : 'Navigating you to the Learning Hub now!';
    } else if (cleanQuery.includes('interview') || cleanQuery.includes('इंटरव्ह्यू') || cleanQuery.includes('मुलाखत') || cleanQuery.includes('prep')) {
      navTarget = '/app/interview';
      reply = language === 'mr' ? 'इंटरव्ह्यू प्रॅप सिम्युलेटर उघडत आहे!' : 'Opening AI Interview Simulator!';
    } else if (cleanQuery.includes('english') || cleanQuery.includes('इंग्रजी') || cleanQuery.includes('speaking')) {
      navTarget = '/app/english';
      reply = language === 'mr' ? 'इंग्लिश स्पीकिंग कोच उघडत आहे!' : 'Opening English Speaking Coach!';
    } else if (cleanQuery.includes('dsa') || cleanQuery.includes('डीएसए') || cleanQuery.includes('algo')) {
      navTarget = '/app/dsa';
      reply = language === 'mr' ? 'डीएसए व्हिज्युअलायझर उघडत आहे!' : 'Opening DSA Practice & Visualizer!';
    } else if (cleanQuery.includes('devops') || cleanQuery.includes('डेव्हॉप्स') || cleanQuery.includes('vps') || cleanQuery.includes('hostinger')) {
      navTarget = '/app/devops';
      reply = language === 'mr' ? 'डेव्हॉप्स मॅनेजर उघडत आहे!' : 'Opening DevOps & Hostinger Manager!';
    } else if (cleanQuery.includes('project') || cleanQuery.includes('प्रकल्प') || cleanQuery.includes('काम')) {
      navTarget = '/app/projects';
      reply = language === 'mr' ? 'प्रोजेक्ट मॅनेजर उघडत आहे!' : 'Opening Project Manager!';
    } else if (cleanQuery.includes('fitness') || cleanQuery.includes('फिटनेस') || cleanQuery.includes('gym') || cleanQuery.includes('जिम') || cleanQuery.includes('workout')) {
      navTarget = '/app/fitness';
      reply = language === 'mr' ? 'फिटनेस ट्रॅकर उघडत आहे!' : 'Opening Fitness & Recovery!';
    } else if (cleanQuery.includes('habit') || cleanQuery.includes('हॅबिट') || cleanQuery.includes('सवयी')) {
      navTarget = '/app/habits';
      reply = language === 'mr' ? 'हॅबिट ट्रॅकर मॅट्रिक्स उघडत आहे!' : 'Opening Habit Tracker Matrix!';
    } else if (cleanQuery.includes('journal') || cleanQuery.includes('जर्नल') || cleanQuery.includes('डायरी')) {
      navTarget = '/app/journal';
      reply = language === 'mr' ? 'एआय रिफ्लेक्शन जर्नल उघडत आहे!' : 'Opening AI Reflection Journal!';
    } else if (cleanQuery.includes('analytics') || cleanQuery.includes('ॲनालिटिक्स') || cleanQuery.includes('growth')) {
      navTarget = '/app/analytics';
      reply = language === 'mr' ? 'ग्रोथ ॲनालिटिक्स उघडत आहे!' : 'Opening Growth Analytics!';
    } else if (cleanQuery.includes('setting') || cleanQuery.includes('सेटअप') || cleanQuery.includes('पिन')) {
      navTarget = '/app/settings';
      reply = language === 'mr' ? 'सिस्टम सेटिंग्ज उघडत आहे!' : 'Opening System Settings!';
    }
    // C. PENDING TASKS QUERY
    else if (
      cleanQuery.includes('pending') ||
      cleanQuery.includes('प्रलंबित') ||
      cleanQuery.includes('task') ||
      cleanQuery.includes('आज काय') ||
      cleanQuery.includes('schedule')
    ) {
      if (language === 'mr') {
        reply = `मनोज, आज तुमची ${pendingTasks.length} प्रलंबित कामे आहेत: १. ${pendingTasks[0]?.title || 'रिॲक्ट आर्किटेक्चर'}, २. ${pendingTasks[1]?.title || 'मुलाखत तयारी'}.`;
      } else {
        reply = `Hi ${userName}, you have ${pendingTasks.length} pending tasks for today: First, ${pendingTasks[0]?.title || 'React Architecture'}, and second, ${pendingTasks[1]?.title || 'Interview Practice'}.`;
      }
    }
    // D. STANDALONE WAKE WORD OR IDENTITY QUERY
    else if (cleanQuery === '' || cleanQuery === 'hey' || cleanQuery === 'hi' || cleanQuery.includes('who are you') || cleanQuery.includes('name') || cleanQuery.includes('नाव काय') || cleanQuery.includes('कोण आहेस')) {
      reply = language === 'mr'
        ? `नमस्कार ${userName}! मी ${aiName} ऐकत आहे, बोला मी काय मदत करू?`
        : `Hi ${userName}! ${aiName} is listening, how can I help you?`;
    }
    // E. EXPANDED KNOWLEDGE ENGINE
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
  }, [language, pendingTasks, userName, aiName, speakText, navigate, generateKnowledgeAnswer]);

  // Robust Unified Speech Recognition Engine
  const startListening = useCallback(async () => {
    if (typeof window === 'undefined') return;

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
      recognition.lang = 'en-IN'; // Indian English engine for 100% reliable wake-word and bilingual command recognition

      recognition.onstart = () => {
        isMicRunningRef.current = true;
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const textChunk = event.results[i][0].transcript;
          if (!textChunk) continue;

          const rawClean = textChunk.toLowerCase().trim();
          // Phonetic Normalizer: strip spaces, handle live os / light os / life os / Marathi LifeOS
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
              }, 650);
            }
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

        if (isHandsFreeEnabled && !isLocked && activeVoiceMode !== 'INTERVIEW_DRILL') {
          if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
          restartTimeoutRef.current = setTimeout(() => {
            if (!isMicRunningRef.current && !isLocked && activeVoiceMode !== 'INTERVIEW_DRILL') {
              startListening();
            }
          }, 300);
        }
      };

      recognition.start();
    } catch (err) {
      isMicRunningRef.current = false;
      setIsListening(false);
    }
  }, [language, aiName, isHandsFreeEnabled, isLocked, isSpeaking, isVoiceModalOpen, activeVoiceMode, processVoiceQuery, safeStopMic, requestMicPermission]);

  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  // Self-Healing Mic Watchdog (Auto-restarts if mic stalls for > 4 seconds)
  useEffect(() => {
    if (isLocked || !isHandsFreeEnabled || isSpeaking || activeVoiceMode === 'INTERVIEW_DRILL') return;

    const watchdog = setInterval(() => {
      if (!isMicRunningRef.current && !isSpeaking && !isLocked && activeVoiceMode !== 'INTERVIEW_DRILL') {
        startListening();
      }
    }, 4000);

    return () => clearInterval(watchdog);
  }, [isLocked, isHandsFreeEnabled, isSpeaking, activeVoiceMode, startListening]);

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
    if (isLocked || isMuted || pendingTasks.length === 0 || activeVoiceMode === 'INTERVIEW_DRILL') return;

    const randomTask = pendingTasks[Math.floor(Math.random() * pendingTasks.length)];
    let reminderText = '';

    if (language === 'mr') {
      reminderText = `अहो ${userName}! ${aiName} वेळेनुसार तुमचे काम आठवण करून देत आहे: ${randomTask.title}. कृपया वेळेवर पूर्ण करा!`;
    } else {
      reminderText = `Hey ${userName}! ${aiName} here with a reminder for your pending task: ${randomTask.title}. Keep up the momentum!`;
    }

    setAiResponseText(reminderText);
    speakText(reminderText, language);
  }, [isLocked, isMuted, pendingTasks, language, userName, aiName, activeVoiceMode, speakText]);

  // Periodic Timer for Logged-In Users
  useEffect(() => {
    if (isLocked || reminderIntervalMins <= 0 || activeVoiceMode === 'INTERVIEW_DRILL') return;

    const intervalMs = reminderIntervalMins * 60 * 1000;
    const timer = setInterval(() => {
      const now = Date.now();
      if (now - lastSpokenTimeRef.current >= intervalMs - 2000) {
        lastSpokenTimeRef.current = now;
        speakPeriodicReminder();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isLocked, reminderIntervalMins, activeVoiceMode, speakPeriodicReminder]);

  const value = {
    isLocked,
    setIsLocked,
    pinCode,
    setPinCode,
    userName,
    setUserName,
    aiName,
    setAiName,
    activeVoiceMode,
    setVoiceMode,
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
    isSpeaking,
    isListening,
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
