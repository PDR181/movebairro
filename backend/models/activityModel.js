const activities = [];

function createActivity(activity) {
  activities.push(activity);
  return activity;
}

function getActivities() {
  return activities;
}

module.exports = { createActivity, getActivities };