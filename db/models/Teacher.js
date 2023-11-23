const pool = require('../connection');

function createTeacher(teacherData) {
   const age = calculateAge(teacherData.birthDate)
   teacherData = {...teacherData,age}

    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO teachers set ?';
        pool.query(query, teacherData, (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results.insertId);
                
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
    if (currentDate.getMonth() < birth.getMonth() || 
        (currentDate.getMonth() === birth.getMonth() && currentDate.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

module.exports = {
    createTeacher,
};
