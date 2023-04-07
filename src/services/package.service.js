const BaseService = require("./base.service");
let _packageRepository, _userRepository = null;

class PackageService extends BaseService {
  constructor({ PackageRepository, UserRepository }) {
    super(PackageRepository);
    _packageRepository = PackageRepository;
    _userRepository = UserRepository;
  }
  async getPackageByPin(pin) {
    return await _packageRepository.getPackageByPin(pin);
  }
  async getPackageByPackageCode(packageCode) {
    return await _packageRepository.getPackageByPackageCode(packageCode);
  }
  async getPackagesByUserUuid(userUuid) {
    return await _packageRepository.getPackagesByUserUuid(userUuid);
  }
  async getUsersAndPackagesByPin(pin) {
    return await _packageRepository.getUsersAndPackagesByPin(pin);
  }

  async getUsersBasicInfoByUuids(userUuid) {
    return await _userRepository.getUsersBasicInfoByUuids(userUuid);
  }
}
module.exports = PackageService;
