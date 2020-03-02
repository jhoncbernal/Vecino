const BaseRepository = require('./base.repository');

let _user = null;
class UserRepository extends BaseRepository {
    constructor({ User }) {
        super(User);
        _user = User;
    }
    async getUserByUsername(username) {
        return await _user.findOne({ username });
    }

    async getUsersByPoints(propName, value) {
        let pipeline = [
           
            {
                $lookup:
                {
                    from: "portafolios",
                    localField: "code",
                    foreignField: "codigo",
                    as: "bestUsersByPoints_docs"
                }
            },
            {
                $project: {
                    _id: 1, code: 1, blockNumber: 1, homeNumber: 1, roles: 1, points: 1, username: 1, password: 1, email: 1, phone: 1, firstName: 1, lastName: 1, neighborhoodcode: 1, neighborhood: 1, createdAt: 1, updatedAt: new Date(), isOwner: 1, enabled: 1, isVerified: 1,
                    payOnTime:
                    {
                        $cond: {
                            if: {
                                $and: [{
                                    $eq: [{ $arrayElemAt: ["$bestUsersByPoints_docs.total", 0] }, "0"]
                                },
                                { $eq: [`$${propName}`, `${value}`] }]
                            },
                            then: true, else:
                            {
                                $cond: {
                                    if: {
                                        $eq: [`$${propName}`, `${value}`]
                                    }, then: false,else:'$payOnTime'
                                }
                            }
                        }
                    }, debt: {
                        $cond: {
                            if: {
                                $and: [{
                                    $gte: [{ $arrayElemAt: ["$bestUsersByPoints_docs.total", 0] }, "0"]
                                },
                                { $eq: [`$${propName}`, `${value}`] }]
                            },
                            then: { $arrayElemAt: ["$bestUsersByPoints_docs.total", 0] }, 
                            else: {
                                $cond: {
                                    if: {
                                        $eq: [`$${propName}`, `${value}`]
                                    }, then: null,else:'$debt'
                                }
                            }
                        }
                    }
                }
            },
            { $out: "users" }

        ]

        return await _user.aggregate(pipeline).then((result) => {
            return ' users have been successfully uploaded.'
        }).catch((err) => { throw err })



    }
    async getUserByProperty(propName, value) {
        return await _user.findOne({ [propName]: value });
    }
    async recover(body) {
        try {
            return await _user.findOne({ email: body.email })
        } catch (error) {
            const err = new Error();
            err.status = 500;
            err.message = error.message;
            throw err;
        }
    }
    async reset(token) {
        return await _user.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })

    }

    async resetPassword(token) {
        return await _user.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    }

    async verifyEmail(body) {
        try {
            return await _user.findOne({ email: body.email });

        } catch (error) {
            const err = new Error();
            err.status = 500;
            err.message = error.message;
            throw err;
        }
    }

    async verify(token) {
        return await _user.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    }

}


module.exports = UserRepository;