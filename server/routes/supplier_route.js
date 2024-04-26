const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Supplier = require("../models/Supplier");

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
      isVerified: false 
    });
    
    await supplier.save();

    res.status(201).json({ message: 'Supplier registered successfully. Waiting for admin verification.', supplier });
  } catch (error) {
    console.error('Error registering supplier:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/verify', async (req, res) => {
  const { supplierId } = req.body;
  try {
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    supplier.isVerified = true;
    await supplier.save();
    res.status(200).json({ message: 'Supplier verified successfully', supplier });
  } catch (error) {
    console.error('Error verifying supplier:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
