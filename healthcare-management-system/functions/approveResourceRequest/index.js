require('dotenv').config();
const sql = require('mssql');

module.exports = async function (context, req) {
    const { requestId, status } = req.body;

    if (!requestId || !status) {
        context.res = {
            status: 400,
            body: { message: "Please provide requestId and status." }
        };
        return;
    }

    try {
        await sql.connect(process.env.AzureSqlConnection);
        await sql.query`UPDATE ResourceRequests SET status = ${status} WHERE request_id = ${requestId}`;

        context.res = {
            status: 200,
            body: { message: "Resource request updated successfully." }
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: { message: "Error updating resource request: " + err.message }
        };
    }
};