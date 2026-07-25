const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Auto-seed admin user for production ease of use
    const existingAdmin = await User.findOne({ email: 'admin@leaddesk.com' });
    if (!existingAdmin) {
      const adminUser = new User({
        username: 'admin',
        email: 'admin@leaddesk.com',
        password: 'password123',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user auto-seeded successfully');
    }
    
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
