const pool = require('../connection');

function createStudent(userData) {
    console.log(userData)

    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Students (user_id, parent_id, student_age, student_grade, student_gender) VALUES (?, ?, ?, ?, ?)';
        pool.query(query, [user_id, parent_id, student_age, student_grade, student_gender], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
function updateStudent(userData) {
    console.log();
}

module.exports = {
    createStudent,
};
