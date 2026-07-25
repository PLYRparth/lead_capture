const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const db = require('./src/config/db'); // assuming db.js exists

dotenv.config();

const seedAdmin = async () => {
  try {
    // If there is no db config file we can just connect here
    await mongoose.connect(process.env.MONGO_URI);
    
    const existingAdmin = await User.findOne({ email: 'admin@leaddesk.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
    } else {
      const adminUser = new User({
        username: 'admin',
        email: 'admin@leaddesk.com',
        password: 'password123',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user seeded successfully');
    }
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
