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
    async updateUserPoints(propName,value){
        return await _userRepository.updateUserPoints(propName,value);
    }
    async getUsersByPoints(propName, value,pageSize,pageNum){
        return await _userRepository.getUsersByPoints(propName, value,pageSize,pageNum);
    }
    async recover(propName, value){
        return await _userRepository.recover(propName, value);
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
    async addNewUserRole(userId,role){
        return await _userRepository.addNewUserRole(userId,role);
    }
    async deleteUserRole(userId,role){
        return await _userRepository.deleteUserRole(userId,role);
    }
}
module.exports = UserService;