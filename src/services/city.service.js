const BaseService = require("./base.service");
class CityService extends BaseService {
  constructor({ CityRepository }) {
    super(CityRepository);
    this.cityRepository = CityRepository;
    this.getCityByCode = this.getCityByCode.bind(this);
    this.getCityByName = this.getCityByName.bind(this);
    this.getCitiesByStateCode = this.getCitiesByStateCode.bind(this);
    this.getCitiesByStateName = this.getCitiesByStateName.bind(this);
    this.getAll = this.getAll.bind(this);
  }
  async getCityByName(name) {
    return this.cityRepository.getCityByName(name);
  }
  async getCityByCode(code) {
    return this.cityRepository.getCityByCode(code);
  }
  async getCitiesByStateCode(state, pageSize, pageNum) {
    return this.cityRepository.getCitiesByStateCode(state, pageSize, pageNum);
  }
  async getCitiesByStateName(state, pageSize, pageNum) {
    return this.cityRepository.getCitiesByStateName(state, pageSize, pageNum);
  }
  async getAll(findby,pageSize, pageNum) {
    return this.cityRepository.getAll(findby,pageSize, pageNum);
  }
}
module.exports = CityService;
