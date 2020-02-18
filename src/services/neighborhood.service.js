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
    async getNeighborhoodByNeighborhoodname(neighborhoodname){
        return await _neighborhoodRepository.getNeighborhoodByNeighborhoodname(neighborhoodname);
    }
}
module.exports = NeighborhoodService;