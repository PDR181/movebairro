const pool = require("../config/db");

async function createActivity(userId) {
  const query = `
    INSERT INTO activities (user_id, start_time)
    VALUES ($1, NOW())
    RETURNING *
  `;

  const result = await pool.query(query, [userId]);
  return result.rows[0];
}

async function findActivityById(activityId) {
  const query = `
    SELECT * FROM activities
    WHERE id = $1
  `;

  const result = await pool.query(query, [activityId]);
  return result.rows[0];
}

async function finishActivity(activityId) {
  const query = `
    UPDATE activities
    SET end_time = NOW(),
        duration = EXTRACT(EPOCH FROM (NOW() - start_time))::INTEGER
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [activityId]);
  return result.rows[0];
}

async function updateActivityDistance(activityId, distanceToAdd) {
  const query = `
    UPDATE activities
    SET distance = distance + $1
    WHERE id = $2
    RETURNING *
  `;

  const result = await pool.query(query, [distanceToAdd, activityId]);
  return result.rows[0];
}

async function getActivities() {
  const query = `
    SELECT * FROM activities
    ORDER BY id DESC
  `;

  const result = await pool.query(query);
  return result.rows;
}

async function getRanking() {
  const query = `
    SELECT 
      users.id,
      users.name,
      COALESCE(SUM(activities.distance), 0) AS total_distance,
      COALESCE(SUM(activities.duration), 0) AS total_duration,
      COUNT(activities.id) AS total_activities
    FROM users
    LEFT JOIN activities ON users.id = activities.user_id
    GROUP BY users.id, users.name
    ORDER BY total_distance DESC
  `;

  const result = await pool.query(query);
  return result.rows;
}

module.exports = {
  createActivity,
  findActivityById,
  finishActivity,
  updateActivityDistance,
  getActivities,
  getRanking
};