const pool = require('../connection');

function createParent(parentData) {
    console.log(parentData);
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO parents set ?';
        pool.query(query, parentData, (error, results) => {
            if (error) {
                
                reject(error);
            } else {
                
                resolve(results);
            }
        });
    });
}

module.exports = {
    createParent,
};
