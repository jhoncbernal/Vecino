const BaseRepository = require("./base.repository");
let _admin = null;
class AdminRepository extends BaseRepository {
  constructor({ Admin }) {
    super(Admin);
    _admin = Admin;
  }
  async getAdminByuniquecode(uniquecode) {
    return await _admin.findOne({ uniquecode });
  }
  async getAdminByUsername(username) {
    return await _admin.findOne({ username });
  }
  async getAdminByProperty(propName, value) {
    return await _admin.findOne({ [propName]: value });
  }
  async getAllAdminNames(pageSize, pageNum) {
    const skips = pageSize * (pageNum - 1);
    return await _admin
      .find({}, { firstName: 1, uniquecode: 1, _id: 1 })
      .skip(skips)
      .limit(pageSize);
  }
  async recover(propName, value) {
    return await _admin.findOne({ [propName]: value });
  }

  async reset(token) {
    return await _admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }

  async resetPassword(token) {
    return await _admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }

  async verifyEmail(body) {
    return await _admin.findOne({ email: body.email });
  }

  async verify(token) {
    return await _admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }
  async getAllAdminsBasicInfoByCity(city, pageSize, pageNum) {
    // use the city parameter to filter the query
    const skips = pageSize * (pageNum - 1);
    return await _admin
      .find(
        { $or: [{ cityCode: city }, { cityName: city }] },
        {
          firstName: 1,
          uniquecode: 1,
          _id: -1,
          address: 1,
          postalCode:1,
          propertyInfo: {
            numberOfSections: 1,
            sectionType: 1,
            numberOfProperties: 1,
            propertyType: 1,
          },
        }
      )
      .collation({ locale: "es", strength: 1 })
      // skips the number of records specified in the page size
      .skip(skips)
      // limits the number of records returned
      .limit(pageSize);
  }
}
module.exports = AdminRepository;
