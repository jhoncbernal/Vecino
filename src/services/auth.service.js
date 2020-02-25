const { generateToken, generateTokenAdmin, generateTokenOwner } = require('../helpers/jwt.helper');
const { SECRET_OWNER } = require('../config');
let _userService = null;
let _neighborhoodRepository = null;

class AuthService {
    constructor({ UserService, NeighborhoodRepository }) {
        _userService = UserService;
        _neighborhoodRepository = NeighborhoodRepository;
    }
    async signUp(user) {
        const { neighborhoodcode } = user;
        const neighborhoodExist = await _neighborhoodRepository.getNeighborhoodByNeighborhoodcode(neighborhoodcode);
        if (!neighborhoodExist) {
            const error = new Error();
            error.status = 401;
            error.message = "Neighborhoodcode does not exist";
            throw error;
        }
        const { username } = user;
        const userExist = await _userService.getUserByUsername(username);
        if (userExist) {
            const error = new Error();
            error.status = 401;
            error.message = "User already exists";
            throw error;
        }
        return await _userService.create({ ...user, neighborhood: neighborhoodExist._id });
    }
    async signIn(user) {
        const { username, password, secretKey } = user;
        const userExist = await _userService.getUserByUsername(username);
        const neighborhoodExist = await _neighborhoodRepository.getNeighborhoodByNeighborhoodname(username);
        let validPassword;
        let result,token;
        if (!userExist && !neighborhoodExist) {
            const error = new Error();
            error.status = 400;
            error.message = "User does not exist";
            throw error;
        }
        if (userExist) {
            validPassword = userExist.comparePasswords(password);
            if (userExist.roles.includes("ROLE_USER_ACCESS")&&validPassword) {
                const userToEncode = {
                    username: userExist.username,
                    id: userExist._id
                };
                token = generateToken(userToEncode);             
            }
            if (userExist.roles.includes("ROLE_OWNER_ACCESS") && secretKey&&validPassword) {
                if (secretKey != SECRET_OWNER) {
                    const error = new Error();
                    error.status = 400;
                    error.message = "Invalid secretKey";
                    throw error;
                }
                const userToEncode = {
                    username: userExist.username,
                    id: userExist._id
                };
                token = generateTokenOwner(userToEncode);
            }
            result=  { token, user: userExist }
        }
        if (neighborhoodExist) {
            validPassword = neighborhoodExist.comparePasswords(password);
            if (neighborhoodExist.roles.includes("ROLE_ADMINISTRATION_ACCESS")&&validPassword) {
                const neighborhoodToEncode = {
                    username: neighborhoodExist.neighborhoodname,
                    id: neighborhoodExist._id
                };
                token = generateTokenAdmin(neighborhoodToEncode);
            }
            result=  { token, neighborhood: neighborhoodExist }
        }
        if (!validPassword) {
            const error = new Error();
            error.status = 400;
            error.message = "Invalid Password";
            throw error;
        }
        if (!token) {
            const error = new Error();
            error.status = 400;
            error.message = "Validate user role access";
            throw error;
        }
        return result;
    }
    async signUpNeighborhood(neighborhood) {
        const { neighborhoodname } = neighborhood;
        const neighborhoodExist = await _neighborhoodRepository.getNeighborhoodByNeighborhoodname(neighborhoodname);
        if (neighborhoodExist) {
            const error = new Error();
            error.status = 401;
            error.message = "Neighborhood already exists";
            throw error;
        }
        return await _neighborhoodRepository.create(neighborhood);
    }
    async recover(body,host){
        return await _userService.recover(body,host);
    }
    async reset(token){
        return await _userService.reset(token);
    }
    async resetPassword(token,body){
        return await _userService.resetPassword(token,body);
    }
}
module.exports = AuthService;