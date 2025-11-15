import { ShortUrlServiceWithoutUser } from "../services/shortUrlService.js";
import { getShortUrl } from "../dao/shortUrl.js";

export const createShortUrl = async (req, res) => {
  const Originalurl = req.body.url;
  //console.log(Originalurl)

  const shortUrl = ShortUrlServiceWithoutUser(Originalurl);
  console.log(shortUrl);
  res.send(shortUrl);
};

export const redirectShortUrlController = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const url = await getShortUrl(id);
  console.log(url);
  if (url) {
    res.redirect(url.full_url);
  } else {
    res.status(404).send("Not Found");
  }
};
