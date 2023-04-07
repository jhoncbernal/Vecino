const { generatePin } = require("../utils/generate.utils");

class PackageController {
  constructor({ PackageService }) {
    this.packageService = PackageService;
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getPackagesByUserUuid = this.getPackagesByUserUuid.bind(this);
    this.getPackageByPin = this.getPackageByPin.bind(this);
    this.getPackageByPackageCode = this.getPackageByPackageCode.bind(this);
    this._mapPackageToResponse = this._mapPackageToResponse.bind(this);
  }

  async create(req, res) {
    try {
      const userUuid = req.body.user;
      const userPackages = await this.packageService.getPackagesByUserUuid(
        userUuid
      );

      let pin = userPackages.length > 0 ? userPackages[0].pin : generatePin();
      const {
        packageCode,
        deliveryCompany,
        receivedBy,
        signature,
        image,
        admin,
        trackingNumber,
      } = req.body;

      await this.packageService.create({
        packageCode,
        deliveryCompany,
        receivedBy,
        signature,
        image,
        users: [{ uuid: userUuid }],
        pin,
        admin: { uuid: admin.uuid },
        trackingNumber,
      });

      const { usersUuids, packageCodes } =
        await this.packageService.getUsersAndPackagesByPin(pin);
      res.status(201).json({ usersUuids, packageCodes, pin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error has occurred" });
    }
  }

  async get(req, res) {
    const { packageId } = req.params;
    try {
      const onePackage = await this.packageService.get(packageId);
      if (onePackage) {
        res.json(onePackage);
      } else {
        res.status(404).json({ message: "Package not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error has occurred" });
    }
  }

  async update(req, res) {
    const { packageId } = req.params;
    const { name, country } = req.body;
    try {
      const updatedPackage = await this.packageService.update(
        packageId,
        req.body
      );
      if (updatedPackage) {
        res.json(updatedPackage);
      } else {
        res.status(404).json({ message: "Package not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error has occurred" });
    }
  }

  async delete(req, res) {
    const { packageId } = req.params;
    try {
      const deletedPackage = await this.packageService.delete(packageId);
      if (deletedPackage) {
        res.json({ message: "Package deleted" });
      } else {
        res.status(404).json({ message: "Package not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error has occurred" });
    }
  }

  async getPackagesByUserUuid(req, res) {
    const { userUuid } = req.params;
    try {
      const packages = await this.packageService.getPackagesByUserUuid(
        userUuid
      );
      if (packages) {
        res.json(packages);
      } else {
        res.status(404).json({ message: "Packages not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error has occurred" });
    }
  }

  async getPackageByPin(req, res) {
    const { pinId } = req.params;
    try {
      const { usersUuids, packageCodes } =
        await this.packageService.getUsersAndPackagesByPin(pinId);
      const users = await this.packageService.getUsersBasicInfoByUuids(
        usersUuids
      );
      const result =  this._mapPackageToResponse(users);
      if (packageCodes && users && result) {
        res.json({ packageCodes, ...result });
      } else {
        res.status(404).json({ message: "Package not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error has occurred" });
    }
  }

  async getPackageByPackageCode(req, res) {
    const { packageCode } = req.params;
    try {
      const onePackage = await this.packageService.getPackageByPackageCode(
        packageCode
      );
      if (onePackage) {
        res.json(onePackage);
      } else {
        res.status(404).json({ message: "Package not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error has occurred" });
    }
  }

  _mapPackageToResponse(users) {
    return users.reduce((acc, user) => {
      const userObj = {
        name: `${user.firstName} ${user.lastName}`,
        uuid: user.uuid,
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

module.exports = PackageController;
