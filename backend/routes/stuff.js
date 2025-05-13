const express = require('express');
const auth = require('../middleware/auth'); //importation du middleware auth
const multer = require('../middleware/multer-config'); //importation du middleware multer
const router = express.Router();


const stuffCtrl = require('../controllers/stuff'); //importation du model Thing

router.post('/', auth, multer, stuffCtrl.createThing); //route pour la creation d'un objet);
//modification d'un objet
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
//supression d'un objet
router.delete('/:id', auth, stuffCtrl.deleteThing)
//recuperation d'un objet
router.get('/:id', auth, stuffCtrl.getOneThing);
// Route API
router.get('/', auth, stuffCtrl.getAllStuff); //route pour la recuperation de tous les objets

module.exports = router;