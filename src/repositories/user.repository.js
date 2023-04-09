const BaseRepository = require("./base.repository");
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
    await _user
      .aggregate([
        {
          $lookup: {
            from: "portafolios",
            localField: "code",
            foreignField: "codigo",
            as: "bestUsersByPoints_docs",
          },
        },
        {
          $project: {
            _id: 1,
            points: {
              $cond: {
                if: {
                  $and: [
                    {
                      $eq: [
                        { $arrayElemAt: ["$bestUsersByPoints_docs.total", 0] },
                        "0",
                      ],
                    },
                    { $eq: [`$${propName}`, `${value}`] },
                  ],
                },
                then: { $sum: { $add: ["$points", 5] } },
                else: { $sum: { $add: ["$points", -5] } },
              },
            },
            count: {
              $cond: {
                if: {
                  $eq: [`$${propName}`, `${value}`],
                },
                then: { $add: ["$count", 1] },
                else: "$count",
              },
            },
            averagePoints: {
              $cond: {
                if: {
                  $and: [
                    {
                      $eq: [
                        { $arrayElemAt: ["$bestUsersByPoints_docs.total", 0] },
                        "0",
                      ],
                    },
                    { $eq: [`$${propName}`, `${value}`] },
                  ],
                },
                then: { $divide: ["$points", "$count"] },
                else: "$averagePoints",
              },
            },
            payOnTime: {
              $cond: {
                if: {
                  $and: [
                    {
                      $eq: [
                        { $arrayElemAt: ["$bestUsersByPoints_docs.total", 0] },
                        "0",
                      ],
                    },
                    { $eq: [`$${propName}`, `${value}`] },
                  ],
                },
                then: true,
                else: {
                  $cond: {
                    if: {
                      $eq: [`$${propName}`, `${value}`],
                    },
                    then: false,
                    else: "$payOnTime",
                  },
                },
              },
            },
            debt: {
              $cond: {
                if: {
                  $and: [
                    {
                      $gte: [
                        { $arrayElemAt: ["$bestUsersByPoints_docs.total", 0] },
                        "0",
                      ],
                    },
                    { $eq: [`$${propName}`, `${value}`] },
                  ],
                },
                then: { $arrayElemAt: ["$bestUsersByPoints_docs.total", 0] },
                else: {
                  $cond: {
                    if: {
                      $eq: [`$${propName}`, `${value}`],
                    },
                    then: null,
                    else: "$debt",
                  },
                },
              },
            },
          },
        },
      ])
      .then((documents) => {
        return Promise.all(
          documents.map((doc) =>
            _user.findOneAndUpdate(
              { _id: doc._id, [propName]: value },
              {
                debt: doc.debt,
                payOnTime: doc.payOnTime,
                averagePoints: doc.averagePoints,
                count: doc.count,
                points: doc.points,
              }
            )
          )
        )
          .then((result) => {
            return result.length + "users were updated";
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }
  async getUsersByPoints(propName, value, pageSize, pageNum) {
    const skips = pageSize * (pageNum - 1);
    return await _user
      .find({ [propName]: value, payOnTime: true })
      .sort(-"points")
      .skip(skips)
      .limit(pageSize)
      .catch((err) => {
        throw err;
      });
  }
  async getUserByProperty(propName, value) {
    return await _user.findOne({ [propName]: value });
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
          propertyInfo: 1,
          admin: 1,
        },
      },
    ]);
  }
}

module.exports = UserRepository;
