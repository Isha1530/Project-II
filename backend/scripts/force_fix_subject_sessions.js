// Run this script with: node backend/scripts/force_fix_subject_sessions.js
const mongoose = require('mongoose');
const Subject = require('../models/subjectSchema');
const dotenv = require('dotenv');
dotenv.config();

async function forceFixSessions() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const subjects = await Subject.find({});
  let updated = 0;
  for (const subject of subjects) {
    const numSessions = Number(subject.sessions);
    if (subject.sessions !== numSessions) {
      subject.sessions = numSessions;
      await subject.save();
      updated++;
    }
  }
  console.log(`Force-updated ${updated} subject(s).`);
  mongoose.disconnect();
}

forceFixSessions().catch(err => {
  console.error(err);
  mongoose.disconnect();
}); 