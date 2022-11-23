const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/pruebas', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(
   console.log('🟢Mongoose se ha conectado')
).catch(
   err => console.error('🔴MongoDB no conectado. Error: ' + err)
)

/* const userSchema = mongoose.Schema({
   name: {
      firstName: String,
      lastName: String
   },
   created: Date
}) */

const authorSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: {
      firstName: {
         type: String,
         required: [true, "El nombre es obligatorio"]
      },
      lastName: String
   },
   biography: String,
   twitter: {
      type: String,
      validate: {
         validator: (text) => text.indexOf('https://www.twitter.com') === 0,
         message: "El perfil de twitter tiene que empezar por 'https://www.twitter.com'"
      },

   },
   facebook: {
      type: String,
      validate: {
         validator: (text) => text.indexOf('https://www.facebook.com') === 0,
         message: "El perfil de facebook tiene que empezar por 'https://www.facebook.com'"
      }
   },
   linkedin: {
      type: String,
      validate: {
         validator: (text) => text.indexOf('https://www.linkedin.com') === 0,
         message: "El perfil de linkedin tiene que empezar por 'https://www.linkedin.com'"
      }
   },
   created: {
      type: Date,
      default: Date.now
   }
})

const bookSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   title: String,
   summary: String,
   isbn: String,
   thumbnail: Buffer,
   author: {
      type: authorSchema,
      ref: "Author"
   },
   ratings: [
      {
         summary: String,
         detail: String,
         numberOfStars: Number,
         created: {
            type: Date,
            default: Date.now
         }
      }
   ],
   created: {
      type: Date,
      default: Date.now
   }
})

let Author = mongoose.model('author', authorSchema)
let Book = mongoose.model('book', bookSchema)

let murakami = new Author({
   _id: new mongoose.Types.ObjectId(),
   name: {
      firstName: 'Haruki',
      lastName: 'Murakami'
   },
   biography: 'Murakami es un escritor y traductor japonés, autor de novelas, relatos y ensayos',
   twitter: 'https://www.twitter.com/harukimurakami_',
   facebook: 'https://www.facebook.com/harukimurakamiauthor'
})

let Book1 = new Book({
   _id: new mongoose.Types.ObjectId(),
   title: '1Q84',
   author: murakami,
   ratings: [{
      summary:
         'Novela fantástica escrita por Haruki Murakami, publicada en Japón en tres libros, entre los años 2009 y 2010. Se convirtió rápidamente en best-seller, con un millón de ejemplares vendidos en un mes.',
      details: "bonito",
      numberOfStars: 4
   }],
})

let Book2 = new Book({
   _id: new mongoose.Types.ObjectId(),
   title: 'El fin del mundo y un despiadado país de las maravillas',
   author: murakami,
})

/* Book.find({}, (err, data) => {
   console.log(data)
})

Book.findById('6373fa105e2d67fd89ab4cc0', (err, data) => {
   console.log(data)
}) */

/* Book2.save(function (err) {
   if (err) throw err
   console.log('Libro guardado correctamente.')
})
 */
/* Book1.save(err => {
   err
      ? console.log('Error al guardar')
      : console.log('Guardado')
}) */

/* murakami.save(err => {
   err
      ? console.log('Error al guardar' + err)
      : console.log('Guardado')
}) */






app.listen(port, err => {
   err
      ? console.log("🔴He fallado, lo siento")
      : console.log(`🟢estoy funcionando en localhost:${port}`)
})