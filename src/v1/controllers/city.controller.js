class CityController {
  constructor({ CityService }) {
    this.cityService = CityService;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getCityByName = this.getCityByName.bind(this);
    this.getCityByCode = this.getCityByCode.bind(this);
    this.getCitiesByStateCode = this.getCitiesByStateCode.bind(this);
    this.getCitiesByStateName = this.getCitiesByStateName.bind(this);
  }

  async getAll(req, res) {
    const { pageSize, pageNum,code,name,stateCode,stateName } = req.query;
    try {
      const cities = await this.cityService.getAll({code,name,stateCode,stateName},
        pageSize,
        pageNum
      );
      if (cities && cities.length) {
        res.json(cities);
      } else {
        res.status(404).json({ message: "City not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error has occurred" });
    }
  }

  async create(req, res) {
    try {
      const city = await this.cityService.create(req.body);
      res.status(201).json(city);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error has occurred" });
    }
  }

  async get(req, res) {
    const { cityId } = req.params;
    try {
      const city = await this.cityService.get(cityId);
      if (city) {
        res.json(city);
      } else {
        res.status(404).json({ message: "City not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error has occurred" });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, country } = req.body;
    try {
      const city = await this.cityService.update(id, name, country);
      if (city) {
        res.json(city);
      } else {
        res.status(404).json({ message: "City not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error has occurred" });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedCity = await this.cityService.delete(id);
      if (deletedCity) {
        res.json({ message: "City deleted" });
      } else {
        res.status(404).json({ message: "City not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error has occurred" });
    }
  }

  async getCityByName(req, res) {
    try {
      const city = await this.cityService.getCityByName(req.params.name);
      if (!city) {
        res.status(404);
        return res.json({ message: "City not found" });
      }
      res.json(city);
    } catch (err) {
      console.error(err);
      res.status(500);
      res.json({ message: "An error has occurred" });
    }
  }

  async getCityByCode(req, res) {
    try {
      const { pageSize, pageNum } = req.query;
      const cities = await this.cityService.getCityByCode(
        req.params.code,
        pageSize,
        pageNum
      );
      if (!cities) {
        res.status(404);
        return res.json({ message: "City not found" });
      }
      res.json(cities);
    } catch (err) {
      console.error(err);
      res.status(500);
      res.json({ message: "An error has occurred" });
    }
  }

  async getCitiesByStateName(req, res) {
    try {
      const { pageSize, pageNum } = req.query;
      const cities = await this.cityService.getCitiesByStateName(
        req.params.name,
        pageSize,
        pageNum
      );
      if (!cities) {
        res.status(404);
        return res.json({ message: "City not found" });
      }
      res.json(cities);
    } catch (err) {
      console.error(err);
      res.status(500);
      res.json({ message: "An error has occurred" });
    }
  }

  async getCitiesByStateCode(req, res) {
    try {
      const { pageSize, pageNum } = req.query;
      const cities = await this.cityService.getCitiesByStateCode(
        req.params.code,
        pageSize,
        pageNum
      );
      if (!cities) {
        res.status(404);
        return res.json({ message: "City not found" });
      }
      res.json(cities);
    } catch (err) {
      console.error(err);
      res.status(500);
      res.json({ message: "An error has occurred" });
    }
  }
}

module.exports = CityController;
