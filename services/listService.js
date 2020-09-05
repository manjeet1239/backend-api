const User = require('../models/Users');

module.exports = {
    DisplayUsers: async (req, res) => {
        await User.find()
            .then(resList => {
                res.send(resList)
            })
            .catch(e => {
                res.send(e)
            })
    }
}