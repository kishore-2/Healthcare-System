require('dotenv').config();
const sql = require('mssql');

module.exports = async function (context, req) {
    const { itemName, quantity } = req.body;

    if (!itemName || !quantity) {
        context.res = {
            status: 400,
            body: { message: "Please provide itemName and quantity." }
        };
        return;
    }

    try {
        await sql.connect(process.env.AzureSqlConnection);
        await sql.query`INSERT INTO ResourceRequests (item_name, quantity, requester) VALUES (${itemName}, ${quantity}, 'PHC')`;

        context.res = {
            status: 200,
            body: { message: "Resource request submitted successfully." }
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: { message: "Error submitting resource request: " + err.message }
        };
    }
};