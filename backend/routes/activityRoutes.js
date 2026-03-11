const express = require("express");
const router = express.Router();

const { startActivity, getAllActivities, addLocation } = require("../controllers/activityController");

router.post("/start", startActivity);
router.get("/", getAllActivities);
router.post("/location", addLocation);

module.exports = router;