const User = require('../../models/userModel');
const {createTeacher }= require('./Teacher');
const {createParent }= require('./Parent');

async function getUserByPhoneNumber(phoneNumber) {
    try {
        const user = await User.findOne({ phoneNumber });
        return user;
    } catch (error) {
        throw error;
    }
}

async function checkUserExists(phoneNumber) {
    try {
        const users = await User.find({ phoneNumber });
        return users;
    } catch (error) {
        throw error;
    }
}

async function createUser(userData, otherData, userType) {
    try {
        const newUser = await User.create(userData);

        if (userType === 'parent') {
            await createParent({ ...otherData, userId: newUser._id });
        } else if (userType === 'teacher') {
            await createTeacher({ ...otherData, userId: newUser._id });
        }

        return newUser;
    } catch (error) {
        throw error;
    }
}
async function deleteUser(userId){
    try{
            await User.deleteOne({_id:userId})
            console.log('deleted successfuly');
    }catch(error){
        console.log('Error deleting message:', error);
    }
}

module.exports = {
    getUserByPhoneNumber,
    createUser,
    checkUserExists,
    deleteUser
};
