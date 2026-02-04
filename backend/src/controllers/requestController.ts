import { Request, Response } from 'express';
import BloodRequest from '../models/BloodRequest';

// =====================
// CREATE BLOOD REQUEST
// POST /api/requests
// =====================

export const createBloodRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { patientName, bloodGroup, unitsRequired, hospital, contact, urgency } = req.body;

    // 1. Validate required fields
    if (!patientName || !bloodGroup || !unitsRequired || !hospital || !contact) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields: patientName, bloodGroup, unitsRequired, hospital, contact'
      });
      return;
    }

    // 2. Create new blood request
    const bloodRequest = await BloodRequest.create({
      patientName,
      bloodGroup,
      unitsRequired,
      hospital,
      contact,
      urgency: urgency || 'Medium' // Default to Medium if not provided
    });

    // 3. Send response
    res.status(201).json({
      success: true,
      message: 'Blood request submitted successfully',
      data: bloodRequest
    });

  } catch (error: any) {
    console.error('Create blood request error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: error.message
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Server error while submitting blood request'
    });
  }
};

// =====================
// GET ALL BLOOD REQUESTS
// GET /api/requests
// =====================

export const getAllBloodRequests = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Get all requests, sorted by urgency and newest first
    const requests = await BloodRequest.find().sort({ urgency: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });

  } catch (error: any) {
    console.error('Get blood requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching blood requests'
    });
  }
};

// =====================
// DELETE BLOOD REQUEST
// DELETE /api/requests/:id
// =====================

export const deleteBloodRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // 1. Find and delete blood request
    const bloodRequest = await BloodRequest.findByIdAndDelete(id);

    if (!bloodRequest) {
      res.status(404).json({
        success: false,
        message: 'Blood request not found'
      });
      return;
    }

    // 2. Send response
    res.status(200).json({
      success: true,
      message: 'Blood request deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete blood request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting blood request'
    });
  }
};