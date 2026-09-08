const Opportunity = require('../models/Opportunity');

async function listOpportunities(req, res, next) {
  try {
    const { category, search, sort } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (search) filter.$text = { $search: search };

    let query = Opportunity.find(filter);
    query = sort === 'deadline' ? query.sort({ deadline: 1 }) : query.sort({ createdAt: -1 });

    const opportunities = await query.exec();
    res.json({ opportunities });
  } catch (err) {
    next(err);
  }
}

async function getOpportunity(req, res, next) {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    res.json({ opportunity });
  } catch (err) {
    next(err);
  }
}

async function createOpportunity(req, res, next) {
  try {
    const payload = { ...req.body, createdBy: req.userId };
    const opportunity = await Opportunity.create(payload);
    res.status(201).json({ opportunity });
  } catch (err) {
    next(err);
  }
}

async function updateOpportunity(req, res, next) {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    res.json({ opportunity });
  } catch (err) {
    next(err);
  }
}

async function deleteOpportunity(req, res, next) {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(req.params.id);
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    res.json({ message: 'Opportunity deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listOpportunities,
  getOpportunity,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};