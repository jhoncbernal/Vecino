const {generateToken}=require('../helpers/jwt.helper');
let _userService=null;
let _neighborhoodRepository = null;

class AuthService{
constructor({UserService,NeighborhoodRepository }){
    _userService=UserService;
    _neighborhoodRepository = NeighborhoodRepository;
}
async signUp(user){
    const {neighborhoodcode}=user;
    const neighborhoodExist= await _neighborhoodRepository.getNeighborhoodByNeighborhoodcode(neighborhoodcode);
    if (!neighborhoodExist){
        const error = new Error();
        error.status=401;
        error.message= "Neighborhoodcode does not exist";
        throw error;
    }
    const {username}=user;
    const userExist= await _userService.getUserByUsername(username);
    if (userExist){
        const error = new Error();
        error.status=401;
        error.message= "User already exists";
        throw error;
    }
    return await _userService.create({...user,neighborhood:neighborhoodExist._id});
    }
    async signIn(user){
        const {username,password}=user;
        const userExist= await _userService.getUserByUsername(username);
        if (!userExist){
            const error = new Error();
            error.status=400;
            error.message= "User does not exist";
            throw error;
        }
        const validPassword=userExist.comparePasswords(password);
        if (!validPassword){
            const error = new Error();
            error.status=400;
            error.message= "Invalid Password";
            throw error;
        }
        const userToEncode={
            username:userExist.username,
            id:userExist._id
        };
        const token =generateToken(userToEncode);

        return {token, user:userExist};

    }
    async signUpNeighborhood(neighborhood){
        const {neighborhoodname}=neighborhood;
        const neighborhoodExist= await _neighborhoodRepository.getNeighborhoodByNeighborhoodname(neighborhoodname);
        if (neighborhoodExist){
            const error = new Error();
            error.status=401;
            error.message= "Neighborhood already exists";
            throw error;
        }
        return await _neighborhoodRepository.create(neighborhood);
        }
        async signInNeighborhood(neighborhood){
            const {neighborhoodname,password}=neighborhood;
            const neighborhoodExist= await _neighborhoodRepository.getNeighborhoodByNeighborhoodname(neighborhoodname);
            if (!neighborhoodExist){
                const error = new Error();
                error.status=400;
                error.message= "neighborhood does not exist";
                throw error;
            }
            const validPassword=neighborhoodExist.comparePasswords(password);
            if (!validPassword){
                const error = new Error();
                error.status=400;
                error.message= "Invalid Password";
                throw error;
            }
            const neighborhoodToEncode={
                neighborhoodname:neighborhoodExist.neighborhoodname,
                id:neighborhoodExist._id
            };
            const token =generateToken(neighborhoodToEncode);
    
            return {token, neighborhood:neighborhoodExist};
    
        }
}
module.exports=AuthService;