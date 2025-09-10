import pool from "./dbClient.js";

export async function handler() {
  try {
    const { rows } = await pool.query(
      "SELECT member_id, name, remaining_seconds FROM members ORDER BY name"
    );
    return { statusCode: 200, body: JSON.stringify(rows) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
