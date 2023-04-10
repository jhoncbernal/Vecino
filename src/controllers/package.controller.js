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
      const { sectionNumber, propertyNumber } = req.body;

      const result = await this.packageService.create(
        req.body,
        sectionNumber,
        propertyNumber
      );

      const { usersUuids, packageCodes } =
        await this.packageService.getUsersAndPackagesByPin(result.pin);
      return res.status(201).json({
        usersUuids,
        packageCodes,
        pin: result.pin,
        message: "Package created successfully",
      });
    } catch (error) {
      console.error(error);
      if (error.message.includes("duplicate key")) {
        error.message = `${Object.keys(error?.keyValue)[0]} already exists`;
      }
      res
        .status(500)
        .json({ message: error?.message || "An error has occurred" });
    }
  }

  async get(req, res) {
    const { packageId } = req.params;
    try {
      const onePackage = await this.packageService.get(packageId);
      if (onePackage) {
        return res.json(onePackage);
      } else {
        return res.status(404).json({ message: "Package not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error has occurred" });
    }
  }

  async update(req, res) {
    const { packageId } = req.params;
    try {
      const updatedPackage = await this.packageService.update(
        packageId,
        req.body
      );
      if (updatedPackage) {
        return res.json(updatedPackage);
      } else {
        return res.status(404).json({ message: "Package not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error has occurred" });
    }
  }

  async delete(req, res) {
    const { packageId } = req.params;
    try {
      const deletedPackage = await this.packageService.delete(packageId);
      if (deletedPackage) {
        return res.json({ message: "Package deleted" });
      } else {
        return res.status(404).json({ message: "Package not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error has occurred" });
    }
  }

  async getPackagesByUserUuid(req, res) {
    const { userUuid } = req.params;
    try {
      const packages = await this.packageService.getPackagesByUserUuid(
        userUuid
      );
      if (packages) {
        return res.json(packages);
      } else {
        return res.status(404).json({ message: "Packages not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error has occurred" });
    }
  }

  async getPackageByPin(req, res) {
    const { pinId } = req.params;
    try {
      const { usersUuids, packageCodes } =
        await this.packageService.getUsersAndPackagesByPin(pinId);
      if (
        !usersUuids ||
        usersUuids.length === 0 ||
        !packageCodes ||
        usersUuids.length === 0
      ) {
       return res
         .status(404)
         .json({ message: `Package not found using the pin ${pinId}` });
      }
      const users = await this.packageService.getUsersBasicInfoByUuids(
        usersUuids
      );
      const result = this._mapPackageToResponse(users);
      if (packageCodes && users && result) {
       return res.json({ packageCodes, ...result });
      } else {
      return res.status(404).json({ message: "Package not found" });
      }
    } catch (error) {
      console.error(error);
     return res
       .status(500)
       .json({ message: error.message || "An error has occurred" });
    }
  }

  async getPackageByPackageCode(req, res) {
    const { packageCode } = req.params;
    try {
      const onePackage = await this.packageService.getPackageByPackageCode(
        packageCode
      );
      if (onePackage) {
       return res.json(onePackage);
      } else {
      return res.status(404).json({ message: "Package not found" });
      }
    } catch (error) {
      console.error(error);
     return res.status(500).json({ message: "An error has occurred" });
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
