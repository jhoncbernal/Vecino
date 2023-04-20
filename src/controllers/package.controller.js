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
    this.updatePackageStatusByPIN = this.updatePackageStatusByPIN.bind(this);
    this.getAllByAdmin = this.getAllByAdmin.bind(this);
    this.getAllDeliveryCompanies = this.getAllDeliveryCompanies.bind(this);
  }

  async create(req, res) {
    try {
      const { sectionNumber, propertyNumber } = req.body;

      const result = await this.packageService.create(
        req.body,
        sectionNumber,
        propertyNumber
      );
      let resultPin;
      if (Array.isArray(result) && result.length > 0) resultPin = result[0].pin;
      if (req.body.kind === "utilities") {
        return res.status(201).json({
          message: "Notification created successfully",
        });
      }
      const { usersUuids, packageCodes } =
        await this.packageService.getUsersAndPackagesByPin(resultPin);
      return res.status(201).json({
        usersUuids,
        packageCodes,
        pin: resultPin,
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
      const result = await this.packageService.getPackageByPin(pinId);
      return res.json(result);
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

  async updatePackageStatusByPIN(req, res) {
    const { pinId } = req.params;
    const { signature } = req.body;
    try {
      const updatedPackage = await this.packageService.updatePackageStatusByPIN(
        pinId,
        signature,
        "delivered"
      );
      if (updatedPackage) {
        return res.json({ ...updatedPackage, message: "Package delivered" });
      } else {
        return res.status(404).json({ message: "Package not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error has occurred" });
    }
  }

  async getAllDeliveryCompanies(req, res) {
    try {
      const deliveryCompanies =
        await this.packageService.getAllDeliveryCompanies();
      if (deliveryCompanies) {
        return res.json(deliveryCompanies);
      } else {
        return res
          .status(404)
          .json({ message: "Delivery companies not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error has occurred" });
    }
  }

  async getAllByAdmin(req, res) {
    try {
      const { adminUuid } = req.params;
      console.log(adminUuid);
      const { pageSize, pageNum } = req.query;
      const packages = await this.packageService.getAllByAdmin(
        pageSize,
        pageNum,
        adminUuid
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
}

module.exports = PackageController;
