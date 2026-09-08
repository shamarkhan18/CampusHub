require('dotenv').config();
const mongoose = require('mongoose');
const Opportunity = require('./models/Opportunity');

const days = (n) => new Date(Date.now() + n * 24 * 60 * 60 * 1000);

const sample = [
  {
    title: 'Summer Software Engineering Internship',
    organization: 'Google',
    description: 'Work on real products with a mentor for 12 weeks.',
    category: 'Internship',
    deadline: days(2),
    eligibility: 'Penultimate year students',
    location: 'Remote',
    link: 'https://careers.google.com',
  },
  {
    title: 'HackTheCampus 2026',
    organization: 'HackTheCampus',
    description: '24-hour hackathon with prizes across 5 tracks.',
    category: 'Hackathon',
    deadline: days(5),
    eligibility: 'All undergraduates',
    location: 'Bangalore',
    link: 'https://hackthecampus.dev',
  },
  {
    title: 'National Merit Scholarship',
    organization: 'Dept. of Education',
    description: 'Merit-based scholarship covering full tuition.',
    category: 'Scholarship',
    deadline: days(20),
    eligibility: 'GPA 8.5+',
    location: 'Remote',
    link: 'https://example.gov/scholarship',
  },
  {
    title: 'AI Research Fellowship',
    organization: 'Anthropic',
    description: 'A 6-month research fellowship on interpretability.',
    category: 'Fellowship',
    deadline: days(30),
    eligibility: 'Final year / grad students',
    location: 'Remote',
    link: 'https://anthropic.com',
  },
  {
    title: 'Case Study Competition',
    organization: 'McKinsey & Co.',
    description: 'Solve a real business case in teams of 3.',
    category: 'Competition',
    deadline: days(7),
    eligibility: 'All students',
    location: 'Delhi',
    link: 'https://mckinsey.com',
  },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  await Opportunity.deleteMany({});
  await Opportunity.insertMany(sample);
  console.log(`Seeded ${sample.length} opportunities`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});