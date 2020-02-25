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
    async getUsersByPoints(pageSize,pageNum){
        return await _userRepository.getUsersByPoints(pageSize,pageNum);
    }
    async getUsersByPoints(pageSize,pageNum){
        return await _userRepository.getUsersByPoints(pageSize,pageNum);
    }
    async recover(body,host){
        return await _userRepository.recover(body,host);
    }
    async reset(token){
        return await _userRepository.reset(token);
    }
    async resetPassword(token,body){
        return await _userRepository.resetPassword(token,body);
    }
}
module.exports = UserService;