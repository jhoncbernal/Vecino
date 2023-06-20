import BaseService from "./base.service.js";
class RecidentialUnitService extends BaseService {
  constructor({ RecidentialUnitRepository }) {
    super(RecidentialUnitRepository);
    this.repository = RecidentialUnitRepository;
  }
  async getUsersRecidentialUnit(id, query, ability) {
    try {
      const result = await this.repository.getUsersRecidentialUnit(
        id,
        query,
        ability
      );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getByUnitNumber(unitNumber, pageNumber, pageSize, ability) {
    try {
      const result = await this.repository.getByUnitNumber(
        unitNumber,
        pageNumber,
        pageSize,
        ability
      );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default RecidentialUnitService;
