const client = require('../connection');

function createTeacher(teacherData) {
    const age = calculateAge(teacherData.birthDate);
    teacherData = { ...teacherData, age };

    return new Promise((resolve, reject) => {
        const columns = Object.keys(teacherData).join(', ');
        const placeholders = Object.keys(teacherData).map((_, i) => `$${i + 1}`).join(', ');

        const query = `INSERT INTO teachers (${columns}) VALUES (${placeholders}) `;
        const values = Object.values(teacherData);

        client.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
function calculateAge(birthDate) {
    const currentDate = new Date();
    const birth = new Date(birthDate);

    let age = currentDate.getFullYear() - birth.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
        currentDate.getMonth() < birth.getMonth() ||
        (currentDate.getMonth() === birth.getMonth() && currentDate.getDate() < birth.getDate())
    ) {
        age--;
    }

    return age;
}

module.exports = {
    createTeacher,
};
