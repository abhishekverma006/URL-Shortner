import UrlSchema from "../models/urlSchema.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  const newUrl = new UrlSchema({
    full_url: longUrl,
    short_url: shortUrl,
  });

  if(userId){
    newUrl.user_id = userId
  }

  newUrl.save();
};

export const getShortUrl = async (shortUrl) => {
    console.log(shortUrl)
    const getUrl = await UrlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}})
    console.log(getUrl);
    return getUrl
}
