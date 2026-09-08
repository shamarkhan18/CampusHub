const Application = require('../models/Application');

async function listApplications(req, res, next) {
  try {
    const applications = await Application.find({ userId: req.userId })
      .populate('opportunityId')
      .sort({ createdAt: -1 });
    res.json({ applications });
  } catch (err) {
    next(err);
  }
}

async function createApplication(req, res, next) {
  try {
    const { opportunityId, status, notes } = req.body;
    const existing = await Application.findOne({ userId: req.userId, opportunityId });
    if (existing) {
      return res.status(409).json({ message: 'Already tracking this opportunity', application: existing });
    }

    const application = await Application.create({
      userId: req.userId,
      opportunityId,
      status: status || 'Saved',
      notes: notes || '',
      appliedDate: status === 'Applied' ? new Date() : undefined,
    });
    const populated = await application.populate('opportunityId');
    res.status(201).json({ application: populated });
  } catch (err) {
    next(err);
  }
}

async function updateApplication(req, res, next) {
  try {
    const application = await Application.findOne({ _id: req.params.id, userId: req.userId });
    if (!application) return res.status(404).json({ message: 'Application not found' });

    const { status, notes } = req.body;
    if (status) {
      application.status = status;
      if (status === 'Applied' && !application.appliedDate) {
        application.appliedDate = new Date();
      }
    }
    if (notes !== undefined) application.notes = notes;

    await application.save();
    const populated = await application.populate('opportunityId');
    res.json({ application: populated });
  } catch (err) {
    next(err);
  }
}

async function deleteApplication(req, res, next) {
  try {
    const application = await Application.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application removed' });
  } catch (err) {
    next(err);
  }
}

module.exports = { listApplications, createApplication, updateApplication, deleteApplication };