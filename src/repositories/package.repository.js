const BaseRepository = require("./base.repository");
class PackageRepository extends BaseRepository {
  constructor({ Package }) {
    super(Package);
    this.package = Package;
    this.getPackageByPin = this.getPackageByPin.bind(this);
    this.getPackageByPackageCode = this.getPackageByPackageCode.bind(this);
    this.getPackagesByUserUuid = this.getPackagesByUserUuid.bind(this);
    this.getAll = this.getAll.bind(this);
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
      .exec();
    if (!packages || packages.length === 0) {
      return { usersUuids: [], packageCodes: []};
    }
    return {
      usersUuids: packages[0].usersUuids,
      packageCodes: packages[0].packageCodes,
    };
  }
}
module.exports = PackageRepository;
