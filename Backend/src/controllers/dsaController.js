const DsaProblem = require('../modals/DsaProblem');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getProblems = async (req, res) => {
  try {
    const problems = await DsaProblem.findAll({ order: [['createdAt', 'ASC']] });
    return sendSuccess(res, 'DSA problems fetched successfully', problems);
  } catch (error) {
    return sendError(res, 'Error fetching DSA problems', error, 500);
  }
};

const createProblem = async (req, res) => {
  try {
    const id = req.body.id || `dsa-${Date.now()}`;
    const newProblem = await DsaProblem.create({ id, ...req.body });
    return sendSuccess(res, 'DSA problem created successfully', newProblem, 201);
  } catch (error) {
    return sendError(res, 'Error creating DSA problem', error, 500);
  }
};

const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    await DsaProblem.destroy({ where: { id } });
    return sendSuccess(res, 'DSA problem deleted successfully', null);
  } catch (error) {
    return sendError(res, 'Error deleting DSA problem', error, 500);
  }
};

const { generateDsaProblemsBulk } = require('../helper/aiGenerator');

const bulkGenerateSequence = async (req, res) => {
  try {
    const { titles } = req.body;
    if (!Array.isArray(titles) || titles.length === 0) {
      return sendError(res, 'Titles array is required', null, 400);
    }
    const generatedItems = generateDsaProblemsBulk(titles);
    
    const existing = await DsaProblem.findAll({ attributes: ['title'] });
    const existingSet = new Set(existing.map(e => (e.title || '').toLowerCase().trim()));
    const uniqueItems = generatedItems.filter(item => !existingSet.has((item.title || '').toLowerCase().trim()));

    if (uniqueItems.length === 0) {
      return sendSuccess(res, 'All DSA problems in this batch already exist', []);
    }

    const created = await DsaProblem.bulkCreate(uniqueItems);
    return sendSuccess(res, `Bulk generated ${created.length} unique DSA problems`, created, 201);
  } catch (error) {
    return sendError(res, 'Error generating bulk DSA problems', error, 500);
  }
};

const bulkImportRawDsa = async (req, res) => {
  try {
    const { rawText, items: inputItems, defaultTopic = 'Arrays', defaultDifficulty = 'Easy', defaultLanguage = 'javascript' } = req.body;
    let itemsToProcess = [];

    if (Array.isArray(inputItems) && inputItems.length > 0) {
      itemsToProcess = inputItems;
    } else if (rawText && typeof rawText === 'string') {
      const blocks = rawText.split(/\n\s*(?:Problem|P\d+|\d+[\.\)])\s*/i);
      blocks.forEach((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return;

        const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
        let title = lines[0] ? lines[0].replace(/^(Problem|P\d+|\d+[\.\)])\s*[:.-]?\s*/i, '') : `DSA Problem ${idx + 1}`;
        let description = '';
        let hint = '';
        let starterCode = '';
        let solutionCode = '';

        let currentSection = 'description';
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (/^Hint\s*[:.-]/i.test(line)) {
            currentSection = 'hint';
            hint += line.replace(/^Hint\s*[:.-]?\s*/i, '') + ' ';
          } else if (/^(Starter Code|Starter)\s*[:.-]/i.test(line)) {
            currentSection = 'starterCode';
            starterCode += line.replace(/^(Starter Code|Starter)\s*[:.-]?\s*/i, '') + '\n';
          } else if (/^(Solution Code|Solution|Ans|Answer)\s*[:.-]/i.test(line)) {
            currentSection = 'solutionCode';
            solutionCode += line.replace(/^(Solution Code|Solution|Ans|Answer)\s*[:.-]?\s*/i, '') + '\n';
          } else {
            if (currentSection === 'hint') hint += line + ' ';
            else if (currentSection === 'starterCode') starterCode += line + '\n';
            else if (currentSection === 'solutionCode') solutionCode += line + '\n';
            else description += line + ' ';
          }
        }

        itemsToProcess.push({
          title,
          topic: defaultTopic,
          difficulty: defaultDifficulty,
          language: defaultLanguage,
          description: description.trim() || title,
          hint: hint.trim() || 'Analyze time & space complexity constraints.',
          starterCode: starterCode.trim() || '// Write your solution here',
          solutionCode: solutionCode.trim() || '// Solution code',
        });
      });
    }

    if (itemsToProcess.length === 0) {
      return sendError(res, 'No valid DSA problem items found to import', null, 400);
    }

    const createdItems = [];
    for (const item of itemsToProcess) {
      const id = `dsa-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const created = await DsaProblem.create({
        id,
        title: item.title,
        topic: item.topic || defaultTopic,
        difficulty: item.difficulty || defaultDifficulty,
        language: item.language || defaultLanguage,
        description: item.description || item.title,
        hint: item.hint || null,
        starterCode: item.starterCode || null,
        solutionCode: item.solutionCode || null,
        timeLimit: item.timeLimit || 'O(N)',
      });
      createdItems.push(created);
    }

    return sendSuccess(res, `Bulk imported ${createdItems.length} DSA problems`, createdItems, 201);
  } catch (error) {
    return sendError(res, 'Error bulk importing DSA problems', error, 500);
  }
};

const deleteProblemsByLanguage = async (req, res) => {
  try {
    const { language } = req.params;
    if (!language) {
      return sendError(res, 'Language parameter is required', null, 400);
    }
    const count = await DsaProblem.destroy({ where: { language } });
    return sendSuccess(res, `Deleted ${count} DSA problems for language ${language}`, { deletedCount: count });
  } catch (error) {
    return sendError(res, 'Error deleting DSA problems by language', error, 500);
  }
};

module.exports = { getProblems, createProblem, deleteProblem, bulkGenerateSequence, bulkImportRawDsa, deleteProblemsByLanguage };
