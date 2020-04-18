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
      .find({}, { firstName: 1, uniquecode: 1, _id: 0 })
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
}
module.exports = AdminRepository;
