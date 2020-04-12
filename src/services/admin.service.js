const BaseService = require('./base.service')
let _adminRepository = null;
class AdminService extends BaseService {
    constructor({ AdminRepository }) {
        super(AdminRepository);
        _adminRepository = AdminRepository;
    }

    async getAdminByuniquecode(uniquecode) {
        return await _adminRepository.getAdminByuniquecode(uniquecode);
    }

    async getAdminByUsername(username) {
        return await _adminRepository.getAdminByUsername(username);
    }

    async getAdminByProperty(propName, value) {
        return await _adminRepository.getAdminByProperty(propName, value);
    }

    async getAllAdminNames(pageSize, pageNum) {
        return await _adminRepository.getAllAdminNames(pageSize, pageNum);
    }

    async recover(propName, value) {
        return await _adminRepository.recover(propName, value);
    }

    async reset(token) {
        return await _adminRepository.reset(token);
    }

    async resetPassword(token) {
        return await _adminRepository.resetPassword(token);
    }

    async verifyEmail(token) {
        return await _adminRepository.verifyEmail(token);
    }

    async verify(token) {
        return await _adminRepository.verify(token);
    }
}
module.exports = AdminService;