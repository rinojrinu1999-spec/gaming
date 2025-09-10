import pool from "./dbClient.js";

export async function handler(event) {
  try {
    const { member_id, seconds } = JSON.parse(event.body);
    const { rows } = await pool.query(
      "UPDATE members SET remaining_seconds = GREATEST(0, remaining_seconds - $1) WHERE member_id=$2 RETURNING remaining_seconds",
      [seconds, member_id]
    );
    return { statusCode: 200, body: JSON.stringify(rows[0]) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
