const {
  createActivity,
  findActivityById,
  finishActivity,
  updateActivityDistance,
  getActivities
} = require("../models/activityModel");

const {
  createCoordinate,
  getLastCoordinate
} = require("../models/coordinateModel");

const calculateDistance = require("../utils/distance");

async function startActivity(req, res) {
  const { userId } = req.body;

  try {
    const activity = await createActivity(userId);

    res.status(201).json({
      message: "Atividade iniciada",
      activity
    });
  } catch (error) {
    console.error("Erro ao iniciar atividade:", error);
    res.status(500).json({
      message: "Erro ao iniciar atividade",
      error: error.message
    });
  }
}

async function getAllActivities(req, res) {
  try {
    const activities = await getActivities();
    res.json(activities);
  } catch (error) {
    console.error("Erro ao buscar atividades:", error);
    res.status(500).json({ message: "Erro ao buscar atividades" });
  }
}

async function addLocation(req, res) {
  const { activityId, latitude, longitude } = req.body;

  try {
    const activity = await findActivityById(activityId);

    if (!activity) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }

    const lastCoordinate = await getLastCoordinate(activityId);

    let distanceToAdd = 0;

    if (lastCoordinate) {
      distanceToAdd = calculateDistance(
        Number(lastCoordinate.latitude),
        Number(lastCoordinate.longitude),
        Number(latitude),
        Number(longitude)
      );
    }

    await createCoordinate(activityId, latitude, longitude);

    const updatedActivity = await updateActivityDistance(activityId, distanceToAdd);

    res.json({
      message: "Localização adicionada",
      distanceAdded: distanceToAdd,
      totalDistance: updatedActivity.distance
    });
  } catch (error) {
    console.error("Erro ao adicionar localização:", error);
    res.status(500).json({
      message: "Erro ao adicionar localização",
      error: error.message
    });
  }
}

async function finishActivityController(req, res) {
  const { activityId } = req.body;

  try {
    const activity = await finishActivity(activityId);

    if (!activity) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }

    res.json({
      message: "Atividade finalizada",
      activity
    });
  } catch (error) {
    console.error("Erro ao finalizar atividade:", error);
    res.status(500).json({
      message: "Erro ao finalizar atividade",
      error: error.message
    });
  }
}

module.exports = {
  startActivity,
  getAllActivities,
  addLocation,
  finishActivity: finishActivityController
};