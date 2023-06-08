import BaseRepository from "./base.repository.js";

class PackageRepository extends BaseRepository {
  constructor({ Package, eventBus }) {
    super(Package, eventBus);
    this.model = Package;
  }
}

export default PackageRepository;
