import express from "express";
import {nanoid} from 'nanoid'
import dotenv from "dotenv"
import connectDB from "./db/db.js";
import UrlSchema from "./models/urlSchema.model.js"

dotenv.config(
    {
        path: './.env'
    }
)

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.post('/api/create', (req, res) => {
    const Originalurl = req.body.url;
    //console.log(Originalurl)

    const shortUrl = nanoid(7);
    const newUrl = new UrlSchema({
        full_url: Originalurl,
        short_url: shortUrl,
    });

    newUrl.save()
    .then(() => {
        res.status(201).send(newUrl);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
})

app.get("/:id", async(req, res) => {
    const {id} = req.params
    const url = await UrlSchema.findOne({short_url : id})
    if(url){
        res.redirect(url.full_url)
    }else{
        res.status(404).send("Not Found")
    }
})
 



connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
