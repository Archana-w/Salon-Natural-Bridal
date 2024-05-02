// server/routes/supplier_route.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Supplier = require("../models/Supplier");
const User = require("../models/User");

router.get('/getAll', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier deleted' });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/update/:id', async (req, res) => {
  const { name, address, contact, email, category, password } = req.body;
  const id = req.params.id;

  if (!name || !address || !contact || !email || !category) {
    return res.status(400).json({ message: "All Fields Required" });
  }
  
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      id,
      { name, address, contact, email, category, password },
      { new: true }
    );
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier updated successfully', supplier });
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  const { name, address, contact, email, category, password } = req.body;

  if (!name || !address || !contact || !email || !category || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const supplier = new Supplier({ 
      name, 
      address, 
      contact, 
      email, 
      category, 
      password: hashedPassword,
    });
    
    await supplier.save();

    res.status(201).json({ message: 'Supplier registered successfully.', supplier });
  } catch (error) {
    console.error('Error registering supplier:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const supplierId = req.supplier._id; // Assuming you have middleware to authenticate the supplier and set req.supplier
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.error('Error fetching supplier profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  let userType = 'user';

  if (!user) {
      user = await Supplier.findOne({ email });
      userType = 'supplier';
  }

  if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate token logic here
  const token = 'generated_token_here'; // Replace with actual token generation logic
  res.status(200).json({ status: 'success', type: userType, access_token: token });
});
module.exports = router;

