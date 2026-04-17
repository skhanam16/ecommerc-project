import { UnauthenticatedError, UnauthorizedError, BadRequestError } from '../errors/customError.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser =  (req, res, next) =>{
    // console.log(req.cookies);
    const {token} = req.cookies;
    if(!token) throw new UnauthenticatedError("authentication invalid");
    try {
        const {userId, role} = verifyJWT(token);
        const testUser = userId  === '69daec4d241c3a487614f0bd';
        req.user = {userId, role, testUser};
      next();    
    } catch (error) {
        throw new UnauthenticatedError("authentication invalid");
    }
   
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user?.testUser) {
    throw new BadRequestError('Demo user, read only');
  }
  next();
}