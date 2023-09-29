import BaseService from "./base.service.js";
class PackageService extends BaseService {
  constructor({ PackageRepository, mailer }) {
    super(PackageRepository);
    this.repository = PackageRepository;
    this.mailer = mailer;
  }

  async getAllCouriers() {
    const couriers = await this.repository.getAllCouriers();
    return couriers;
  }
}

export default PackageService;
