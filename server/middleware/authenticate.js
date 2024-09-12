const jwt = require('jsonwebtoken');
const User = require('../model/userSchema')

const Authenticate = async( req,res, next) => {
    try {
        const token = req.cookies.jsonwebtoken;
        console.log('token:', token)
        const verifyToken = jwt.verify(token , process.env.SECRET_KEY);
        console.log('verifyToken', verifyToken)
        const rootUser = await User.findOne({_id : verifyToken._id ,'tokens.token' : token});
        console.log('user', rootUser)
        if(!rootUser){
            throw new Error('User Not Found');
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    } catch (error) {
        res.status(401).send('Unortherized : No Token Found');
        console.log(error);
    }
}

module.exports = Authenticate;