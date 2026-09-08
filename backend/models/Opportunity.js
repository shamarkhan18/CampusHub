const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Internship', 'Hackathon', 'Scholarship', 'Fellowship', 'Competition', 'Other'],
      default: 'Other',
    },
    deadline: { type: Date, required: true },
    eligibility: { type: String, default: '' },
    location: { type: String, default: 'Remote' },
    link: { type: String, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

opportunitySchema.index({ title: 'text', organization: 'text', description: 'text' });

module.exports = mongoose.model('Opportunity', opportunitySchema);