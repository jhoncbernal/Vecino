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
    async updateUserPoints(propName,value){
        await  _user.aggregate([{
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
                _id: 1,
                points:
                {
                    $cond: {
                        if: {
                            $and: [{
                                $eq: [{ $arrayElemAt: ["$bestUsersByPoints_docs.total", 0] }, "0"]
                            },
                            { $eq: [`$${propName}`, `${value}`] }]
                        },
                        then: { $sum: { $add: ["$points", 5] } }, else: { $sum: { $add: ["$points", -5] } }
                    }
                },
                count: {
                    $cond: {
                        if: {
                            
                             $eq: [`$${propName}`, `${value}`] 
                        },
                        then: { $add: ["$count", 1] }, else: "$count"
                    }
                },
                averagePoints: {
                    $cond: {
                        if: {
                            $and: [{
                                $eq: [{ $arrayElemAt: ["$bestUsersByPoints_docs.total", 0] }, "0"]
                            },
                            { $eq: [`$${propName}`, `${value}`] }]
                        },
                        then: { $divide: ["$points", '$count'] }, else: "$averagePoints"
                    }
                },
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
                                }, then: false, else: '$payOnTime'
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
                                }, then: null, else: '$debt'
                            }
                        }
                    }
                }
            }
        }]).then(
            (documents) => {
               return Promise.all(documents.map(doc => _user.findOneAndUpdate({ "_id": doc._id, [propName]: value }, { "debt": doc.debt, "payOnTime": doc.payOnTime, "averagePoints": doc.averagePoints, "count": doc.count, "points": doc.points })))
               .then((result)=>{return(result.length+'users were updated')})
               .catch((err)=>{throw err})
            }
        ).catch((err)=>{throw err})
    }
    async getUsersByPoints(propName, value, pageSize, pageNum) {
        const skips = pageSize * (pageNum - 1);
        return await _user.find({[propName]: value,payOnTime:true})
        .sort(-"points") 
        .skip(skips)
        .limit(pageSize)
        .catch((err)=>{throw err})
    }
    async getUserByProperty(propName, value) {
        return await _user.findOne({ [propName]: value });
    }
    async recover(propName, value) {
        try {
            return await _user.findOne({ [propName]: value })
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