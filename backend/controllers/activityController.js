const { createActivity, getActivities } = require("../models/activityModel");

function startActivity(req, res) {
  const { userId } = req.body;

  const activity = {
    id: Date.now(),
    userId,
    startTime: new Date(),
    coordinates: [],
    distance: 0
  };

  createActivity(activity);

  res.json({ message: "Atividade iniciada", activity });
}

function getAllActivities(req, res) {
  const activities = getActivities();
  res.json(activities);
}

module.exports = { startActivity, getAllActivities };