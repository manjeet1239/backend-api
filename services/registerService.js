const User = require('../models/Users');
const Bcrypt = require('bcryptjs')

module.exports = {
    AddUser: async (req, res) => {
        try {
            const exist = await User.findOne({ email: req.body.email })

            if (exist) {
                return res.send('use another email')
            }

            const hashPass = await Bcrypt.hashSync(req.body.password, 10)
            const user = await User({
                name: req.body.name,
                email: req.body.email,
                password: hashPass,
                phone: req.body.phone
            })
            user.save()
                .then(resData => {
                    res.status(200).send(resData)
                })
                .catch(e => {
                    res.status(400).send(e)
                })
        } catch (e) {
            res.status(500).send(`something went wrong ${e}`)
        }

    }

}