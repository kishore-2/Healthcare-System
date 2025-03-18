require('dotenv').config();
const sql = require('mssql');

module.exports = async function (context, req) {
    const { doctorId, doctorName, status } = req.body;

    if (!doctorId || !doctorName || !status) {
        context.res = {
            status: 400,
            body: { message: "Please provide doctorId, doctorName, and status." }
        };
        return;
    }

    try {
        await sql.connect(process.env.AzureSqlConnection);
        await sql.query`INSERT INTO DoctorAttendance (doctor_id, doctor_name, status) VALUES (${doctorId}, ${doctorName}, ${status})`;

        context.res = {
            status: 200,
            body: { message: "Attendance submitted successfully." }
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: { message: "Error submitting attendance: " + err.message }
        };
    }
};