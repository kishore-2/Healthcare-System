require('dotenv').config();
const sql = require('mssql');
const bcrypt = require('bcrypt');

module.exports = async function (context, req) {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        context.res = {
            status: 400,
            headers: { "Access-Control-Allow-Origin": "*" },  // ✅ Fix CORS
            body: { message: "Please provide username, password, and role." }
        };
        return;
    }

    try {
        await sql.connect(process.env.AzureSqlConnection);
        const result = await sql.query`SELECT * FROM Users WHERE username = ${username} AND role = ${role}`;

        if (result.recordset.length === 0) {
            context.res = {
                status: 401,
                headers: { "Access-Control-Allow-Origin": "*" },  // ✅ Fix CORS
                body: { message: "Invalid credentials." }
            };
            return;
        }

        const user = result.recordset[0];

        // 🔍 If passwords are stored in plain text, remove bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            context.res = {
                status: 401,
                headers: { "Access-Control-Allow-Origin": "*" },  // ✅ Fix CORS
                body: { message: "Invalid password." }
            };
            return;
        }

        context.res = {
            status: 200,
            headers: { "Access-Control-Allow-Origin": "*" },  // ✅ Fix CORS
            body: { success: true, role, redirectUrl: role === "DDHS" ? "ddhs_dashboard.html" : "phc_subcenter_dashboard.html" }
        };
    } catch (error) {
        context.res = {
            status: 500,
            headers: { "Access-Control-Allow-Origin": "*" },  // ✅ Fix CORS
            body: { message: "Server error: " + error.message }
        };
    }
};
