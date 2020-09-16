require('dotenv').config()
const app = require('./src/app')

const PORT = 8081


app.listen(PORT, function () {
  console.log('server is running')
})
