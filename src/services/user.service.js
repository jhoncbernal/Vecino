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
        return await this.repository.getUsersByPoints(pageSize,pageNum);
    }
    async getUsersByPoints(pageSize,pageNum){
        return await this.repository.getUsersByPoints(pageSize,pageNum);
    }
}
module.exports = UserService;