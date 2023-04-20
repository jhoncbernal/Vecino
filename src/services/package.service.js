const BaseService = require("./base.service");
const { generatePin } = require("../utils/generate.utils");
const { sendEmail } = require("../helpers");

let _packageRepository,
  _userRepository = null;

class PackageService extends BaseService {
  constructor({ PackageRepository, UserRepository }) {
    super(PackageRepository);
    _packageRepository = PackageRepository;
    _userRepository = UserRepository;
  }
  async getPackageByPin(pin) {
    const { usersUuids, packageCodes } =
      await _packageRepository.getUsersAndPackagesByPin(pin);
    if (
      !usersUuids ||
      usersUuids.length === 0 ||
      !packageCodes ||
      usersUuids.length === 0
    ) {
      throw new Error(`Package not found using the pin ${pin}`);
    }
    const users = await _userRepository.getUsersBasicInfoByUuids(usersUuids);
    const usersInfo = this.mapPackageToResponse(users);
    if (packageCodes && users && usersInfo) {
      return { packageCodes, ...usersInfo };
    } else {
      throw new Error("Package not found");
    }
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
    const { users } = await this.getPackageByPin(pin);
    const emailObjects = this.createEmailInfo(
      users,
      { PIN: pin, signature: signature },
      "deliver"
    );

    const result = await _packageRepository.updatePackageStatusByPIN(
      pin,
      signature,
      status
    );
    this.sendAllEmails([emailObjects]);
    return result;
  }

  async getAllByAdmin(pageSize, pageNum, adminUuid) {
    return await _packageRepository.getAllByAdmin(pageSize, pageNum, adminUuid);
  }

  async create(pkg, sectionNumber, propertyNumber) {
    const emailObjects = [];
    const finalResult = [];

    if (!(propertyNumber && sectionNumber) && pkg.kind === "utilities") {
      const usersByAdminGroup =
        await _userRepository.getAllUsersByAdminGroupByPropertyInfo(
          pkg.adminUuid
        );
      if (!usersByAdminGroup || usersByAdminGroup.length === 0) {
        throw new Error("No users found");
      }

      await Promise.all(
        usersByAdminGroup.map(async (user) => {
          const userPackages = await _packageRepository.getPackagesByUserUuid(
            user.usersUUIDs[0].uuid
          );
          const pin =
            userPackages.length > 0 ? userPackages[0].pin : generatePin();
          const newPackage = this.createNewPackage(user, pkg, pin);

          const createdPackage = await _packageRepository.create(newPackage);
          finalResult.push(createdPackage);

          const emailInfo = this.createEmailInfo(user, { PIN: pin });
          emailObjects.push(emailInfo);
        })
      );
    } else {
      const usersByPropertyInfo = await _userRepository.getUsersByPropertyInfo(
        sectionNumber,
        propertyNumber
      );

      if (!usersByPropertyInfo || usersByPropertyInfo.length === 0) {
        throw new Error("No users found");
      }

      const userPackages = await _packageRepository.getPackagesByUserUuid(
        usersByPropertyInfo[0].uuid
      );
      const pin = userPackages.length > 0 ? userPackages[0].pin : generatePin();
      const newPackage = this.createNewPackage(
        usersByPropertyInfo[0],
        pkg,
        pin
      );

      const createdPackage = await _packageRepository.create(newPackage);
      finalResult.push(createdPackage);

      const emailInfo = this.createEmailInfo(usersByPropertyInfo, { PIN: pin });
      emailObjects.push(emailInfo);
    }

    this.sendAllEmails(emailObjects);

    return finalResult;
  }

  async getAllDeliveryCompanies() {
    return await _packageRepository.getAllDeliveryCompanies();
  }

  createNewPackage(user, pkg, pin) {
    const commonData = {
      receivedBy: pkg.receivedBy,
      pin,
      users: user.usersUUIDs || [{ uuid: user.uuid }],
      admin: user.propertyInfo.admin || [user.admin],
      sectionNumber: user.propertyInfo.sectionNumber,
      propertyNumber: user.propertyInfo.propertyNumber,
      kind: pkg.kind,
    };

    if (pkg.kind === "utilities") {
      return {
        ...commonData,
        utility: pkg.utility,
      };
    }

    return {
      ...commonData,
      packageCode: pkg.packageCode,
      deliveryCompany: pkg.deliveryCompany,
      signature: pkg.signature,
      imageUrl: pkg?.imageUrl,
      trackingNumber: pkg.trackingNumber,
    };
  }

  createEmailInfo(users, replacements, templateType = "new") {
    let emails = [];
    if (Array.isArray(users)) {
      users.forEach((user) => {
        emails.push(user.email);
      });
    } else {
      emails = users.users.map((user) => user.email);
    }

    const userInfo = {
      firstName: "",
      email: emails.join(";"),
    };
    const subject = `${
      templateType === "new" ? "Nuevo pedido recibido " : "Pedido entregado "
    } # ${replacements?.PIN}`;
    const templateData = replacements;
    const template = `../public/pages/${
      templateType === "new" ? "newPackage" : "packagesDeliver"
    }.html`;

    return {
      user: userInfo,
      subject: subject,
      text: "",
      htmlpath: template,
      objectReplacement: templateData,
    };
  }

  async sendAllEmails(emailObjects) {
    for (const emailInfo of emailObjects) {
      await sendEmail(
        emailInfo.user,
        emailInfo.subject,
        emailInfo.text,
        emailInfo.htmlpath,
        emailInfo.objectReplacement
      );
    }
  }

  mapPackageToResponse(users) {
    return users.reduce((acc, user) => {
      const userObj = {
        name: `${user.firstName} ${user.lastName}`,
        uuid: user.uuid,
        email: user.email,
      };

      if (!acc.propertyInfo) {
        acc.propertyInfo = user.propertyInfo;
        acc.admin_uuid = user.admin.uuid;
        acc.users = [userObj];
      } else {
        acc.users.push(userObj);
      }

      return acc;
    }, {});
  }
}
module.exports = PackageService;
