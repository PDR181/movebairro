const pool = require("../config/db");

async function createCoordinate(activityId, latitude, longitude) {
  const query = `
    INSERT INTO coordinates (activity_id, latitude, longitude)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [activityId, latitude, longitude];
  const result = await pool.query(query, values);

  return result.rows[0];
}

async function getLastCoordinate(activityId) {
  const query = `
    SELECT * FROM coordinates
    WHERE activity_id = $1
    ORDER BY id DESC
    LIMIT 1
  `;

  const result = await pool.query(query, [activityId]);
  return result.rows[0];
}

module.exports = {
  createCoordinate,
  getLastCoordinate
};