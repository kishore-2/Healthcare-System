const sql = require('mssql');

module.exports = async function (context, req) {
    try {
        await sql.connect(process.env.AzureSqlConnection);
        const result = await sql.query`SELECT * FROM ResourceRequests`;

        context.res = {
            status: 200,
            body: result.recordset
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: "Error retrieving resource requests: " + err.message
        };
    }
};