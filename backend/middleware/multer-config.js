const multer = require('multer');

//creation de dictionnaire pour l'enregistrement des images
const MIME_TYPES ={
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

const storage = multer.diskStorage({
    //la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        //remplacement des espaces par des underscores en generaant le nom de fichier
        const name = file.originalname.split('').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);

    }
})

module.exports = multer({storage}).single('image'); 

//la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier. Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée.
//multer est un package de gestion de fichiers.
//Sa méthode diskStorage()  configure le chemin et le nom de fichier pour les fichiers entrants.
//Sa méthode single()  crée un middleware qui capture les fichiers d'un certain type (passé en argument), et les enregistre au système de fichiers du serveur à l'aide du storage configuré.