const express = require('express')
const session = require('express-session')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const cookierParser = require('cookie-parser')
const MongoClient = require('mongodb').MongoClient
const MongoStore = require('connect-mongo')
const crypto = require('crypto')
const secreto = 'patata'

MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(client => {
   console.log('🟢MongoDB se ha conectado')
   app.locals.db = client.db("auth")
}).catch(err => console.error('🔴MongoDB no conectado. Error: ' + err))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
   origin: 'http://localhost:3000/',
   credentials: true
}))
app.use(session({
   secret: secreto,
   resave: false,
   saveUninitialized: false,
   store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017',
      dbName: 'auth',
      collectionName: 'sessions',
      ttl: 1000 * 60 * 60 * 24,
      autoRemove: 'native'
   }),
   cookie: {
      maxAge: 1000 * 60 * 60 * 24
   }
}))
app.use(cookierParser(secreto))
app.use(passport.initialize())
app.use(passport.session())

passport.use(
   new LocalStrategy({
      usernameField: 'email',
      passwordField: 'pass'
   }, (email, pass, done) => {
      app.locals.db.collection('users').findOne({ email: email }, (err, user) => {
         if (err) {
            return done(err)
         }
         if (!user) {
            return done(null, false)
         }
         if (!validoPass(pass, user.pass.hash, user.pass.salt)) {
            return done(null, false)
         }
         return done(null, user)
      })
   })
)

passport.serializeUser((user, done) => {
   done(null, user)
})
passport.deserializeUser((user, done) => {
   app.locals.db.collection('users').findOne({ email: user.email }, (err, usuario) => {
      if (err) {
         return done(err)
      }
      if (!usuario) {
         return done(null, null)
      }
      return done(null, usuario)
   })
})

//RUTAS gestion

app.post('/login', passport.authenticate('local', {
   successRedirect: '/api',
   failureRedirect: '/api/fail'
}))

app.all('/api', (req, res) => {
   res.send({ logged: true, mensaje: "Login correcto", user: req.user })
})
app.all('/api/fail', (req, res) => {
   res.send({ logged: false, mensaje: "Login incorrecto" })
})

app.post('/logout', (req, res) => {
   req.logOut(err =>
      err
         ? res.send({ error: true, mensaje: "Error al cerrar sesion", err })
         : res.send({ logged: false, mensaje: "Logout correcto" })
   )
})

//RUTAS Utilidad

app.post('/singup', (req, res) => {
   app.locals.db.collection('users').find({ email: req.body.email }).toArray((err, user) => {
      if (err) {
         res.send({ error: true, mensaje: "Error al acceder a la BBDD", data: err })
      } else {
         if (user.length > 0) {
            res.send({ error: true, mensaje: "El usuario ya esta registrado", data: user })
         } else {
            let passwordCrypt = creaPass(req.body.pass)
            app.locals.db.collection('users').insertOne({
               nombre: req.body.nombre,
               email: req.body.email,
               pass: { hash: passwordCrypt.hash, salt: passwordCrypt.salt }
            },
               (err1, data) => {
                  err1
                     ? res.send({ error: true, mensaje: "No se ha podido registrar el usuario", data: err1 })
                     : res.send({ error: false, mensaje: "Usuario registrado", data: data })
               }
            )
         }
      }
   })
})




app.listen(port, err => {
   err
      ? console.log("🔴He fallado, lo siento")
      : console.log(`🟢estoy funcionando en localhost:${port}`)
})

//FUNCIONES

function creaPass(pass) {
   let salt = crypto.randomBytes(32).toString('hex')
   let genHash = crypto.pbkdf2Sync(pass, salt, 10000, 64, 'sha512').toString('hex')
   return {
      salt: salt,
      hash: genHash
   }
}

function validoPass(pass, hash, salt) {
   let hashVerify = crypto.pbkdf2Sync(pass, salt, 10000, 64, 'sha512').toString('hex')
   return hashVerify === hash
}