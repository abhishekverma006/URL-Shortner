import { saveShortUrl, getCustomShortUrl } from "../dao/shortUrl.js";
import { ApiError } from "../utils/ApiError.js";
import { generateNanoId } from "../utils/helper.js";

export const ShortUrlServiceWithoutUser = async (url) => {
   const shortUrl = generateNanoId(7)
    if(!shortUrl) throw new ApiError("Short URL not generated")
    await saveShortUrl(shortUrl,url)
    return shortUrl
};

export const ShortUrlServiceWithUser = async (url, userId, slug) => {
  const shortUrl = slug ||generateNanoId(7);
  const exist = await getCustomShortUrl(slug);
  if(exist){
    throw new ApiError(400, "Custom short url already exists");
  }

  await saveShortUrl(shortUrl, url, userId);
  return shortUrl;
};
