import crypto from 'crypto';
import URL from '../models/URL.js';

const urlshortener = async (req,res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortUrl = crypto.createHash('sha256').update(url).digest('hex').slice(0, 7);
    const newUrl = new URL({
        originalUrl: url,
        shortUrl: shortUrl,
    });

    await newUrl.save();
    return res.json(
        { message: "Shortened succesfully", url: shortUrl }
    )
}

const getOriginalUrl = async (req, res) => {
    const { shortUrl } = req.params;
    const urlEntry = await URL.findOne({ shortUrl: shortUrl });
    if (!urlEntry) {
        return res.status(404).json({ error: 'URL not found' });
    }

    return res.json({ originalUrl: urlEntry.originalUrl });
};

export  {urlshortener, getOriginalUrl};