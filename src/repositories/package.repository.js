import BaseRepository from "./base.repository.js";
class PackageRepository extends BaseRepository {
  constructor({ Package }) {
    super(Package);
    this.package = Package;
    this.getPackageByPin = this.getPackageByPin.bind(this);
    this.getPackageByPackageCode = this.getPackageByPackageCode.bind(this);
    this.getPackagesByUserUuid = this.getPackagesByUserUuid.bind(this);
    this.updatePackageStatusByPIN = this.updatePackageStatusByPIN.bind(this);
  }
  async getPackageByPin(pin) {
    return this.package.find({ pin: pin, status: { $ne: "delivered" } });
  }

  async getPackageByPackageCode(packageCode) {
    return this.package.findOne({ packageCode: packageCode });
  }

  async getPackagesByUserUuid(userUuid) {
    return this.package
      .find({
        users: { $elemMatch: { uuid: userUuid } },
        status: { $ne: "delivered" },
      })
      .sort({ createdAt: -1 });
  }

  async getUsersAndPackagesByPin(pin) {
    const packages = await this.package
      .aggregate([
        { $match: { pin: pin, status: { $ne: "delivered" } } },
        { $project: { users: 1, packageCode: 1 } },
        { $unwind: "$users" },
        {
          $group: {
            _id: null,
            usersUuids: { $addToSet: "$users.uuid" },
            packageCodes: { $addToSet: "$packageCode" },
          },
        },
        {
          $project: {
            _id: 0,
            usersUuids: 1,
            packageCodes: 1,
          },
        },
      ])
      .collation({ locale: "es", strength: 1 })
      .exec();
    if (!packages || packages.length === 0) {
      return { usersUuids: [], packageCodes: [] };
    }
    return {
      usersUuids: packages[0].usersUuids,
      packageCodes: packages[0].packageCodes,
    };
  }

  async getAllDeliveryCompanies() {
    return this.package
      .aggregate([
        {
          $group: {
            _id: null,
            deliveryCompanies: { $addToSet: { $toUpper: "$deliveryCompany" } },
          },
        },
        {
          $project: {
            _id: 0,
            deliveryCompanies: 1,
          },
        },
      ])
      .collation({ locale: "es", strength: 1 })
      .exec()
      .then((result) => result[0].deliveryCompanies);
  }

  async updatePackageStatusByPIN(pin, signature, status) {
    return await this.package.updateMany(
      { pin: pin },
      { status: status, statusUpdatedAt: new Date(), signature: signature }
    );
  }

  async getAllByAdmin(pageSize, pageNum, adminUUid) {
    const skips = pageSize * (pageNum - 1);

    return await this.package
      .find(
        {
          admin: { $elemMatch: { uuid: adminUUid } },
          kind: { $ne: "utilities" },
        },
        {
          _id: 0,
          packageCode: 1,
          deliveryCompany: 1,
          receivedBy: 1,
          status: 1,
          pin: 1,
          imageUrl: 1,
          notificationWay: 1,
          sectionNumber: 1,
          propertyNumber: 1,
          receivedAt: 1,
          kind: 1,
        }
      )
      .sort([
        ["status", "asc"],
        ["receivedAt", "desc"],
      ])
      .skip(skips)
      .limit(pageSize);
  }
}
module.exports = PackageRepository;
