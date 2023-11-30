const Parent = require('../../models/parentModel');

/**
 * Creates a new parent record in the database.
 * @param {Object} parentData - The data for the parent.
 * @returns {Promise} A promise that resolves with the created parent document.
 */
async function createParent(parentData) {
    console.log(parentData);

    try {
        const createdParent = await Parent.create(parentData);
        return createdParent;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createParent,
};