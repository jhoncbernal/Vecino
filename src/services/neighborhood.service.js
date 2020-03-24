const BaseService = require('./base.service')
let _neighborhoodRepository = null;
class NeighborhoodService extends BaseService {
    constructor({ NeighborhoodRepository }) {
        super(NeighborhoodRepository);
        _neighborhoodRepository = NeighborhoodRepository;
    }
    async getNeighborhoodByNeighborhoodcode(neighborhoodcode){
        return await _neighborhoodRepository.getNeighborhoodByNeighborhoodcode(neighborhoodcode);
    }
    async getNeighborhoodByUsername(username){
        return await _neighborhoodRepository.getNeighborhoodByUsername(username);
    }
    async getNeighborhoodByProperty(propName,value){
        return await _neighborhoodRepository.getNeighborhoodByProperty(propName,value);
    }
    async recover(propName, value){
        return await _neighborhoodRepository.recover(propName, value);
    }
    async reset(token){
        return await _neighborhoodRepository.reset(token);
    }
    async resetPassword(token){
        return await _neighborhoodRepository.resetPassword(token);
    }
    async verifyEmail(token){
        return await _neighborhoodRepository.verifyEmail(token);
    }
    async verify(token){
        return await _neighborhoodRepository.verify(token);
    }
}
module.exports = NeighborhoodService;