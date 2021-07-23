import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = {message : 'Authentication Error'};


//모든 요청에 대해 확인한 후, 검증을 하고 사용자를 찾아줌
export const isAuth = async (req,res,next) => {
    const authHeader = req.get('Authorization');
    if(!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    //TO DO : Make it Secure!
    jwt.verify(
        token,
        'afdglfSDflda;hffhDfhlHDLf', //secret key.
        async (error,decoded) => {
            if(error) {
                res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepository.findById(decoded.id);
            if(!user){
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id; //req.customData 
            next();
        }
    );
};