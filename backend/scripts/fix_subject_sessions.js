// Run this script with: node backend/scripts/fix_subject_sessions.js
const mongoose = require('mongoose');
const Subject = require('../models/subjectSchema');
const dotenv = require('dotenv');
dotenv.config();

async function fixSessions() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const subjects = await Subject.find({});
  let updated = 0;
  for (const subject of subjects) {
    if (typeof subject.sessions === 'string') {
      subject.sessions = parseInt(subject.sessions, 10);
      await subject.save();
      updated++;
    }
  }
  console.log(`Updated ${updated} subject(s).`);
  mongoose.disconnect();
}

fixSessions().catch(err => {
  console.error(err);
  mongoose.disconnect();
}); 