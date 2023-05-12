import BaseRepository from "./base.repository.js";
const uuid = require("uuid");
let _user = null;

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super(User);
    _user = User;
  }
  async getUserByUsername(username) {
    return await _user.findOne({ username });
  }

  async updateUserPoints(propName, value) {
    try {
      const matchStage = {
        $match: {
          [propName]: value,
        },
      };

      const lookupStage = {
        $lookup: {
          from: "portafolios",
          let: {
            user_code: {
              $concat: [
                { $toString: "$propertyInfo.sectionNumber" },
                { $toString: "$propertyInfo.propertyNumber" },
              ],
            },
          },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$codigo", "$$user_code"] },
              },
            },
          ],
          as: "portafolio_docs",
        },
      };

      const unwindStage = {
        $unwind: {
          path: "$portafolio_docs",
          preserveNullAndEmptyArrays: true,
        },
      };

      const updateFieldsStage = {
        $addFields: {
          debt: { $ifNull: ["$portafolio_docs.total", "$debt"] },
          count: { $add: ["$count", 1] },
          points: {
            $add: [
              "$points",
              {
                $cond: [{ $lte: ["$portafolio_docs.total", "0"] }, 5, -5],
              },
            ],
          },
          payOnTime: { $lte: ["$portafolio_docs.total", "0"] },
        },
      };

      const calculateAverageStage = {
        $addFields: {
          averagePoints: { $divide: ["$points", "$count"] },
        },
      };

      const results = await _user
        .aggregate([
          matchStage,
          lookupStage,
          unwindStage,
          updateFieldsStage,
          calculateAverageStage,
        ])
        .exec();

      const updatePromises = results.map((doc) =>
        _user.updateOne(
          { _id: doc._id },
          {
            debt: doc.debt,
            payOnTime: doc.payOnTime,
            averagePoints: doc.averagePoints,
            count: doc.count,
            points: doc.points,
          }
        )
      );

      const updateResults = await Promise.all(updatePromises);

      return (
        updateResults.reduce((total, result) => total + result.nModified, 0) +
        " users were updated"
      );
    } catch (err) {
      throw err;
    }
  }

  async getUsersByPoints(propName, value, pageSize, pageNum) {
    const skips = pageSize * (pageNum - 1);
    return await _user
      .find({ [propName]: value, payOnTime: true })
      .sort(-"points")
      .skip(skips)
      .limit(pageSize);
  }

  async getUserByProperty(propName, value) {
    return await _user.findOne({ [propName]: value }).sort({ createdAt: -1 });
  }

  async recover(propName, value) {
    return await _user.findOne({ [propName]: value });
  }

  async reset(token) {
    return await _user.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }

  async resetPassword(token) {
    return await _user.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }

  async verifyEmail(body) {
    return await _user.findOne({ email: body.email });
  }

  async verify(token) {
    return await _user.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }

  async addNewUserRole(userId, role) {
    return await _user.findOneAndUpdate(
      {
        _id: userId,
      },
      { $push: { roles: role } }
    );
  }

  async deleteUserRole(userId, role) {
    return await _user.findOneAndUpdate(
      {
        _id: userId,
      },
      { $pull: { roles: role } }
    );
  }

  async getUsersBasicInfoByUuids(usersUuids) {
    const fieldName = uuid.validate(usersUuids[0]) ? "uuid" : "_id";
    return await _user.find(
      { [fieldName]: { $in: usersUuids } },
      {
        _id: 0,
        uuid: 1,
        firstName: 1,
        lastName: 1,
        propertyInfo: 1,
        email: 1,
        neighborhood: 0,
        admin: 1,
      }
    );
  }

  async getUsersByPropertyInfo(sectionNumber, propertyNumber) {
    sectionNumber = parseInt(sectionNumber);
    propertyNumber = parseInt(propertyNumber);
    return await _user.aggregate([
      {
        $match: {
          "propertyInfo.sectionNumber": sectionNumber,
          "propertyInfo.propertyNumber": propertyNumber,
        },
      },
      {
        $project: {
          _id: 0,
          uuid: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          propertyInfo: 1,
          admin: 1,
        },
      },
    ]);
  }

  async getAllUsersByAdminGroupByPropertyInfo(adminId) {
    return await _user.aggregate([
      {
        $match: {
          admin: {
            uuid: adminId,
          },
        },
      },
      {
        $project: {
          _id: 0,
          uuid: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          preferNotificationWay: 1,
          admin: 1,
          "propertyInfo.sectionNumber": 1,
          "propertyInfo.propertyNumber": 1,
        },
      },
      {
        $group: {
          _id: {
            sectionNumber: "$propertyInfo.sectionNumber",
            propertyNumber: "$propertyInfo.propertyNumber",
            admin: "$admin",
          },
          usersUUIDs: {
            $push: {
              uuid: "$uuid",
            },
          },
          users: {
            $push: {
              firstName: "$firstName",
              lastName: "$lastName",
              email: "$email",
              preferNotificationWay: "$preferNotificationWay",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          "propertyInfo.sectionNumber": "$_id.sectionNumber",
          "propertyInfo.propertyNumber": "$_id.propertyNumber",
          "propertyInfo.admin": "$_id.admin",
          usersUUIDs: 1,
          users: 1,
        },
      },
    ]);
  }

  async getAllUsersByUniqueCode(uniquecode, pageSize, pageNum) {
    const skips = pageSize * (pageNum - 1);

    return await _user.aggregate([
      {
        $match: {
          uniquecode: uniquecode,
        },
      },
      {
        $project: {
          uuid: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          preferNotificationWay: 1,
          "propertyInfo.sectionNumber": 1,
          "propertyInfo.propertyNumber": 1,
          debt: 1,
          payOnTime: 1,
          averagePoints: 1,
          enabled: 1,
          points: 1,
          isOwner: 1,
          phone: 1,
          documentId: 1,
          roles: 1,
        },
      },
      {
        $sort: {
          points: -1,
        },
      },
      {
        $skip: skips,
      },
      {
        $limit: pageSize,
      },
    ]);
  }
}

module.exports = UserRepository;
