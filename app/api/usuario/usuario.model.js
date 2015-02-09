'use strict';

var crypto = require('crypto'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UsuarioSchema = new Schema({
        rol: String,
        hashedPassword: String,
        salt: String,
        nombre: String,
        direccion: String,
        estado: String,
        candidatura: String,
        email: {type: String, lowercase: true},
        partido: String,
        telefonos: {
            telefono: Number,
            celular: Number
        },
        redesSociales: {
            facebook: String,
            twitter: String
        },
        status: Boolean,
        creado: Date,
        actualizado: Date,
        expira: Date
    });


UsuarioSchema
    .pre('save', function (next) {
        var now = moment();
        this.actualizado = now;
        if (!this.creado) {
            this.creado = now;
            this.expira = now.add(7, 'd');
        }
        next();
    });

UsuarioSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

UsuarioSchema
    .virtual('perfil')
    .get(function () {
        return {
            rol: this.rol
        };
    });

UsuarioSchema
    .virtual('token')
    .get(function () {
        return {
            id: this._id,
            rol: this.rol
        };
    });

UsuarioSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },
    encryptPassword: function (password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

module.exports = mongoose.model('User', UsuarioSchema);