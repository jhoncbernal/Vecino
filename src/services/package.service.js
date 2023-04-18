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

  async updatePackageStatusByPIN(pin, signature, status) {
    return await _packageRepository.updatePackageStatusByPIN(
      pin,
      signature,
      status
    );
  }

  async getAllByAdmin(pageSize, pageNum, adminUuid) {
    return await _packageRepository.getAllByAdmin(pageSize, pageNum, adminUuid);
  }

  async create(pkg, sectionNumber, propertyNumber) {
    let result;
    if (!(propertyNumber && sectionNumber) && pkg.kind === "utilities") {
      result = await _userRepository.getAllUsersByAdminGroupByPropertyInfo(
        pkg.adminUuid
      );
      if (!result || result.length === 0) {
        throw new Error("No users found");
      }
      await result.map(async (user) => {
        const userPackages = await _packageRepository.getPackagesByUserUuid(
          user.usersUUIDs[0].uuid
        );
        let pin = userPackages.length > 0 ? userPackages[0].pin : generatePin();

        const newPakage = {
          receivedBy: pkg.receivedBy,
          pin: pin,
          users: user.usersUUIDs,
          admin: user.propertyInfo.admin,
          sectionNumber: user.propertyInfo.sectionNumber,
          propertyNumber: user.propertyInfo.propertyNumber,
          kind: pkg.kind,
          utility: pkg.utility,
        };
        return await _packageRepository.create(newPakage);
      });
    } else {
      result = await _userRepository.getUsersByPropertyInfo(
        sectionNumber,
        propertyNumber
      );
      if (!result || result.length === 0) {
        throw new Error("No users found");
      }
      const userPackages = await _packageRepository.getPackagesByUserUuid(
        result[0].uuid
      );
      let pin = userPackages.length > 0 ? userPackages[0].pin : generatePin();
      const usersUuid = result.map((user) => {
        return { uuid: user.uuid };
      });
      const newPakage = {
        packageCode: pkg.packageCode,
        deliveryCompany: pkg.deliveryCompany,
        receivedBy: pkg.receivedBy,
        signature: pkg.signature,
        imageUrl: pkg?.imageUrl,
        pin: pin,
        trackingNumber: pkg.trackingNumber,
        users: usersUuid,
        admin: result[0]?.admin,
        sectionNumber: sectionNumber,
        propertyNumber: propertyNumber,
        kind: pkg.kind,
      };
      return await _packageRepository.create(newPakage);
    }
  }

  async getAllDeliveryCompanies() {
    return await _packageRepository.getAllDeliveryCompanies();
  }
}
module.exports = PackageService;
