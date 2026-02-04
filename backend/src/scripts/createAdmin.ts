import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI not found in .env');
    }

    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Get admins collection
    const db = mongoose.connection.db;
    const adminsCollection = db?.collection('admins');

    if (!adminsCollection) {
      throw new Error('Could not access admins collection');
    }

    // Check if admin already exists
    const existingAdmin = await adminsCollection.findOne({ 
      email: 'sheren@owner.com' 
    });

    if (existingAdmin) {
      console.log('Admin already exists!');
      console.log('Email: sheren@owner.com');
      console.log('You can login with existing credentials');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Hash password with bcrypt
    const password = 'Sheren@2005';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin document
    const admin = {
      email: 'sheren@owner.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert into database
    await adminsCollection.insertOne(admin);

    console.log('Admin created successfully!');
    console.log('========================');
    console.log('Email: sheren@owner.com');
    console.log('Password: Sheren@2005');
    console.log('========================');
    console.log('You can now login with these credentials');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();