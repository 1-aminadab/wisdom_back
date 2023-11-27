const client = require('../connection');

function createParent(parentData) {
    console.log(parentData);

    return new Promise((resolve, reject) => {
        const columns = Object.keys(parentData).join(', ');
        const placeholders = Object.keys(parentData).map((_, i) => `$${i + 1}`).join(', ');

        const query = `INSERT INTO parents (${columns}) VALUES (${placeholders}) `;
        const values = Object.values(parentData);

        client.query(query, values, (error, results) => {
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
