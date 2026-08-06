const JournalEntry = require('../modals/JournalEntry');
const { sendSuccess, sendError } = require('../helper/responseHelper');

const getEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await JournalEntry.findAll({ where: { userId } });
    return sendSuccess(res, 'Journal entries fetched', entries);
  } catch (error) {
    return sendError(res, 'Error fetching journal entries', error, 500);
  }
};

const createEntry = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content, mood, promptUsed } = req.body;
    const newEntry = await JournalEntry.create({
      id: `j_${Date.now()}`,
      userId,
      title,
      content,
      mood: mood || 9,
      promptUsed: promptUsed || 'Reflection',
    });
    return sendSuccess(res, 'Journal entry created', newEntry, 201);
  } catch (error) {
    return sendError(res, 'Error creating journal entry', error, 500);
  }
};

module.exports = {
  getEntries,
  createEntry,
};
