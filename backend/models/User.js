const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator)//ajoute un plugin de validation unique à notre schéma, ce qui garantit que les valeurs de champ spécifiées sont uniques dans la base de données.

module.esports = mongoose.model('User', userSchema);

//mongoose-unique-validator  améliore les messages d'erreur lors de l'enregistrement de données uniques.