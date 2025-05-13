const Thing = require('../models/Thing');
const fs = require('fs');
//Le package fs expose des méthodes pour interagir avec le système de fichiers du serveur.
//La méthode unlink() du package  fs  vous permet de supprimer un fichier du système de fichiers.

exports.createThing = (req, res, next) => {
    // delete req.body._id;
    // const thing = new Thing({
    //  ...req.body //methode spread don pas besion d'ecrire tous les arguments 
    // });
    // thing.save() //La méthode save() renvoie une Promise
    //  .then(() => res.status(201).json({message: 'Objet enregistre'}))
    //  .catch(error => res.status(400).json({EvalError: 'Erreur d\'enregistrement'}));

    const thingObject = JSON.parse(req.body.things);
    delete thingObject._id;
    delete thingObject._userId;
    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
//Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data et non sous forme de JSON. Le corps de la requête contient une chaîne thing, qui est simplement un objetThing converti en chaîne. Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable.
//Nous supprimons le champ_userId de la requête envoyée par le client car nous ne devons pas lui faire confiance (rien ne l’empêcherait de nous passer le userId d’une autre personne). Nous le remplaçons en base de données par le _userId extrait du token par le middleware d’authentification.
//Nous devons également résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename. Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http'). Nous ajoutons '://', puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000'). Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL.
   };


exports.modifyThing =  (req, res, next) => {
    // Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    //     .then(() => res.status(201).json({ message: 'Objet modifié !' }))
    //    .catch(error => res.status(400).json({ error }));
    const thingObject = req.file? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    delete thingObject._userId;
    thing.findOne({_id: req.params.id})
        .then((thing) => {
            if (thing.userId != req.auth.userId){
                res.status(401).json({ message: 'Non autorisé !' });
            }else{
                Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
};
//Dans cette version modifiée de la fonction, on crée un objet thingObject qui regarde si req.file existe ou non. S'il existe, on traite la nouvelle image ; s'il n'existe pas, on traite simplement l'objet entrant. On crée ensuite une instance Thing à partir de thingObject, puis on effectue la modification. Nous avons auparavant, comme pour la route POST, supprimé le champ _userId envoyé par le client afin d’éviter de changer son propriétaire et nous avons vérifié que le requérant est bien le propriétaire de l’objet.

exports.deleteThing = (req, res, next) => {
    // Thing.deleteOne({ _id: req.params.id})
    //    .then(() => res.status(200).json({message: 'Objet supprime!'}))
    //    .catch(error => res.status(400).json(error));
    Thing.findOne({_id: req.params.id})
        .then(thing => {
            if (thing.userId != req.auth.userId){
                res.status(401),json({message: 'Non autorisé !'});
            }else{
                const filename = thing.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Thing.deleteOne({_id: req.params.id})
                        .then(() => res.status(200).json({message: 'Objet supprime!'}))
                        .catch(error => res.status(400).json({ error }));
                })
            }
        })

        .catch(error => res.status(500).json({error}))
};
//Nous utilisons l'ID que nous recevons comme paramètre pour accéder au Thing correspondant dans la base de données.
//Nous vérifions si l’utilisateur qui a fait la requête de suppression est bien celui qui a créé le Thing.
//Nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier.
//Nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé.
//Dans le callback, nous implémentons la logique d'origine en supprimant le Thing de la base de données.

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
       .then(thing => res.status(200).json(thing))
       .catch(error => res.status(404).json({ error }));
};

exports.getAllStuff = (req, res, next) => {    
    Thing.find()
       .then(things => res.status(200).json(things))
       .catch(error => res.status(400).json({ error }));
      
};