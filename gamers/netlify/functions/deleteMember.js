import pool from "./dbClient.js";

export async function handler(event) {
  try {
    const { member_id } = JSON.parse(event.body);
    await pool.query("DELETE FROM members WHERE member_id=$1", [member_id]);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
