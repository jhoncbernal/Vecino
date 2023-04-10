const BaseService = require("./base.service");
const { generatePin } = require("../utils/generate.utils");

let _packageRepository,
  _userRepository = null;

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

  async create(pkg, sectionNumber, propertyNumber) {
    const users = await _userRepository.getUsersByPropertyInfo(
      sectionNumber,
      propertyNumber
    );
    if (!users) {
      throw new Error("No users found");
    }
    const userPackages = await _packageRepository.getPackagesByUserUuid(
      users[0].uuid
    );
    let pin = userPackages.length > 0 ? userPackages[0].pin : generatePin();
    const usersUuid = users.map((user) => {
      return { uuid: user.uuid };
    });
    const newPakage = {
      packageCode: pkg.packageCode,
      deliveryCompany: pkg.deliveryCompany,
      receivedBy: pkg.receivedBy,
      signature: pkg.signature,
      imageUrl: pkg.imageUrl,
      pin: pin,
      trackingNumber: pkg.trackingNumber,
      users: usersUuid,
      admin: users[0]?.admin,
    };
    return await _packageRepository.create(newPakage);
  }
}
module.exports = PackageService;
