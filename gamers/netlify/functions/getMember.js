import pool from "./dbClient.js";

export async function handler(event) {
  try {
    const id = event.queryStringParameters.member_id;
    const { rows } = await pool.query(
      "SELECT member_id, name, remaining_seconds FROM members WHERE member_id=$1",
      [id]
    );
    if (!rows.length)
      return { statusCode: 404, body: JSON.stringify({ error: "Not found" }) };

    return { statusCode: 200, body: JSON.stringify(rows[0]) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
