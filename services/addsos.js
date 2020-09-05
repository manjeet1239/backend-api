const Sos = require('../models/Veryimportant');
const User = require('../models/Users');
const Contact = require('../models/Contact');

const { decodeToken } = require('../services/auth');
const secretKey = 'helloooo121'
module.exports = {
    Createsos: async (req, res) => {
        const sos = await Sos({
            sos: req.body.sos
        })
        sos.save()
            .then(resData => {
                res.send(resData)
            })
            .catch(e => {
                res.send(e)
            })
    },
    checkParam: async (params) => {
        // const user = decodeToken(params)

        await User.findOne({ _id: '5f530cca338fdc42acd129e0' }).then(resData => {
            console.log(resData);
        })
            .catch(e => {
                console.log(e);
            })


    },
    AddContact: async (params, data) => {
        const user = decodeToken(params)
        // console.log(user);
        // console.log(data.req.body);
        const contact = await Contact({
            userId: user._id,
            name: data.req.body.name,
            email: data.req.body.email,
            phone: data.req.body.phone
        })
        try {
            contact.save()
                .then(reaData => {
                    data.status(200).send(reaData)
                })
        } catch (e) {
            data.status(200).send(e)

        }

    },
    SeeContact: async (params, data) => {
        const user = decodeToken(params)

        await Contact.find({ userId: user._id })
            .then(resData => {
                data.send({ resData });
            })
            .catch(e => {
                data.send(e)
            })
    },
    UpdateContact: async (params, data) => {
        const user = decodeToken(params)
        await Contact.findOneAndUpdate({ userId: user._id }, { name: data.req.body.name, phone: data.req.body.phone })
            .then(resData => {
                data.send({ resData })
            })
            .catch(e => {
                data.send(e)
            })
    }

}