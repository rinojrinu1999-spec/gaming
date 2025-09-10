import pool from "./dbClient.js";

export async function handler(event) {
  try {
    const { seconds } = JSON.parse(event.body);
    await pool.query(
      "UPDATE members SET remaining_seconds = remaining_seconds + $1",
      [seconds]
    );
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
