const express = require('express')
const iNotes_database = require('./iNotes_db')
const cors = require('cors')
const app = express()
const port = 5000

iNotes_database()

app.use(cors())
app.use('/api/auth', require('./routes/User'))
app.use('/api/notes', require('./routes/Note'))

app.listen(port, () => {
  console.log(`iNotes server is listening on port ${port}`)
})