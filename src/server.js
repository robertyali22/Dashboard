import app from './app.js'
import { connectDB } from './db.js'

// ejecutar la base de datos (MONGODB)
connectDB()

// ejecutar web server (EXPRESS)
const PORT = 3000
app.listen(PORT)
console.log('Server port running on ', PORT)
