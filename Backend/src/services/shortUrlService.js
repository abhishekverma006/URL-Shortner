import { saveShortUrl } from '../dao/shortUrl.js';
import {generateNanoId} from '../utils/helper.js'

export const ShortUrlServiceWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);
  saveShortUrl(shortUrl,url);
  return shortUrl      
};

export const ShortUrlServiceWithUser = async (url,userId) => {
  const shortUrl = generateNanoId(7);
  if(!shortUrl) throw new Error("Short Url not generated")
  saveShortUrl(shortUrl,url,userId);
  return shortUrl      
};
