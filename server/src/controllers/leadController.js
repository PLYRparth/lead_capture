const Lead = require('../models/Lead');

/**
 * @desc    Create a new lead
 * @route   POST /api/leads
 * @access  Public
 */
const createLead = async (req, res, next) => {
  try {
    const { name, email, budget, message } = req.body;

    const lead = await Lead.create({
      name,
      email,
      budget,
      message,
    });

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all leads
 * @route   GET /api/leads
 * @access  Public/Admin
 */
const getLeads = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    
    // Build query object
    const query = {};
    
    // Handle search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Handle status filter
    if (status) {
      query.status = status;
    }

    // Return newest first
    const leads = await Lead.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update lead status
 * @route   PATCH /api/leads/:id/status
 * @access  Public/Admin
 */
const updateLeadStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getLeads,
  updateLeadStatus,
};
