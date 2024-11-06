const express = require('express');
const { recordMood, getMoodHistory } = require('../controllers/moodController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, recordMood);
router.get('/history', protect, getMoodHistory);

module.exports = router;
