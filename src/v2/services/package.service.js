import BaseService from "./base.service.js";
class PackageService extends BaseService {
  constructor({ PackageRepository }) {
    super(PackageRepository);
    this.repository = PackageRepository;
  }
}

export default PackageService;
