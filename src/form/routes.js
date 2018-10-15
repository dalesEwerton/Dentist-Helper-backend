const express = require('express');
const router = express.Router();
const formController = require('./controller');

router.post('/form', formController.verifyToken, formController.create);
router.put('/form/add-operation', formController.verifyToken, formController.addOperation);
router.get('/form', formController.getAll);
router.put('/form/:id', formController.verifyToken, formController.update);
router.delete('/form/:id', formController.verifyToken, formController.delete);

module.exports = router;