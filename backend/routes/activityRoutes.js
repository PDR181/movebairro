const express = require("express");
const router = express.Router();

const {
  startActivity,
  getAllActivities,
  addLocation,
  finishActivity
} = require("../controllers/activityController");

router.post("/start", startActivity);
router.get("/", getAllActivities);
router.post("/location", addLocation);
router.post("/finish", finishActivity);

module.exports = router;