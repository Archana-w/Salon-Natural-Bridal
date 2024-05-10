const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/add', async (req, res) => {
  const { sName, sPrice, sDescription, sType } = req.body;
  const imageName = req.files[0].filename;
  try {
    const newService = new Service({
      sName,
      sPrice,
      sDescription,
      sType,
      imageUrl:imageName,
      createdAt: new Date(),
    });

    const savedService = await newService.save();
    const addedDate = savedService.createdAt;

    res.status(200).json({ status: "Service added", addedDate });
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ status: "Error adding service", error: error.message });
  }
});

// Read all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ status: "Error fetching services", error: error.message });
  }
});

// Read one service
router.get("/:sid", async (req, res) => {
  const serviceId = req.params.sid;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404).json({ status: "Service not found" });
    } else {
      res.status(200).json(service);
    }
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ status: "Error fetching service", error: error.message });
  }
});

// Update a service
router.put("/update/:sid", async (req, res) => {
  const serviceId = req.params.sid;
  const { sName, sPrice, sDescription, sType } = req.body;

  const updateService = {
    sName,
    sPrice,
    sDescription,
    sType,
  };

  try {
    const updatedService = await Service.findByIdAndUpdate(serviceId, updateService, { new: true });
    res.status(200).json({ status: "Service Updated", service: updatedService });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ status: "Error with updating service", error: error.message });
  }
});

// Delete a service
router.delete("/delete/:sid", async (req, res) => {
  const serviceId = req.params.sid;

  try {
    await Service.findByIdAndDelete(serviceId);
    res.status(200).json({ status: "Service deleted" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ status: "Error with deleting service", error: error.message });
  }
});

module.exports = router;
