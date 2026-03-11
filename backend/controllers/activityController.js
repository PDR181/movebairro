const { createActivity, getActivities } = require("../models/activityModel");
const calculateDistance = require("../utils/distance");

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

function addLocation(req, res) {

  const { activityId, latitude, longitude } = req.body;

  const activities = getActivities();

  const activity = activities.find(a => a.id == activityId);

  if (!activity) {
    return res.status(404).json({ message: "Atividade não encontrada" });
  }

  const lastCoordinate = activity.coordinates[activity.coordinates.length - 1];

  if (lastCoordinate) {

    const distance = calculateDistance(
      lastCoordinate.latitude,
      lastCoordinate.longitude,
      latitude,
      longitude
    );

    activity.distance += distance;
  }

  activity.coordinates.push({
    latitude,
    longitude,
    time: new Date()
  });

  res.json({
    message: "Localização adicionada",
    totalDistance: activity.distance
  });
}

module.exports = { 
  startActivity, 
  getAllActivities,
  addLocation
};