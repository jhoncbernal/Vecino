const BaseService = require('./base.service')
let _providerRepository = null;
class ProviderService extends BaseService {
    constructor({ ProviderRepository }) {
        super(ProviderRepository);
        _providerRepository = ProviderRepository;
    }

    async getProviderByuniquecode(uniquecode) {
        return await _providerRepository.getProviderByuniquecode(uniquecode);
    }

    async getProviderByUsername(username) {
        return await _providerRepository.getProviderByUsername(username);
    }

    async getProviderByProperty(propName, value) {
        return await _providerRepository.getProviderByProperty(propName, value);
    }

    async getAllProviderNames(city,pageSize, pageNum) {
        return await _providerRepository.getAllProviderNames(city,pageSize, pageNum);
    }

    async recover(propName, value) {
        return await _providerRepository.recover(propName, value);
    }

    async reset(token) {
        return await _providerRepository.reset(token);
    }

    async resetPassword(token) {
        return await _providerRepository.resetPassword(token);
    }

    async verifyEmail(token) {
        return await _providerRepository.verifyEmail(token);
    }

    async verify(token) {
        return await _providerRepository.verify(token);
    }
}
module.exports = ProviderService;