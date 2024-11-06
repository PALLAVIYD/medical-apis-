const Mood = require('../models/Mood');

exports.recordMood = async (req, res) => {
    try {
        const { mood, emotions, thoughts } = req.body;
        const newMood = new Mood({ userId: req.user.id, mood, emotions, thoughts });
        await newMood.save();
        res.status(201).json({ message: 'Mood recorded successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMoodHistory = async (req, res) => {
    try {
        const moodHistory = await Mood.find({ userId: req.user.id });
        res.json(moodHistory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
