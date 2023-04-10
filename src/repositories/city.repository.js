const BaseRepository = require("./base.repository");
class CityRepository extends BaseRepository {
  constructor({ City }) {
    super(City);
    this.city = City;
    this.getCityByName = this.getCityByName.bind(this);
    this.getCityByCode = this.getCityByCode.bind(this);
    this.getCitiesByStateName = this.getCitiesByStateName.bind(this);
    this.getCitiesByStateCode = this.getCitiesByStateCode.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async getCityByName(name) {
    return await this.city
      .findOne({ name: { $regex: new RegExp(name, "i") } })
      .collation({ locale: "es", strength: 1 });
  }

  async getCityByCode(code) {
    return await this.city.findOne({ code: code });
  }

  async getCitiesByStateName(name, pageSize, pageNum) {
    return await this.city
      .find({ stateName: name })
      .collation({ locale: "es", strength: 1 })
      .skip(pageSize * (pageNum - 1))
      .limit(pageSize);
  }

  async getCitiesByStateCode(code, pageSize, pageNum) {
    return await this.city
      .find({ stateCode: code })
      .skip(pageSize * (pageNum - 1))
      .limit(pageSize);
  }

  async getAll(findby, pageSize, pageNum) {
    const { code, name, stateCode, stateName } = findby;
    return await this.city
      .find({
        $or: [
          { code: code },
          { name: name },
          { stateCode: stateCode },
          { stateName: stateName },
        ],
      })
      .collation({ locale: "es", strength: 1 })
      .skip(pageSize * (pageNum - 1))
      .limit(pageSize);
  }
}
module.exports = CityRepository;
