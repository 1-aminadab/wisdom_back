const client = require('../connection');
const { createTeacher } = require('../models/Teacher');
const { createParent } = require('../models/Parent');



function getUserByPhoneNumber(phoneNumber) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Users WHERE phoneNumber = $1';
        client.query(query, [phoneNumber], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows[0]);
            }
        });
    });
}

function checkUserExists(phoneNumber) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Users WHERE phoneNumber = $1';
        client.query(query, [phoneNumber], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows);
            }
        });
    });
}

function createUser(userData, otherData, userType) {
    const columns = Object.keys(userData).join(', ');
    const placeholders = Object.keys(userData).map((_, i) => `$${i + 1}`).join(', ');

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Users (${columns}) VALUES (${placeholders}) RETURNING userId`; // Adjust the column name here
        const values = Object.values(userData);

        client.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                const userID = results.rows[0].userid; // Adjust the column name here
                console.log(results);
                
                if (userType === 'parent') {
                    createParent({ ...otherData, userId: userID });
                    resolve(results);
                }
                if (userType === 'teacher') {
                    createTeacher({ ...otherData, userId: userID });
                    resolve(results);
                }
            }
        });
    });
}


module.exports = {
    getUserByPhoneNumber,
    createUser,
    checkUserExists,
};
