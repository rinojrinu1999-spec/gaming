import pool from "./dbClient.js";

export async function handler(event) {
  try {
    const { name, member_id, initial_seconds } = JSON.parse(event.body);
    const id = member_id || "MBR-" + Math.floor(1000 + Math.random() * 9000);

    await pool.query(
      "INSERT INTO members (member_id, name, remaining_seconds) VALUES ($1,$2,$3)",
      [id, name, initial_seconds || 0]
    );

    return { statusCode: 200, body: JSON.stringify({ member_id: id }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
