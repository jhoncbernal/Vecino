class BaseService {
  constructor(repository) {
    this.repository = repository;
  }
  // Get a single result by ID
  async getById(id) {
    try {
      const result = await this.repository.getById(id);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Get all results with pagination
  async getAll(pageNumber, pageSize) {
    try {
      const results = await this.repository.getAll(pageNumber, pageSize);
      return results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Delete a single result by ID
  async deleteById(id) {
    try {
      const result = await this.repository.deleteById(id);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Delete multiple results that match a condition
  async deletesByCondition(condition) {
    try {
      const result = await this.repository.deletesByCondition(condition);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Create a single document
  async create(document) {
    try {
      const result = await this.repository.create(document);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Create multiple documents
  async creates(documents) {
    try {
      const result = await this.repository.insertMany(documents);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Update a single result by ID
  async updateById(id, updatedData) {
    try {
      const result = await this.repository.updateById({ _id: id }, updatedData);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Update multiple documents that match a condition
  async updateByCondition(condition, updatedData) {
    try {
      const result = await this.repository.updateMany(condition, updatedData);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
export default BaseService;
