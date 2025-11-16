import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(cors())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import 
import short_url_route from './routes/shortUrl.route.js'
import redirectShortUrl_route from './routes/redirectShortUrl.route.js'
import { errorHandler } from './utils/errorHandler.js';



// routes declaration
app.use('/api/create', short_url_route)
app.use("/", redirectShortUrl_route)


// error Hnadler
app.use(errorHandler)



export {app}