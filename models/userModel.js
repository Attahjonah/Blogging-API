const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email: {
         unique: true, 
         required: true, 
         type: String 
        },

    firstName: { 
        required: true, 
        type: String 
        },

    lastName: { 
        required: true, 
        type: String
        },

    password: {
        required: true, 
        type: String
        }

})

// Hashing and encrypting user password
UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
)

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;