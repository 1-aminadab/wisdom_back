const Teacher = require('../../models/teacherModel');


/**
 * Creates a new teacher record in the database.
 * @param {Object} teacherData - The data for the teacher.
 * @returns {Promise} A promise that resolves with the created teacher document.
 */
async function createTeacher(teacherData) {
    const age = calculateAge(teacherData.birthDate);
    teacherData = { ...teacherData, age };

    try {
        const createdTeacher = await Teacher.create(teacherData);
        return createdTeacher;
    } catch (error) {
       await deleteUser(teacherData.userId)
        throw error;
    }
}

/**
 * Calculates the age based on the provided birth date.
 * @param {string} birthDate - The birth date of the individual.
 * @returns {number} The calculated age.
 */
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