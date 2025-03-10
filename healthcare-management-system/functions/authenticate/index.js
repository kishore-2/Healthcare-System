const sql = require('mssql');
const bcrypt = require('bcrypt');

module.exports = async function (context, req) {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        context.res = {
            status: 400,
            body: "Please provide username, password, and role."
        };
        return;
    }

    try {
        await sql.connect(process.env.AzureSqlConnection);
        const result = await sql.query`SELECT * FROM Users WHERE Username = ${username} AND Role = ${role}`;

        if (result.recordset.length === 0) {
            context.res = {
                status: 401,
                body: "Invalid credentials."
            };
            return;
        }

        const user = result.recordset[0];
        const passwordMatch = await bcrypt.compare(password, user.PasswordHash);

        if (!passwordMatch) {
            context.res = {
                status: 401,
                body: "Invalid credentials."
            };
            return;
        }

        context.res = {
            status: 200,
            body: "Authentication successful."
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: "Error authenticating user: " + err.message
        };
    }
};