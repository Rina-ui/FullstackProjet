const express = require('express');
const auth = require('auth'); //importation du middleware d'authentification
const router = express.Router();


const stuffCtrl = require('../controllers/stuff'); //importation du model Thing

router.post('/', auth, stuffCtrl.createThing); //route pour la creation d'un objet);
//modification d'un objet
router.put('/:id', auth, stuffCtrl.modifyThing);
//supression d'un objet
router.delete('/:id', auth, stuffCtrl.deleteThing)
//recuperation d'un objet
router.get('/:id', auth, stuffCtrl.getOneThing);
// Route API
router.get('/', auth, stuffCtrl.getAllThings); //route pour la recuperation de tous les objets

module.exports = router;