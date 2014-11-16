'use strict';

var crypto = require('crypto'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    usuarioSchema = new Schema({
        rol: String,
        hashedPassword: String,
        salt: String,
        nombre: String,
        direccion: String,
        email: {type: String, lowercase: true},
        partido: String,
        avatar: String,
        telefono: {
            local: Number,
            celular: Number
        },
        redesSociales: {
            facebook: String,
            twitter: String
        },
        status: Boolean
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
            rol: this.rol,
            avatar: this.avatar
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