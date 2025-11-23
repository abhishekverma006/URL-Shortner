import {
  ShortUrlServiceWithoutUser,
  ShortUrlServiceWithUser,
} from "../services/shortUrl.service.js";
import { getShortUrl } from "../dao/shortUrl.js";

export const createShortUrl = async (req, res) => {
  try {
    const originalUrl = req.body.url;
    const customSlug = req.body.customSlug;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    let shortUrl;
    if (req.user?._id) {
      shortUrl = await ShortUrlServiceWithUser(
        originalUrl,
        req.user._id,
        customSlug
      );
    } else {
      shortUrl = await ShortUrlServiceWithoutUser(originalUrl);
    }

    return res.status(200).json({
      shortUrl: `${process.env.SHORT_URL}${shortUrl}`,
    });
  } catch (err) {
    console.error("Error creating short URL:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
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

// create custom short url
export const createCustomShortUrl = async (req, res) => {
  const { Originalurl, customshortUrl } = req.body;

  const shortUrl = await ShortUrlServiceWithoutUser(
    Originalurl,
    customshortUrl
  );
};
