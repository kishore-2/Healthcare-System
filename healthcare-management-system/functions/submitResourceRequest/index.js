const sql = require('mssql');

module.exports = async function (context, req) {
    const { item_name, quantity, requester } = req.body;

    if (!item_name || !quantity || !requester) {
        context.res = {
            status: 400,
            body: "Please provide item_name, quantity, and requester."
        };
        return;
    }

    try {
        await sql.connect(process.env.AzureSqlConnection);
        await sql.query`INSERT INTO ResourceRequests (ItemName, Quantity, Requester) VALUES (${item_name}, ${quantity}, ${requester})`;

        context.res = {
            status: 200,
            body: "Resource request submitted successfully."
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: "Error submitting resource request: " + err.message
        };
    }
};