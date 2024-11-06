const Counselor = require('../models/Counselor'); // Assuming there's a Counselor model or list for availability
const Session = require('../models/Session'); // Assuming there's a model for managing user sessions

// Fetch available counselors
exports.getCounselorAvailability = async (req, res) => {
    try {
        const availableCounselors = await Counselor.find({ isAvailable: true });
        res.json(availableCounselors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching counselor availability' });
    }
};

// Connect with a counselor (initiate chat or request for one)
exports.connectWithCounselor = async (req, res) => {
    try {
        // Logic to match the user with an available counselor
        const counselor = await Counselor.findOne({ isAvailable: true });
        if (!counselor) {
            return res.status(404).json({ error: 'No available counselors at the moment' });
        }

        // Simulate a connection initiation (in a real scenario, this could be linked to a chat system)
        res.json({
            message: 'You have been connected with a counselor',
            counselor: {
                name: counselor.name,
                specialty: counselor.specialty,
                contactMethod: 'chat/video',
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Error connecting to a counselor' });
    }
};

// Book a counseling session
exports.bookCounselingSession = async (req, res) => {
    try {
        const { date, time, counselorId } = req.body;
        
        // Check if the counselor exists and is available
        const counselor = await Counselor.findById(counselorId);
        if (!counselor) {
            return res.status(404).json({ error: 'Counselor not found' });
        }

        // Create a new session
        const session = new Session({
            userId: req.user.id,
            counselorId,
            date,
            time,
            status: 'scheduled',
        });
        await session.save();

        res.status(201).json({ message: 'Counseling session booked successfully', session });
    } catch (error) {
        res.status(400).json({ error: 'Error booking session' });
    }
};
