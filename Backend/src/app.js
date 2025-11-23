import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { verifyJWT } from './middlewares/auth.middleware.js';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



//routes import 
import short_url_route from './routes/shortUrl.route.js'
import redirectShortUrl_route from './routes/redirectShortUrl.route.js'
import { errorHandler } from './utils/errorHandler.js';
import auth_route from "./routes/auth.route.js"



// routes declaration
app.use('/api/create',verifyJWT, short_url_route)
app.use("/", redirectShortUrl_route)
app.use("/api/auth",auth_route)


// error Handler
app.use(errorHandler)



export {app}