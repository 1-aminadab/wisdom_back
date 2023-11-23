const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');
const { getUserByPhoneNumber } = require('../db/models/User');

function getTokenFromRequest(req) {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return null;
}
function refreshToken(req, res, next) {
    try {
        
        const token = getTokenFromRequest(req)
        
        if(!token) return res.staus(400).json({error: 'Unauthorized'})
        
        jwt.verify(token, secretKey, (err, user)=>{
            if(err) return res.status(400).json({error: "Couden't find token"});
        
        res.clearCookie(user);
        req.cookies[user = {}]
        const newToken = jwt.sign({user}, secretKey, {expiresIn:"30s"})
        res.cookie('accessToken', newToken,{httpOnly:true})   
    })
    next()
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}
function authenticateUser(req, res, next) {
    try {
        const token = getTokenFromRequest(req);
        const decoded = jwt.verify(token, secretKey).user;
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
}
function getUser(req, res) {
    const user = req.user
    try {
        delete user.password
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({error:"Enternal server error"})
    }
}
function authorizeRoles(allowedRoles) {
    return async (req, res, next) => {
        try {
            const user = await getUserByPhoneNumber(req.user.username);
            const userRoles = user.user_type;

            if (allowedRoles.some(role => userRoles === role)) {
                next();
            } else {
                res.status(403).json({ error: 'Forbidden' });
            }
        } catch (error) {
            
            console.error('Authorization error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

module.exports = {
    getTokenFromRequest,
    authenticateUser,
    authorizeRoles,
    refreshToken,
    getUser
};
