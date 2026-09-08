const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    opportunityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity', required: true },
    status: {
      type: String,
      enum: ['Saved', 'In Progress', 'Applied', 'Shortlisted', 'Rejected', 'Accepted'],
      default: 'Saved',
    },
    appliedDate: { type: Date },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

applicationSchema.index({ userId: 1, opportunityId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);