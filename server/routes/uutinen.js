const express = require('express');
const router = express.Router();

const uutinenCtrl = require('../controllers/uutinen');
const AuthCtrl = require('../controllers/auth');

router.get('', uutinenCtrl.getUutiset);

router.get('/me', AuthCtrl.onlyAuthUser,
                  AuthCtrl.onlyAdmin,
                  uutinenCtrl.getUserUutiset);

router.get('/:id', uutinenCtrl.getUutinenById);

router.get('/s/:slug', uutinenCtrl.getUutinenBySlug);

router.post('', AuthCtrl.onlyAuthUser,
                AuthCtrl.onlyAdmin,
                uutinenCtrl.createUutinen);

router.patch('/:id', AuthCtrl.onlyAuthUser,
                     AuthCtrl.onlyAdmin,
                     uutinenCtrl.updateUutinen);

router.delete('/:id', AuthCtrl.onlyAuthUser,
                      AuthCtrl.onlyAdmin,
                      uutinenCtrl.deleteUutinen);

module.exports = router;

