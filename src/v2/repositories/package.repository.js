import BaseRepository from "./base.repository.js";

class PackageRepository extends BaseRepository {
  constructor({ Package }) {
    super(Package);
    this.model = Package;
  }
}

export default PackageRepository;
