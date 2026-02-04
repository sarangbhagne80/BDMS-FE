import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import Donor from '../models/Donor';
import BloodRequest from '../models/BloodRequest';

// =====================
// ADMIN LOGIN
// POST /api/admin/login
// =====================

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
      return;
    }

    // 2. Find admin by email (include password field)
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    // 3. Compare passwords
    const isPasswordMatch = await admin.comparePassword(password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' } // Token valid for 7 days
    );

    // 5. Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });

  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};
export const getDashboardStats = async (req, res) => {
  try {
    const totalDonors = await Donor.countDocuments();
    const totalRequests = await BloodRequest.countDocuments();
    const pendingRequests = await BloodRequest.countDocuments({
      status: "Pending",
    });

    res.json({
      totalDonors,
      totalRequests,
      pendingRequests,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getRecentRequests = async (req, res) => {
  try {
    const requests = await BloodRequest
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};