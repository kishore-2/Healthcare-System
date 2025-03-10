const sql = require('mssql');

module.exports = async function (context, req) {
    const { doctor_id, doctor_name, status } = req.body;

    if (!doctor_id || !doctor_name || !status) {
        context.res = {
            status: 400,
            body: "Please provide doctor_id, doctor_name, and status."
        };
        return;
    }

    try {
        await sql.connect(process.env.AzureSqlConnection);
        await sql.query`INSERT INTO DoctorAttendance (DoctorID, DoctorName, Status) VALUES (${doctor_id}, ${doctor_name}, ${status})`;

        context.res = {
            status: 200,
            body: "Attendance submitted successfully."
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: "Error inserting attendance record: " + err.message
        };
    }
};