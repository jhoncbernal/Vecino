import BaseRepository from "./base.repository.js";
import { handleMongoError } from "../../utils/mongoErrorHandler.util.js";

class PackageRepository extends BaseRepository {
  constructor({ Package, eventBus }) {
    super(Package, eventBus);
    this.model = Package;
  }

  async getAllCouriers() {
    try {
      const couriers = await this.model.distinct("courier");

      // Create metadata
      const meta = {
        totalCarriers: couriers.length,
      };

      // Return both couriers and metadata
      return {
        couriers,
        meta,
      };
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }
}

export default PackageRepository;
