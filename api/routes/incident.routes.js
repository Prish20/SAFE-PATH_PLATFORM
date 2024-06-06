// In your Express server file
import express from "express";
import Incident from "../models/incident.model.js";

const router = express.Router();

// POST /api/incident/report - Report an incident
router.post("/report", async (req, res) => {
  try {
    const {
      userId,
      type,
      description,
      location,
      date,
      image,
      latitude,
      longitude,
    } = req.body;

    const newIncident = new Incident({
      userId,
      type,
      description,
      location,
      date,
      image,
      latitude,
      longitude,
    });

    const savedIncident = await newIncident.save();
    res.status(201).json(savedIncident);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to report incident", error: error.message });
  }
});

// GET /api/incident - Fetch all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch incidents", error: error.message });
  }
});

export default router;
