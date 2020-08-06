const express = require('express');
const router = express.Router();

const opasCtrl = require('../controllers/opas');
const AuthCtrl = require('../controllers/auth');

router.get('', opasCtrl.getOppaat);

router.get('/me', AuthCtrl.onlyAuthUser,
                  AuthCtrl.onlyAdmin,
                  opasCtrl.getUserOppaat);

router.get('/:id', opasCtrl.getOpasById);

router.get('/s/:slug', opasCtrl.getOpasBySlug);

router.post('', AuthCtrl.onlyAuthUser,
                AuthCtrl.onlyAdmin,
                opasCtrl.createOpas);

router.patch('/:id', AuthCtrl.onlyAuthUser,
                     AuthCtrl.onlyAdmin,
                     opasCtrl.updateOpas);

router.delete('/:id', AuthCtrl.onlyAuthUser,
                      AuthCtrl.onlyAdmin,
                      opasCtrl.deleteOpas);

module.exports = router;

