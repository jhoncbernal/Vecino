const BaseService = require('./base.service')
let _userRepository = null;

class UserService extends BaseService {
    constructor({ UserRepository}) {
        super(UserRepository);
        _userRepository = UserRepository;
    }
    async getUserByUsername(username){
        return await _userRepository.getUserByUsername(username);
    }
    async getUserByProperty(propName,value){
        return await _userRepository.getUserByProperty(propName,value);
    }
    async getUsersByPoints(pageSize,pageNum){
        return await _userRepository.getUsersByPoints(pageSize,pageNum);
    }
    async getUsersByPoints(propName, value){
        return await _userRepository.getUsersByPoints(propName, value);
    }
    async recover(body){
        return await _userRepository.recover(body);
    }
    async reset(token){
        return await _userRepository.reset(token);
    }
    async resetPassword(token){
        return await _userRepository.resetPassword(token);
    }
    async verifyEmail(token){
        return await _userRepository.verifyEmail(token);
    }
    async verify(token){
        return await _userRepository.verify(token);
    }
}
module.exports = UserService;