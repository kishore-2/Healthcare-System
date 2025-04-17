require('dotenv').config();
const sql = require('mssql');
const bcrypt = require('bcrypt');

module.exports = async function (context, req) {
  // Enable CORS and JSON content-type
  context.res = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "X-Content-Type-Options": "nosniff"
    }
  };

  const { username, password, role } = req.body || {};

  if (!username || !password || !role) {
    context.res.status = 400;
    context.res.body = JSON.stringify({ message: "Missing username, password or role." });
    return;
  }

  try {
    await sql.connect(process.env.AzureSqlConnection);
    const result = await sql.query`
      SELECT * 
      FROM Users 
      WHERE username = ${username} AND role = ${role}
    `;

    if (!result.recordset.length) {
      context.res.status = 401;
      context.res.body = JSON.stringify({ message: "Invalid credentials." });
      return;
    }

    const user = result.recordset[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      context.res.status = 401;
      context.res.body = JSON.stringify({ message: "Invalid credentials." });
      return;
    }

    // Success!
    context.res.status = 200;
    context.res.body = JSON.stringify({
      success: true,
      role,
      redirectUrl: role === "DDHS"
        ? "ddhs_dashboard.html"
        : "phc_subcenter_dashboard.html"
    });
  } catch (err) {
    context.res.status = 500;
    context.res.body = JSON.stringify({ message: "Server error", detail: err.message });
  }
};
