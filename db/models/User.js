const pool = require('../connection');
const {createTeacher} = require('../models/Teacher')
const {createParent} = require('../models/Parent')
function getUserByPhoneNumber(phoneNumber) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Users WHERE phoneNumber = ?';
        pool.query(query, [phoneNumber], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}
function checkUserExists(phoneNumber){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Users WHERE phoneNumber = ?';
        pool.query(query, [phoneNumber], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
function createUser(userData, otherData, userType) {

    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Users set ?';
        pool.query(query, userData, (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results.insertId);
                const userID = results.insertId
                if(userType === "parent") {
                    createParent({...otherData,user_id:userID})
                    resolve(results);
                }
                if(userType === "teacher") {
                    createTeacher({...otherData,user_id:userID})
                    resolve(results);
                }
                
            }
        });
    });
}


module.exports = {
    getUserByPhoneNumber,
    createUser,
    checkUserExists
};
