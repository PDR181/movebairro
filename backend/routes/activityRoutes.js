const express = require("express");
const router = express.Router();

const { startActivity, getAllActivities } = require("../controllers/activityController");

router.post("/start", startActivity);
router.get("/", getAllActivities);

module.exports = router;