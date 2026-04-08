const express = require("express");
const router = express.Router();

const {
  startActivity,
  getAllActivities,
  addLocation,
  finishActivity,
  getRanking
} = require("../controllers/activityController");

router.post("/start", startActivity);
router.get("/", getAllActivities);
router.post("/location", addLocation);
router.post("/finish", finishActivity);
router.get("/ranking", getRanking);

module.exports = router;