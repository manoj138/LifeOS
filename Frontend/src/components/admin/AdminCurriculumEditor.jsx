import React, { useState, useEffect } from 'react';
import { BookOpen, Edit3, Save, Sparkles, Check, Code2, Layers, Server, Binary, Terminal, CheckCircle2, RefreshCw, AlertCircle, Trash2, ListOrdered, CheckSquare, PlusCircle, FileText } from 'lucide-react';
import { GlassCard, Button, Badge, Input, ConfirmModal } from '../common';
import { apiService } from '../../services/api';
import { FormattedMarkdown } from '../ui/FormattedMarkdown';

const ICON_MAP = {
  Code2,
  Layers,
  Terminal,
  Server,
  Binary,
  BookOpen,
  Sparkles,
};

export const AdminCurriculumEditor = () => {
  const [activeDomain, setActiveDomain] = useState('roadmap'); // 'roadmap' | 'interview' | 'dsa' | 'english' | 'devops'
  const [editorMode, setEditorMode] = useState('bulk_ai'); // 'editor' | 'bulk_ai'
  const [selectedModule, setSelectedModule] = useState('js');

  // Confirmation Modal Central State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });
  const [modulesList, setModulesList] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);

  // Domain Specific State Data
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [dsaProblems, setDsaProblems] = useState([]);
  const [englishModules, setEnglishModules] = useState([]);
  const [devopsSteps, setDevopsSteps] = useState([]);

  // Form Modals / Forms State
  const [isAddingInterview, setIsAddingInterview] = useState(false);
  const [isBulkRawModalOpen, setIsBulkRawModalOpen] = useState(false);
  const [rawQaText, setRawQaText] = useState('');
  const [rawQaCategory, setRawQaCategory] = useState('js');
  const [rawQaDifficulty, setRawQaDifficulty] = useState('Intermediate');

  // Category Modal & Questions Filter State
  const [isAddingCategoryModal, setIsAddingCategoryModal] = useState(false);
  const [newCatTitle, setNewCatTitle] = useState('');

  const [iqSearchQuery, setIqSearchQuery] = useState('');
  const [iqFilterCategory, setIqFilterCategory] = useState('all');
  const [iqFilterDifficulty, setIqFilterDifficulty] = useState('all');

  const [newInterviewCategory, setNewInterviewCategory] = useState('js');
  const [newInterviewQuestion, setNewInterviewQuestion] = useState('');
  const [newInterviewAnswer, setNewInterviewAnswer] = useState('');
  const [newInterviewMarathiIntent, setNewInterviewMarathiIntent] = useState('');
  const [newInterviewDifficulty, setNewInterviewDifficulty] = useState('Beginner');

  const [isAddingDsa, setIsAddingDsa] = useState(false);
  const [isBulkDsaRawModalOpen, setIsBulkDsaRawModalOpen] = useState(false);
  const [rawDsaText, setRawDsaText] = useState('');
  const [rawDsaTopic, setRawDsaTopic] = useState('Arrays');
  const [rawDsaDifficulty, setRawDsaDifficulty] = useState('Easy');
  const [rawDsaLanguage, setRawDsaLanguage] = useState('javascript');

  const [customDsaLanguages, setCustomDsaLanguages] = useState(['javascript', 'python', 'java', 'c', 'cpp']);
  const [isAddingLanguageModal, setIsAddingLanguageModal] = useState(false);
  const [newLanguageInput, setNewLanguageInput] = useState('');

  const [dsaFilterLanguage, setDsaFilterLanguage] = useState('all');
  const [dsaSearchQuery, setDsaSearchQuery] = useState('');

  const [newDsaTitle, setNewDsaTitle] = useState('');
  const [newDsaTopic, setNewDsaTopic] = useState('Arrays');
  const [newDsaDifficulty, setNewDsaDifficulty] = useState('Easy');
  const [newDsaLanguage, setNewDsaLanguage] = useState('javascript');
  const [newDsaTimeLimit, setNewDsaTimeLimit] = useState('15m');
  const [newDsaDescription, setNewDsaDescription] = useState('');
  const [newDsaStarterCode, setNewDsaStarterCode] = useState('function solution() {\n  // write code\n}');
  const [newDsaHint, setNewDsaHint] = useState('');
  const [newDsaSolutionCode, setNewDsaSolutionCode] = useState('');

  const handleCreateLanguage = (e) => {
    e.preventDefault();
    if (!newLanguageInput.trim()) return;
    const cleanLang = newLanguageInput.trim().toLowerCase().replace(/[^a-z0-9+#-]+/g, '');
    if (cleanLang && !customDsaLanguages.includes(cleanLang)) {
      setCustomDsaLanguages(prev => [...prev, cleanLang]);
    }
    setDsaFilterLanguage(cleanLang);
    setRawDsaLanguage(cleanLang);
    setNewDsaLanguage(cleanLang);
    setNewLanguageInput('');
    setIsAddingLanguageModal(false);
  };

  const [isAddingEnglish, setIsAddingEnglish] = useState(false);
  const [newEngTitle, setNewEngTitle] = useState('');
  const [newEngCategory, setNewEngCategory] = useState('pronunciation');
  const [newEngDescription, setNewEngDescription] = useState('');
  const [newEngBadgeLabel, setNewEngBadgeLabel] = useState('Daily Drill');

  const [isAddingDevops, setIsAddingDevops] = useState(false);
  const [newDevStep, setNewDevStep] = useState('Step 1');
  const [newDevTitle, setNewDevTitle] = useState('');
  const [newDevDesc, setNewDevDesc] = useState('');
  const [newDevCommand, setNewDevCommand] = useState('sudo systemctl status nginx');

  // Add Module Modal State
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleId, setNewModuleId] = useState('');

  // Bulk Generator State
  const [bulkInput, setBulkInput] = useState('');
  const [targetLevel, setTargetLevel] = useState('Beginner');
  const [bulkStatusMessage, setBulkStatusMessage] = useState('');
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0, percent: 0 });

  const fetchModules = async () => {
    const res = await apiService.getRoadmapModules();
    if (res?.success && Array.isArray(res.data)) {
      setModulesList(res.data);
      if (res.data.length > 0 && !res.data.find(m => m.id === selectedModule)) {
        setSelectedModule(res.data[0].id);
      }
    } else {
      setModulesList([]);
    }
  };

  const handleCreateModule = async (e) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;
    const res = await apiService.createRoadmapModule({
      id: newModuleId.trim() || undefined,
      title: newModuleTitle.trim(),
      order: modulesList.length + 1,
    });
    if (res?.success) {
      setNewModuleTitle('');
      setNewModuleId('');
      setIsAddingModule(false);
      await fetchModules();
      if (res.data?.id) setSelectedModule(res.data.id);
    }
  };

  const handleCreateCategorySubmit = async (e) => {
    e.preventDefault();
    if (!newCatTitle.trim()) return;
    const generatedId = newCatTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const res = await apiService.createRoadmapModule({
      id: generatedId || `cat-${Date.now()}`,
      title: newCatTitle.trim(),
      order: modulesList.length + 1
    });
    if (res?.success) {
      const newCatId = res.data?.id || generatedId;
      setNewCatTitle('');
      setIsAddingCategoryModal(false);
      await fetchModules();
      setIqFilterCategory(newCatId);
      setRawQaCategory(newCatId);
      setNewInterviewCategory(newCatId);
    }
  };

  const handleDeleteModule = (id, title) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Tech Module",
      message: `Are you sure you want to delete module "${title}" and all its topics?`,
      onConfirm: async () => {
        await apiService.deleteRoadmapModule(id);
        await fetchModules();
        if (selectedModule === id) setSelectedModule('js');
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const fetchInterviewQuestions = async () => {
    const res = await apiService.getInterviewQuestions();
    if (res?.success && Array.isArray(res.data)) {
      setInterviewQuestions(res.data);
    }
  };

  const handleCreateInterviewQuestion = async (e) => {
    e.preventDefault();
    if (!newInterviewQuestion.trim() || !newInterviewAnswer.trim()) return;
    const res = await apiService.createInterviewQuestion({
      category: newInterviewCategory,
      question: newInterviewQuestion.trim(),
      answer: newInterviewAnswer.trim(),
      marathiIntent: newInterviewMarathiIntent.trim() || null,
      difficulty: newInterviewDifficulty,
    });
    if (res?.success) {
      setNewInterviewQuestion('');
      setNewInterviewAnswer('');
      setNewInterviewMarathiIntent('');
      setIsAddingInterview(false);
      fetchInterviewQuestions();
    }
  };

  const handleDeleteInterviewQuestion = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Interview Question",
      message: "Are you sure you want to delete this interview question?",
      onConfirm: async () => {
        await apiService.deleteInterviewQuestion(id);
        fetchInterviewQuestions();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleDeleteCategoryAndQuestions = (catKey, displayLabel) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Category",
      message: `Are you sure you want to delete category "${displayLabel}" and all its questions?`,
      onConfirm: async () => {
        const matchedModule = modulesList.find(m => (m.id || '').toLowerCase() === catKey.toLowerCase());
        if (matchedModule) {
          await apiService.deleteRoadmapModule(matchedModule.id);
        }
        const targetQuestions = interviewQuestions.filter(q => (q.category || '').toLowerCase() === catKey.toLowerCase());
        for (const q of targetQuestions) {
          await apiService.deleteInterviewQuestion(q.id);
        }
        if (iqFilterCategory.toLowerCase() === catKey.toLowerCase()) {
          setIqFilterCategory('all');
        }
        await fetchModules();
        await fetchInterviewQuestions();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleBulkImportRawQa = async () => {
    if (!rawQaText.trim()) return;
    
    // Parse raw Q&A block text
    const lines = rawQaText.split('\n');
    let items = [];
    let currentQ = '';
    let currentA = '';

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;

      if (trimmed.match(/^(Question|Q\d*|\d+[\.\)])\s*/i)) {
        if (currentQ) {
          items.push({ q: currentQ, a: currentA || 'Answer under compilation.' });
          currentA = '';
        }
        currentQ = trimmed.replace(/^(Question|Q\d*|\d+[\.\)])\s*[:.-]?\s*/i, '');
      } else if (trimmed.match(/^(Answer|Ans|A)\s*/i)) {
        currentA = trimmed.replace(/^(Answer|Ans|A)\s*[:.-]?\s*/i, '');
      } else if (currentA) {
        currentA += ' ' + trimmed;
      } else if (currentQ) {
        currentQ += ' ' + trimmed;
      }
    });

    if (currentQ) {
      items.push({ q: currentQ, a: currentA || 'Answer under compilation.' });
    }

    if (items.length === 0) {
      const blocks = rawQaText.split(/\n\s*\n/);
      blocks.forEach((block) => {
        if (block.trim()) {
          const parts = block.split('\n');
          items.push({
            q: parts[0].trim(),
            a: parts.slice(1).join(' ').trim() || 'Comprehensive architecture answer.'
          });
        }
      });
    }

    for (const item of items) {
      const cleanQ = (item.q || '').replace(/^(Question|Q\d*|\d+[\.\)])\s*[:.-]?\s*/i, '').trim();
      const cleanA = (item.a || '').replace(/^(Answer|Ans|A|ns)\s*[:.-]?\s*/i, '').trim();

      if (cleanQ) {
        await apiService.createInterviewQuestion({
          category: rawQaCategory,
          question: cleanQ,
          answer: cleanA || 'Comprehensive technical answer.',
          marathiIntent: `इंटरव्ह्यूवर मुख्यत्वे ${cleanQ.substring(0, 35)} बद्दलची तांत्रिक समजूत तपासत आहे.`,
          difficulty: rawQaDifficulty
        });
      }
    }

    setRawQaText('');
    setIsBulkRawModalOpen(false);
    fetchInterviewQuestions();
  };

  const fetchDsaProblems = async () => {
    const res = await apiService.getDsaProblems();
    if (res?.success && Array.isArray(res.data)) {
      setDsaProblems(res.data);
    }
  };

  const handleCreateDsaProblem = async (e) => {
    e.preventDefault();
    if (!newDsaTitle.trim() || !newDsaDescription.trim()) return;
    const res = await apiService.createDsaProblem({
      title: newDsaTitle.trim(),
      topic: newDsaTopic,
      difficulty: newDsaDifficulty,
      language: newDsaLanguage,
      timeLimit: newDsaTimeLimit,
      description: newDsaDescription.trim(),
      starterCode: newDsaStarterCode,
      hint: newDsaHint.trim(),
      solutionCode: newDsaSolutionCode.trim(),
    });
    if (res?.success) {
      setNewDsaTitle('');
      setNewDsaDescription('');
      setNewDsaHint('');
      setNewDsaSolutionCode('');
      setIsAddingDsa(false);
      fetchDsaProblems();
    }
  };

  const handleBulkImportRawDsa = async () => {
    if (!rawDsaText.trim()) return;
    const res = await apiService.bulkImportRawDsa({
      rawText: rawDsaText,
      defaultTopic: rawDsaTopic,
      defaultDifficulty: rawDsaDifficulty,
      defaultLanguage: rawDsaLanguage,
    });
    if (res?.success) {
      setRawDsaText('');
      setIsBulkDsaRawModalOpen(false);
      fetchDsaProblems();
    }
  };

  const handleDeleteDsaProblem = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete DSA Problem",
      message: "Are you sure you want to delete this DSA problem?",
      onConfirm: async () => {
        await apiService.deleteDsaProblem(id);
        fetchDsaProblems();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleDeleteDsaLanguage = (langKey, displayLabel) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete DSA Language",
      message: `Are you sure you want to delete language "${displayLabel}" and all its associated DSA problems?`,
      onConfirm: async () => {
        await apiService.deleteDsaLanguage(langKey);
        setCustomDsaLanguages(prev => prev.filter(l => l.toLowerCase() !== langKey.toLowerCase()));
        if (dsaFilterLanguage.toLowerCase() === langKey.toLowerCase()) {
          setDsaFilterLanguage('all');
        }
        await fetchDsaProblems();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const fetchEnglishModules = async () => {
    const res = await apiService.getEnglishModules();
    if (res?.success && Array.isArray(res.data)) {
      setEnglishModules(res.data);
    }
  };

  const handleCreateEnglishModule = async (e) => {
    e.preventDefault();
    if (!newEngTitle.trim()) return;
    const res = await apiService.createEnglishModule({
      title: newEngTitle.trim(),
      category: newEngCategory,
      description: newEngDescription.trim(),
      badgeLabel: newEngBadgeLabel.trim(),
      badgeColor: 'purple',
    });
    if (res?.success) {
      setNewEngTitle('');
      setNewEngDescription('');
      setIsAddingEnglish(false);
      fetchEnglishModules();
    }
  };

  const handleDeleteEnglishModule = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete English Drill",
      message: "Are you sure you want to delete this English module?",
      onConfirm: async () => {
        await apiService.deleteEnglishModule(id);
        fetchEnglishModules();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const fetchDevopsSteps = async () => {
    const res = await apiService.getDevopsSteps();
    if (res?.success && Array.isArray(res.data)) {
      setDevopsSteps(res.data);
    }
  };

  const handleCreateDevopsStep = async (e) => {
    e.preventDefault();
    if (!newDevTitle.trim() || !newDevDesc.trim()) return;
    const res = await apiService.createDevopsStep({
      step: newDevStep.trim(),
      title: newDevTitle.trim(),
      desc: newDevDesc.trim(),
      command: newDevCommand.trim(),
    });
    if (res?.success) {
      setNewDevTitle('');
      setNewDevDesc('');
      setIsAddingDevops(false);
      fetchDevopsSteps();
    }
  };

  const handleDeleteDevopsStep = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete VPS Setup Step",
      message: "Are you sure you want to delete this DevOps step?",
      onConfirm: async () => {
        await apiService.deleteDevopsStep(id);
        fetchDevopsSteps();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleBulkSeedInterview = async (cat = 'js') => {
    setIsAiGenerating(true);
    const sampleTitles = [
      "Event Loop, Microtask Queue & Call Stack Execution",
      "Closures, Lexical Environment & Scope Leakage",
      "Prototypal Inheritance & Object Prototype Chain",
      "Promises vs Async/Await & Error Handling Patterns",
      "Debouncing vs Throttling in High-Performance UI"
    ];
    await apiService.bulkGenerateInterviewSequence({ category: cat, titles: sampleTitles });
    await fetchInterviewQuestions();
    setIsAiGenerating(false);
  };

  const handleBulkSeedDsa = async () => {
    setIsAiGenerating(true);
    const sampleProblems = [
      "Two Sum Hash Map Approach",
      "Valid Anagram Frequency Counter",
      "Reverse Linked List Pointer Manipulation",
      "Binary Search on Sorted Array",
      "Longest Substring Without Repeating Characters"
    ];
    await apiService.bulkGenerateDsaSequence({ titles: sampleProblems });
    await fetchDsaProblems();
    setIsAiGenerating(false);
  };

  const handleBulkSeedEnglish = async () => {
    setIsAiGenerating(true);
    const sampleModules = [
      "Executive Architecture Pitching & System Demos",
      "Technical Code Walkthrough & Refactoring Vocabulary",
      "Handling Tough Technical Q&A with Executive Presence"
    ];
    await apiService.bulkGenerateEnglishSequence({ titles: sampleModules });
    await fetchEnglishModules();
    setIsAiGenerating(false);
  };

  const handleBulkSeedDevops = async () => {
    setIsAiGenerating(true);
    const sampleSteps = [
      "Hostinger VPS Server SSH Connection & UFW Firewall Setup",
      "Node.js & PM2 Process Manager Installation",
      "Nginx Reverse Proxy & SSL Certificate Deployment"
    ];
    await apiService.bulkGenerateDevopsSequence({ titles: sampleSteps });
    await fetchDevopsSteps();
    setIsAiGenerating(false);
  };

  useEffect(() => {
    fetchModules();
    fetchInterviewQuestions();
    fetchDsaProblems();
    fetchEnglishModules();
    fetchDevopsSteps();
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    level: 'Beginner',
    conceptExplanation: '',
    codeSnippet: '',
    projectApplication: '',
    taskTitle: '',
    taskDescription: '',
    starterCode: '',
    solutionCriteria: '',
  });

  const handleSelectTopic = (topic) => {
    if (!topic) return;
    setSelectedTopicId(topic.id);
    setFormData({
      title: topic.title || '',
      level: topic.level || 'Beginner',
      conceptExplanation: topic.conceptExplanation || '',
      codeSnippet: topic.codeSnippet || '',
      projectApplication: topic.projectApplication || '',
      taskTitle: topic.taskTitle || '',
      taskDescription: topic.taskDescription || '',
      starterCode: topic.starterCode || '',
      solutionCriteria: topic.solutionCriteria || '',
    });
  };

  const fetchTopics = async () => {
    setIsLoadingTopics(true);
    const res = await apiService.getCurriculumTopics(selectedModule);
    setIsLoadingTopics(false);
    if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
      setTopics(res.data);
      const match = res.data.find(t => t.id === selectedTopicId) || res.data[0];
      setSelectedTopicId(match.id);
      handleSelectTopic(match);
    } else {
      setTopics([]);
      setSelectedTopicId(null);
      setFormData({
        title: '',
        level: 'Beginner',
        conceptExplanation: '',
        codeSnippet: '',
        projectApplication: '',
        taskTitle: '',
        taskDescription: '',
        starterCode: '',
        solutionCriteria: '',
      });
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [selectedModule]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedTopicId) {
      if (!formData.title.trim()) {
        alert('Please enter a topic title before saving.');
        return;
      }
      const res = await apiService.generateSingleTopicWithAI({
        moduleId: selectedModule,
        topicName: formData.title.trim(),
        level: formData.level || 'Beginner',
      });
      if (res?.success) {
        setIsSaved(true);
        await fetchTopics();
        setTimeout(() => setIsSaved(false), 2500);
      } else {
        alert(res?.message || 'Error saving new topic');
      }
      return;
    }

    const res = await apiService.updateCurriculumTopic(selectedTopicId, formData);
    if (res?.success) {
      setIsSaved(true);
      await fetchTopics();
      setTimeout(() => setIsSaved(false), 2500);
    } else {
      alert(res?.message || 'Error updating topic');
    }
  };

  const handleRegenerateSingleTopic = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a Topic Title & Header first.');
      return;
    }
    setIsAiGenerating(true);
    const res = await apiService.generateSingleTopicWithAI({
      topicId: selectedTopicId || null,
      moduleId: selectedModule,
      topicTitle: formData.title.trim(),
      level: formData.level || 'Beginner',
      saveToDb: !!selectedTopicId
    });
    setIsAiGenerating(false);

    if (res?.success && res?.data) {
      setFormData({
        title: res.data.title || res.data.topicName || formData.title.trim(),
        level: res.data.level || 'Beginner',
        conceptExplanation: res.data.conceptExplanation || '',
        codeSnippet: res.data.codeSnippet || '',
        projectApplication: res.data.projectApplication || '',
        taskTitle: res.data.taskTitle || '',
        taskDescription: res.data.taskDescription || '',
        starterCode: res.data.starterCode || '',
        solutionCriteria: res.data.solutionCriteria || '',
      });
      setIsSaved(true);
      await fetchTopics();
      setTimeout(() => setIsSaved(false), 2500);
    } else {
      alert(res?.message || 'Error auto-generating topic content with AI');
    }
  };

  const handleDeleteTopic = (id, title) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Topic",
      message: `Are you sure you want to delete topic "${title}"?`,
      onConfirm: async () => {
        await apiService.deleteCurriculumTopic(id);
        await fetchTopics();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleBulkGenerate = async () => {
    if (!bulkInput.trim()) return;

    const topicLines = bulkInput
      .split('\n')
      .map((line) => line.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter(Boolean);

    if (topicLines.length === 0) return;

    setIsAiGenerating(true);
    setGenerationProgress({ current: 0, total: topicLines.length, percent: 0 });

    const BATCH_SIZE = 10;
    const totalBatches = Math.ceil(topicLines.length / BATCH_SIZE);
    let successfullyGenerated = 0;

    for (let b = 0; b < totalBatches; b++) {
      const batchTopics = topicLines.slice(b * BATCH_SIZE, (b + 1) * BATCH_SIZE);
      const batchNum = b + 1;

      setBulkStatusMessage(
        `⚡ Processing Batch ${batchNum} of ${totalBatches} (${successfullyGenerated}/${topicLines.length} topics ready)...`
      );

      const res = await apiService.bulkGenerateSequence({
        moduleId: selectedModule,
        level: targetLevel,
        topicTitles: batchTopics,
      });

      if (res?.success) {
        successfullyGenerated += res.data?.length || batchTopics.length;
        const currentPercent = Math.min(100, Math.round((successfullyGenerated / topicLines.length) * 100));
        setGenerationProgress({
          current: successfullyGenerated,
          total: topicLines.length,
          percent: currentPercent,
        });
        await fetchTopics();
      } else {
        console.warn(`Batch ${batchNum} failed to generate cleanly, continuing with next batch...`);
      }
    }

    setIsAiGenerating(false);

    if (successfullyGenerated > 0) {
      setBulkStatusMessage(
        `✅ Successfully generated & published ${successfullyGenerated} / ${topicLines.length} topics directly to database!`
      );
    } else {
      setBulkStatusMessage('⚠️ Error generating topics. Please check backend connection.');
    }
  };

  const filteredTopics = topics.filter((t) => t.moduleId === selectedModule);

  return (
    <div className="space-y-6">
      {/* Domain Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        <button
          type="button"
          onClick={() => setActiveDomain('roadmap')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
            activeDomain === 'roadmap'
              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
              : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>📚 Roadmap Topics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveDomain('interview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
            activeDomain === 'interview'
              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
              : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>🎙️ Interview Questions ({interviewQuestions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveDomain('dsa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
            activeDomain === 'dsa'
              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
              : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white'
          }`}
        >
          <Code2 className="w-4 h-4 text-amber-400" />
          <span>🧩 DSA Problems ({dsaProblems.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveDomain('english')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
            activeDomain === 'english'
              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
              : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white'
          }`}
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>🗣️ English Coach ({englishModules.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveDomain('devops')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
            activeDomain === 'devops'
              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
              : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white'
          }`}
        >
          <Server className="w-4 h-4 text-cyan-400" />
          <span>⚡ DevOps VPS ({devopsSteps.length})</span>
        </button>
      </div>

      {/* Domain 1: Roadmap & Topics Manager (Default) */}
      {activeDomain === 'roadmap' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header & Mode Switches */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Curriculum Content & AI Generator Console
              </h3>
              <p className="text-xs text-gray-400">
                Manage roadmap modules, bulk-generate sequence topics with AI, and assign chapter-wise practical tasks.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={editorMode === 'bulk_ai' ? 'glow' : 'glass'}
                size="sm"
                onClick={() => setEditorMode('bulk_ai')}
                leftIcon={<ListOrdered className="w-4 h-4 text-cyan-400" />}
              >
                ⚡ Sequence-Based Bulk AI Generator
              </Button>
              <Button
                variant={editorMode === 'editor' ? 'glow' : 'glass'}
                size="sm"
                onClick={() => setEditorMode('editor')}
                leftIcon={<Edit3 className="w-4 h-4 text-purple-400" />}
              >
                ✏️ Manual Topic Editor
              </Button>
            </div>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Module Selector & Topic List Sidebar */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Roadmap Module</label>
              <button
                type="button"
                onClick={() => setIsAddingModule(!isAddingModule)}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Module</span>
              </button>
            </div>

            {/* Add New Module Form Modal/Inline */}
            {isAddingModule && (
              <form onSubmit={handleCreateModule} className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-2 animate-fadeIn">
                <h5 className="text-xs font-bold text-purple-300">New Roadmap Module</h5>
                <input
                  type="text"
                  placeholder="Module Title (e.g. 6. Python & AI)"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Module ID (optional, e.g. python)"
                  value={newModuleId}
                  onChange={(e) => setNewModuleId(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-gray-300 focus:outline-none focus:border-purple-400"
                />
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingModule(false)}
                    className="text-xs text-gray-400 hover:text-white px-2 py-1"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="glow" size="sm" className="px-3 py-1 text-xs">
                    Save Module
                  </Button>
                </div>
              </form>
            )}

            <div className="space-y-1">
              {modulesList.length === 0 ? (
                <div className="p-3.5 rounded-xl border border-dashed border-purple-500/30 bg-purple-950/20 text-xs text-purple-300 text-center space-y-1">
                  <p className="font-semibold">No Roadmap Modules created yet.</p>
                  <p className="text-[10px] text-gray-400">Click <strong className="text-purple-300">+ Add Module</strong> above to start!</p>
                </div>
              ) : (
                modulesList.map((m) => {
                  const IconComponent = ICON_MAP[m.iconName] || Code2;
                  const isSelected = selectedModule === m.id;

                  return (
                    <div key={m.id} className="flex items-center gap-1 group">
                      <button
                        type="button"
                        onClick={() => setSelectedModule(m.id)}
                        className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-purple-900/40 border-purple-500 text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-1">
                          <IconComponent className="w-4 h-4 text-purple-400 shrink-0" />
                          <span className="truncate">{m.title}</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteModule(m.id, m.title)}
                        className="p-2 rounded-xl text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                        title="Delete module"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Existing Topics ({filteredTopics.length})</label>
              {filteredTopics.length > 0 && (
                <button
                  type="button"
                  onClick={async () => {
                    setIsLoadingTopics(true);
                    await apiService.reorderCurriculumTopics(selectedModule);
                    await fetchTopics();
                    setIsLoadingTopics(false);
                  }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-all"
                  title="Re-index all topics sequentially from 1 to N in DB"
                >
                  <RefreshCw className="w-3 h-3 text-cyan-400" />
                  <span>Re-index 1..N</span>
                </button>
              )}
            </div>
            <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
              {isLoadingTopics ? (
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
                  <span>Loading DB topics...</span>
                </div>
              ) : filteredTopics.length === 0 ? (
                <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 text-center">
                  No topics in database yet for this module.
                </div>
              ) : (
                filteredTopics.map((t) => (
                  <div key={t.id} className="flex items-center gap-1 group">
                    <button
                      type="button"
                      onClick={() => {
                        setEditorMode('editor');
                        handleSelectTopic(t);
                      }}
                      className={`w-full p-2 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                        selectedTopicId === t.id && editorMode === 'editor'
                          ? 'bg-purple-600/30 border-purple-500 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{t.title || t.topicName}</span>
                      {t.taskTitle && <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTopic(t.id, t.title)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all"
                      title="Delete topic"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Mode 1: Sequence-Based Bulk AI Generator */}
        {editorMode === 'bulk_ai' && (
          <div className="lg:col-span-3 space-y-6 animate-fadeIn">
            <GlassCard className="p-6 space-y-5 border-cyan-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <ListOrdered className="w-5 h-5 text-cyan-400" />
                    Sequence-Based Bulk AI Curriculum Generator
                  </h4>
                  <p className="text-xs text-gray-400">
                    Paste chapter names in order. AI will generate deep theory, working code, and practical tasks for each topic!
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Target Level:</span>
                  <select
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(e.target.value)}
                    className="bg-slate-900 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Paste Chapter Sequence List (One topic per line):
                </label>
                <textarea
                  rows={6}
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder="1. Variables & Scope&#10;2. Closures & Lexical Environment&#10;3. Promises & Async/Await"
                  className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-3 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {bulkStatusMessage && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-medium text-purple-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{bulkStatusMessage}</span>
                    </div>
                    {isAiGenerating && (
                      <span className="font-bold text-cyan-300">{generationProgress.percent}%</span>
                    )}
                  </div>
                  {isAiGenerating && (
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/10">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-300 ease-out"
                        style={{ width: `${Math.max(5, generationProgress.percent)}%` }}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs text-gray-400">
                  🔒 AI credit protection: Data saves directly to SQLite database for 1-time consumption.
                </span>

                <Button
                  variant="glow"
                  size="md"
                  onClick={handleBulkGenerate}
                  isLoading={isAiGenerating}
                  leftIcon={<Sparkles className="w-4 h-4 text-cyan-300" />}
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 px-6 py-2.5"
                >
                  {isAiGenerating ? 'Generating Curriculum Sequence...' : 'Generate & Publish Sequence with AI'}
                </Button>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Right Section: Mode 2: Manual Topic Editor */}
        {editorMode === 'editor' && (
          <div className="lg:col-span-3 space-y-6 animate-fadeIn">
            <form onSubmit={handleSave} className="space-y-5">
              <GlassCard className="p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    {selectedTopicId && (
                      <button
                        type="button"
                        onClick={handleRegenerateSingleTopic}
                        disabled={isAiGenerating}
                        className="px-2.5 py-1 text-xs font-semibold text-purple-300 bg-purple-950/60 border border-purple-500/40 hover:border-purple-400 hover:bg-purple-900/60 rounded-lg transition-all flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>{isAiGenerating ? 'Re-generating...' : '⚡ Re-generate AI Content'}</span>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Difficulty Level:</span>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="bg-slate-900 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-gray-300">Topic Title & Header</label>
                    <button
                      type="button"
                      onClick={handleRegenerateSingleTopic}
                      disabled={isAiGenerating || !formData.title.trim()}
                      className="px-2.5 py-1 text-xs font-bold text-purple-300 bg-purple-950/80 border border-purple-500/50 hover:border-purple-400 hover:bg-purple-900 rounded-lg transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                      title="Auto-fill theory explanation, code snippet, and tasks matching this topic title"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                      <span>{isAiGenerating ? 'Generating matching content...' : '⚡ Auto-Fill Fields with AI'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Variables (var, let, const) or Introduction to JavaScript"
                    className="w-full bg-slate-900 border border-white/15 rounded-xl p-3 text-xs font-semibold text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">
                    Concept Theory Explanation (Markdown & Step-by-Step Breakdown)
                  </label>
                  <textarea
                    rows={5}
                    value={formData.conceptExplanation}
                    onChange={(e) => setFormData({ ...formData, conceptExplanation: e.target.value })}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl p-3 text-xs font-mono text-gray-200 focus:outline-none focus:border-purple-500"
                  />
                  {formData.conceptExplanation && (
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-500/20 mt-2 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-purple-400">Live Formatted Markdown Preview:</span>
                      <FormattedMarkdown content={formData.conceptExplanation} />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">
                    Executable Code Snippet Template
                  </label>
                  <textarea
                    rows={4}
                    value={formData.codeSnippet}
                    onChange={(e) => setFormData({ ...formData, codeSnippet: e.target.value })}
                    className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 text-xs font-mono text-cyan-300 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <Input
                  label="Real-World Project Application Context"
                  value={formData.projectApplication}
                  onChange={(e) => setFormData({ ...formData, projectApplication: e.target.value })}
                />

                <div className="border-t border-white/10 pt-4 space-y-3">
                  <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4" /> Chapter Practical Task & Solution Rules
                  </h5>

                  <Input
                    label="Chapter Task Title"
                    value={formData.taskTitle}
                    onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })}
                  />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-300">
                      Task Description & Student Assignment Instructions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.taskDescription}
                      onChange={(e) => setFormData({ ...formData, taskDescription: e.target.value })}
                      className="w-full bg-slate-900 border border-white/15 rounded-xl p-3 text-xs text-gray-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-300">
                      Starter Code Boilerplate for Task
                    </label>
                    <textarea
                      rows={3}
                      value={formData.starterCode}
                      onChange={(e) => setFormData({ ...formData, starterCode: e.target.value })}
                      className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  {isSaved ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4" /> Topic & Task Updated in SQLite Database!
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Syncs directly with database.sqlite</span>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    leftIcon={<Save className="w-4 h-4" />}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5"
                  >
                    Save Topic & Task Changes
                  </Button>
                </div>
              </GlassCard>
            </form>
          </div>
        )}
      </div>
    </div>
  )}

      {/* Domain 2: Interview Questions Bank Manager */}
      {activeDomain === 'interview' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Interview Questions & Marathi Intent Bank
              </h3>
              <p className="text-xs text-gray-400">
                Manage tech interview questions, English master answers, and Marathi intent translations.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="glow"
                size="sm"
                onClick={() => setIsAddingCategoryModal(!isAddingCategoryModal)}
                leftIcon={<PlusCircle className="w-4 h-4 text-purple-400" />}
              >
                + Add Tech Category
              </Button>
              <Button
                variant="glass"
                size="sm"
                onClick={() => setIsBulkRawModalOpen(!isBulkRawModalOpen)}
                leftIcon={<FileText className="w-4 h-4 text-cyan-400" />}
              >
                📋 Bulk Raw Text Importer
              </Button>
              <Button
                variant="glass"
                size="sm"
                onClick={() => setIsAddingInterview(!isAddingInterview)}
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                {isAddingInterview ? 'Close Form' : 'Add Manual Question'}
              </Button>
            </div>
          </div>

          {/* Quick Add Tech Category Modal */}
          {isAddingCategoryModal && (
            <GlassCard className="p-5 border border-purple-500/40 bg-purple-950/20 animate-fadeIn">
              <form onSubmit={handleCreateCategorySubmit} className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="e.g. System Design, Python Architecture, AWS Cloud..."
                    value={newCatTitle}
                    onChange={(e) => setNewCatTitle(e.target.value)}
                    required
                  />
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddingCategoryModal(false)}>Cancel</Button>
                <Button type="submit" variant="glow" size="sm">Save New Category</Button>
              </form>
            </GlassCard>
          )}

          {/* Bulk Raw Text Q&A Importer Modal */}
          {isBulkRawModalOpen && (
            <GlassCard className="p-6 space-y-4 border border-cyan-500/40 bg-cyan-950/20 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" /> Paste Raw Questions & Answers (Bulk Importer)
                </h4>
                <button type="button" onClick={() => setIsBulkRawModalOpen(false)} className="text-xs text-gray-400 hover:text-white">Close</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Target Tech Domain</label>
                  <select
                    value={rawQaCategory}
                    onChange={(e) => setRawQaCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl p-2.5 text-xs text-gray-200"
                  >
                    {modulesList.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title || m.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Default Difficulty</label>
                  <select
                    value={rawQaDifficulty}
                    onChange={(e) => setRawQaDifficulty(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl p-2.5 text-xs text-gray-200"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-300">
                  Paste Raw Q&A Text (Copies from Word, ChatGPT, PDF, WhatsApp):
                </label>
                <textarea
                  rows={6}
                  value={rawQaText}
                  onChange={(e) => setRawQaText(e.target.value)}
                  placeholder={`Q1: What is closure in JavaScript?\nAns: A closure is a function bound together with lexical scope.\n\nQ2: What is Event Loop?\nAns: Event loop offloads async tasks.`}
                  className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-3 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button size="sm" variant="glass" onClick={() => setIsBulkRawModalOpen(false)}>Cancel</Button>
                <Button size="sm" variant="glow" onClick={handleBulkImportRawQa} leftIcon={<Sparkles className="w-4 h-4 text-cyan-400" />}>
                  ⚡ Auto-Format & Bulk Import to Database
                </Button>
              </div>
            </GlassCard>
          )}

          {isAddingInterview && (
            <GlassCard className="p-6 space-y-4 border border-purple-500/40 bg-purple-950/20">
              <h4 className="text-sm font-bold text-purple-300">Create New Interview Question</h4>
              <form onSubmit={handleCreateInterviewQuestion} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Category</label>
                    <select
                      value={newInterviewCategory}
                      onChange={(e) => setNewInterviewCategory(e.target.value)}
                      className="w-full bg-[#121218] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      {modulesList.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.title || m.id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Difficulty</label>
                    <select
                      value={newInterviewDifficulty}
                      onChange={(e) => setNewInterviewDifficulty(e.target.value)}
                      className="w-full bg-[#121218] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <Input
                  label="Question Text"
                  required
                  placeholder="e.g. Explain Event Loop & Microtask Queue in Node.js"
                  value={newInterviewQuestion}
                  onChange={(e) => setNewInterviewQuestion(e.target.value)}
                />

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-300">Master English Answer Script</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Word-for-word response for teleprompter practice..."
                    value={newInterviewAnswer}
                    onChange={(e) => setNewInterviewAnswer(e.target.value)}
                    className="w-full bg-[#121218] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <Input
                  label="Marathi Intent Explanation (इंटरव्ह्यूवर काय तपासत आहे?)"
                  placeholder="उदा. कॉलबॅक क्यु आणि मायक्रोक्रॅप मधील फरक समजणे..."
                  value={newInterviewMarathiIntent}
                  onChange={(e) => setNewInterviewMarathiIntent(e.target.value)}
                />

                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsAddingInterview(false)}>Cancel</Button>
                  <Button type="submit" variant="primary">Save Question</Button>
                </div>
              </form>
            </GlassCard>
          )}

          {/* Interactive Question Filters Bar */}
          <GlassCard className="p-4 space-y-3 border border-white/10 bg-slate-950/60">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <input
                type="text"
                placeholder="🔍 Search questions or answers..."
                value={iqSearchQuery}
                onChange={(e) => setIqSearchQuery(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 min-w-[240px]"
              />

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-gray-400">Category:</span>
                <button
                  type="button"
                  onClick={() => setIqFilterCategory('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    iqFilterCategory === 'all' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-gray-400 hover:text-white'
                  }`}
                >
                  All Categories ({interviewQuestions.length})
                </button>
                {Array.from(new Set([
                  ...modulesList.map(m => (m.id || '').toLowerCase().trim()),
                  ...interviewQuestions.map(q => (q.category || '').toLowerCase().trim())
                ])).filter(Boolean).map((catKey) => {
                  const toSlug = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                  const catSlug = toSlug(catKey);
                  const matchedModule = modulesList.find(m => toSlug(m.id || m.title) === catSlug);
                  const displayLabel = matchedModule?.title || catKey.toUpperCase();
                  const catCount = interviewQuestions.filter(q => toSlug(q.category) === catSlug).length;
                  return (
                    <div
                      key={catKey}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        toSlug(iqFilterCategory) === catSlug ? 'bg-purple-600 text-white' : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
                      }`}
                      onClick={() => {
                        setIqFilterCategory(catKey);
                        setRawQaCategory(catKey);
                        setNewInterviewCategory(catKey);
                      }}
                    >
                      <span>{displayLabel} ({catCount})</span>
                      <button
                        type="button"
                        title={`Delete category ${displayLabel}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategoryAndQuestions(catKey, displayLabel);
                        }}
                        className="ml-1 text-gray-400 hover:text-rose-400 p-0.5 rounded transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400">Difficulty:</span>
                {['all', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setIqFilterDifficulty(diff)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all capitalize ${
                      iqFilterDifficulty === diff ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-gray-400 hover:text-white'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(() => {
              const toSlug = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
              const activeSlug = toSlug(iqFilterCategory);
              const rawActive = (iqFilterCategory || '').toLowerCase().trim();

              const filtered = interviewQuestions.filter((q) => {
                const itemSlug = toSlug(q.category);
                const rawCat = (q.category || '').toLowerCase().trim();

                const matchCat =
                  iqFilterCategory === 'all' ||
                  activeSlug === itemSlug ||
                  rawCat === rawActive ||
                  (activeSlug && itemSlug && (itemSlug.includes(activeSlug) || activeSlug.includes(itemSlug)));

                const matchDiff =
                  iqFilterDifficulty === 'all' ||
                  !q.difficulty ||
                  (q.difficulty || '').toLowerCase().trim() === (iqFilterDifficulty || '').toLowerCase().trim();

                const qText = `${q.question || q.q || ''} ${q.answer || q.a || ''}`.toLowerCase();
                const matchSearch = !iqSearchQuery.trim() || qText.includes(iqSearchQuery.toLowerCase());

                return matchCat && matchDiff && matchSearch;
              });

              if (filtered.length === 0) {
                return (
                  <GlassCard className="p-8 text-center space-y-4 col-span-2 border border-purple-500/30 bg-purple-950/20">
                    <AlertCircle className="w-8 h-8 text-purple-400 mx-auto animate-pulse" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">No questions matching selected filters</h4>
                      <p className="text-xs text-gray-400">
                        Category: <span className="text-purple-300 font-mono font-bold">{iqFilterCategory}</span> | Difficulty: <span className="text-cyan-300 font-mono font-bold">{iqFilterDifficulty}</span>
                      </p>
                    </div>
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={() => {
                        setIqFilterCategory('all');
                        setIqFilterDifficulty('all');
                        setIqSearchQuery('');
                      }}
                    >
                      🔄 Reset All Filters (View All {interviewQuestions.length} Questions)
                    </Button>
                  </GlassCard>
                );
              }

              return filtered.map((q) => (
                <GlassCard key={q.id} className="p-5 space-y-3 relative group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="cyan">{q.category?.toUpperCase() || 'GENERAL'}</Badge>
                      {q.difficulty && <Badge variant="purple">{q.difficulty}</Badge>}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteInterviewQuestion(q.id)}
                      className="text-gray-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{(q.question || q.q || '').replace(/^(Question|Q\d*|\d+[\.\)])\s*[:.-]?\s*/i, '').trim()}</h4>
                  <p className="text-xs text-gray-300 line-clamp-2">{(q.answer || q.a || '').replace(/^(ns|Ans|Answer|A)\s*[:.-]?\s*/i, '').trim()}</p>
                  {q.marathiIntent && (
                    <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-1 rounded block">
                      💡 Marathi Intent: {q.marathiIntent}
                    </span>
                  )}
                </GlassCard>
              ));
            })()}
          </div>
        </div>
      )}

      {/* Domain 3: DSA Problem Bank Manager */}
      {activeDomain === 'dsa' && (() => {
        const allDsaLanguages = Array.from(new Set([
          'javascript', 'python', 'java', 'c', 'cpp',
          ...customDsaLanguages,
          ...dsaProblems.map(p => (p.language || 'javascript').toLowerCase())
        ])).filter(Boolean);

        return (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                LeetCode DSA Problem Bank
              </h3>
              <p className="text-xs text-gray-400">
                Manage algorithm practice problems across JS, Python, Java, C, C++, starter templates, hints, and solution code.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="glow"
                size="sm"
                onClick={() => setIsAddingLanguageModal(!isAddingLanguageModal)}
                leftIcon={<PlusCircle className="w-4 h-4 text-purple-400" />}
              >
                + Add Language
              </Button>
              <Button
                variant="glass"
                size="sm"
                onClick={() => setIsBulkDsaRawModalOpen(!isBulkDsaRawModalOpen)}
                leftIcon={<FileText className="w-4 h-4 text-amber-400" />}
              >
                📋 Bulk Raw Text Importer
              </Button>
              <Button
                variant="glass"
                size="sm"
                onClick={() => setIsAddingDsa(!isAddingDsa)}
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                {isAddingDsa ? 'Close Form' : 'Add Manual Problem'}
              </Button>
            </div>
          </div>

          {/* Quick Add Custom DSA Language Modal */}
          {isAddingLanguageModal && (
            <GlassCard className="p-5 border border-purple-500/40 bg-purple-950/20 animate-fadeIn">
              <form onSubmit={handleCreateLanguage} className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="e.g. Rust, Go, TypeScript, C#, Ruby, Swift, Kotlin, PHP..."
                    value={newLanguageInput}
                    onChange={(e) => setNewLanguageInput(e.target.value)}
                    required
                  />
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddingLanguageModal(false)}>Cancel</Button>
                <Button type="submit" variant="glow" size="sm">Save New Language</Button>
              </form>
            </GlassCard>
          )}

          {/* Bulk Raw Text DSA Importer Modal */}
          {isBulkDsaRawModalOpen && (
            <GlassCard className="p-6 space-y-4 border border-amber-500/40 bg-amber-950/20 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" /> Paste Raw DSA Problems (Bulk Importer)
                </h4>
                <button type="button" onClick={() => setIsBulkDsaRawModalOpen(false)} className="text-xs text-gray-400 hover:text-white">Close</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Target Language</label>
                  <select
                    value={rawDsaLanguage}
                    onChange={(e) => setRawDsaLanguage(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl p-2.5 text-xs text-gray-200 capitalize"
                  >
                    {allDsaLanguages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang === 'javascript' ? 'JavaScript (JS)' : lang.toUpperCase()}
                      </option>
                    ))}
                    <option value="general">General / Multi-Lang</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Default Difficulty</label>
                  <select
                    value={rawDsaDifficulty}
                    onChange={(e) => setRawDsaDifficulty(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl p-2.5 text-xs text-gray-200"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-300">
                  Paste Raw DSA Problems (Format: Problem title, Hint:, Starter Code:, Solution Code:):
                </label>
                <textarea
                  rows={6}
                  value={rawDsaText}
                  onChange={(e) => setRawDsaText(e.target.value)}
                  placeholder={`Problem: Two Sum Array Hash Table\nFind indices of two numbers that add up to target.\nHint: Use Hash Map for O(N)\nStarter Code: function solution(nums, target) {}\nSolution Code: function solution(nums, target) { return [0, 1]; }\n\nProblem: Valid Anagram Check\nGiven two strings s and t, return true if t is an anagram of s.`}
                  className="w-full bg-slate-950 border border-amber-500/30 rounded-xl p-3 text-xs font-mono text-amber-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button size="sm" variant="glass" onClick={() => setIsBulkDsaRawModalOpen(false)}>Cancel</Button>
                <Button size="sm" variant="glow" onClick={handleBulkImportRawDsa} leftIcon={<Sparkles className="w-4 h-4 text-amber-400" />}>
                  ⚡ Auto-Format & Bulk Import DSA Problems
                </Button>
              </div>
            </GlassCard>
          )}

          {isAddingDsa && (
            <GlassCard className="p-6 space-y-4 border border-amber-500/40 bg-amber-950/10">
              <h4 className="text-sm font-bold text-amber-300">Create New DSA Problem</h4>
              <form onSubmit={handleCreateDsaProblem} className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <Input
                    label="Problem Title"
                    required
                    placeholder="e.g. Two Sum"
                    value={newDsaTitle}
                    onChange={(e) => setNewDsaTitle(e.target.value)}
                  />
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Topic</label>
                    <input
                      type="text"
                      className="w-full bg-[#121218] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      value={newDsaTopic}
                      onChange={(e) => setNewDsaTopic(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Language</label>
                    <select
                      value={newDsaLanguage}
                      onChange={(e) => setNewDsaLanguage(e.target.value)}
                      className="w-full bg-[#121218] border border-white/10 rounded-xl px-3 py-2 text-xs text-white capitalize"
                    >
                      {allDsaLanguages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang === 'javascript' ? 'JavaScript (JS)' : lang.toUpperCase()}
                        </option>
                      ))}
                      <option value="general">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Difficulty</label>
                    <select
                      value={newDsaDifficulty}
                      onChange={(e) => setNewDsaDifficulty(e.target.value)}
                      className="w-full bg-[#121218] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-300">Problem Description</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe problem constraints and example inputs/outputs..."
                    value={newDsaDescription}
                    onChange={(e) => setNewDsaDescription(e.target.value)}
                    className="w-full bg-[#121218] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <Input
                  label="AI Hint"
                  placeholder="e.g. Use a Hash Map to store complement values in O(N)..."
                  value={newDsaHint}
                  onChange={(e) => setNewDsaHint(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Starter Code</label>
                    <textarea
                      rows={4}
                      value={newDsaStarterCode}
                      onChange={(e) => setNewDsaStarterCode(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs font-mono text-cyan-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Solution Code</label>
                    <textarea
                      rows={4}
                      value={newDsaSolutionCode}
                      onChange={(e) => setNewDsaSolutionCode(e.target.value)}
                      className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-3 text-xs font-mono text-emerald-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsAddingDsa(false)}>Cancel</Button>
                  <Button type="submit" variant="primary">Save Problem</Button>
                </div>
              </form>
            </GlassCard>
          )}

          {/* DSA Language Filters & Search Bar */}
          <GlassCard className="p-4 space-y-3 bg-slate-950/40 border border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <FilterPills
                label="Filter Language:"
                options={['all', ...allDsaLanguages].map(lang => ({
                  value: lang,
                  label: lang === 'all' ? 'All Languages' : lang === 'javascript' ? 'JavaScript (JS)' : lang.toUpperCase()
                }))}
                activeValue={dsaFilterLanguage}
                onSelect={(val) => setDsaFilterLanguage(val)}
                onDelete={(langKey, labelText) => handleDeleteDsaLanguage(langKey, labelText)}
              />

              <div className="w-full sm:w-64">
                <SearchInput
                  placeholder="Search DSA problems..."
                  value={dsaSearchQuery}
                  onChange={(e) => setDsaSearchQuery(e.target.value)}
                  onClear={() => setDsaSearchQuery('')}
                />
              </div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dsaProblems
              .filter((p) => {
                const matchLang = dsaFilterLanguage === 'all' || (p.language || 'javascript').toLowerCase() === dsaFilterLanguage.toLowerCase();
                const matchSearch = !dsaSearchQuery.trim() || `${p.title} ${p.topic} ${p.description}`.toLowerCase().includes(dsaSearchQuery.toLowerCase());
                return matchLang && matchSearch;
              })
              .map((p) => (
              <GlassCard key={p.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={p.difficulty === 'Hard' ? 'rose' : p.difficulty === 'Medium' ? 'amber' : 'emerald'}>
                      {p.difficulty || 'Easy'}
                    </Badge>
                    <Badge variant="purple">
                      {(p.language || 'javascript').toUpperCase()}
                    </Badge>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteDsaProblem(p.id)}
                    className="text-gray-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">{p.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400">{p.topic}</span>
                  <span className="text-[10px] font-mono text-gray-500">Target: {p.timeLimit || 'O(N)'}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      );
    })()}

      {/* Domain 4: English Coach Modules Manager */}
      {activeDomain === 'english' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                English Coach & Executive Fluency Modules
              </h3>
              <p className="text-xs text-gray-400">
                Manage English speaking drills, technical vocabulary sets, and executive presentation modules.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="glow"
                size="sm"
                onClick={handleBulkSeedEnglish}
                disabled={isAiGenerating}
                leftIcon={<Sparkles className="w-4 h-4 text-emerald-400" />}
              >
                {isAiGenerating ? 'Generating...' : '⚡ 1-Click AI Bulk Generate Modules'}
              </Button>
              <Button
                variant="glass"
                size="sm"
                onClick={() => setIsAddingEnglish(!isAddingEnglish)}
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                {isAddingEnglish ? 'Close Form' : 'Add Manual Module'}
              </Button>
            </div>
          </div>

          {isAddingEnglish && (
            <GlassCard className="p-6 space-y-4 border border-emerald-500/40 bg-emerald-950/10">
              <h4 className="text-sm font-bold text-emerald-300">Create New English Module</h4>
              <form onSubmit={handleCreateEnglishModule} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Module Title"
                    required
                    placeholder="e.g. Executive Architecture Pitching"
                    value={newEngTitle}
                    onChange={(e) => setNewEngTitle(e.target.value)}
                  />
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Category</label>
                    <select
                      value={newEngCategory}
                      onChange={(e) => setNewEngCategory(e.target.value)}
                      className="w-full bg-[#121218] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="pronunciation">Pronunciation & Accent</option>
                      <option value="vocabulary">Technical Vocabulary</option>
                      <option value="dialogue">Roleplay Dialogue</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-300">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Module focus and learning outcomes..."
                    value={newEngDescription}
                    onChange={(e) => setNewEngDescription(e.target.value)}
                    className="w-full bg-[#121218] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <Input
                  label="Badge Tag Label"
                  placeholder="e.g. Accent Drill / System Demo"
                  value={newEngBadgeLabel}
                  onChange={(e) => setNewEngBadgeLabel(e.target.value)}
                />

                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsAddingEnglish(false)}>Cancel</Button>
                  <Button type="submit" variant="primary">Save Module</Button>
                </div>
              </form>
            </GlassCard>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {englishModules.map((m) => (
              <GlassCard key={m.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="purple">{m.category?.toUpperCase() || 'ENGLISH'}</Badge>
                  <button
                    type="button"
                    onClick={() => handleDeleteEnglishModule(m.id)}
                    className="text-gray-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">{m.title}</h4>
                <p className="text-xs text-gray-400">{m.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Domain 5: DevOps & VPS Setup Manager */}
      {activeDomain === 'devops' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Server className="w-5 h-5 text-cyan-400" />
                DevOps & Hostinger VPS Setup Tutorials
              </h3>
              <p className="text-xs text-gray-400">
                Manage cloud deployment steps, terminal commands, and server setup tutorials.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="glow"
                size="sm"
                onClick={handleBulkSeedDevops}
                disabled={isAiGenerating}
                leftIcon={<Sparkles className="w-4 h-4 text-cyan-400" />}
              >
                {isAiGenerating ? 'Generating...' : '⚡ 1-Click AI Bulk Generate VPS Steps'}
              </Button>
              <Button
                variant="glass"
                size="sm"
                onClick={() => setIsAddingDevops(!isAddingDevops)}
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                {isAddingDevops ? 'Close Form' : 'Add Manual Step'}
              </Button>
            </div>
          </div>

          {isAddingDevops && (
            <GlassCard className="p-6 space-y-4 border border-cyan-500/40 bg-cyan-950/10">
              <h4 className="text-sm font-bold text-cyan-300">Create New DevOps Setup Step</h4>
              <form onSubmit={handleCreateDevopsStep} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Step Badge (e.g. Step 1, Step 2)"
                    required
                    value={newDevStep}
                    onChange={(e) => setNewDevStep(e.target.value)}
                  />
                  <Input
                    label="Step Title"
                    required
                    placeholder="e.g. Nginx Reverse Proxy Setup"
                    value={newDevTitle}
                    onChange={(e) => setNewDevTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-300">Description</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Instructions for SSH or server config..."
                    value={newDevDesc}
                    onChange={(e) => setNewDevDesc(e.target.value)}
                    className="w-full bg-[#121218] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <Input
                  label="Bash Command Snippet"
                  placeholder="e.g. sudo nginx -t && sudo systemctl reload nginx"
                  value={newDevCommand}
                  onChange={(e) => setNewDevCommand(e.target.value)}
                />

                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsAddingDevops(false)}>Cancel</Button>
                  <Button type="submit" variant="primary">Save Step</Button>
                </div>
              </form>
            </GlassCard>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devopsSteps.map((s) => (
              <GlassCard key={s.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="cyan">{s.step}</Badge>
                  <button
                    type="button"
                    onClick={() => handleDeleteDevopsStep(s.id)}
                    className="text-gray-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">{s.title}</h4>
                <p className="text-xs text-gray-400">{s.desc}</p>
                {s.command && (
                  <div className="p-2 rounded-lg bg-black/60 font-mono text-[10px] text-purple-300">
                    <code>{s.command}</code>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Ultra-Premium Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};
