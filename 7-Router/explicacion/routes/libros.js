const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
/* req.app.locals.db... */
   res.send("hola desde libros")
})

module.exports = router