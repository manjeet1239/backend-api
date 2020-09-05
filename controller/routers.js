const express = require('express');
const secretKey = 'helloooo121'


const registerService = require('../services/registerService');
const Auth = require('../services/auth');
const Sos = require('../services/addsos');

const ListService = require('../services/listService');



const router = express.Router();

router.post('/register', registerService.AddUser)
router.post('/login', Auth.Login)
router.post('/sos', Auth.verifyToken, Sos.Createsos)
router.get('/params', Sos.checkParam)
router.get('/see', Sos.SeeContact)

router.post('/add-contact', Sos.AddContact)
router.post('/update-contact', Sos.UpdateContact)



router.get('/list', Auth.verifyToken, ListService.DisplayUsers)

module.exports = router;