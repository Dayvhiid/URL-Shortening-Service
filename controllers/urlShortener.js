import crypto from 'crypto';
import URL from '../models/URL.js';
import redis from 'redis';

const client = redis.createClient({
    password: 'qxiqx7yih3awpBw7mMrwXq28o2MJAVJy',
    socket: {
        host: 'redis-15610.c10.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 15610
    }
});

client.on('error', (err) => { console.log("Cache Error", err)});
client.on('connect', () => {console.log("Redis Succesfully connected")});

await client.connect();


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
    await client.set(shortUrl, url, 'EX', 180); // Cache the URL for 3 minutes
    return res.json(
        { message: "Shortened succesfully", url: shortUrl }
    )
}

const getOriginalUrl = async (req, res) => {
    const { shortUrl } = req.params;
    //cache check
    const cachedData = await client.get(shortUrl);
    if (cachedData) {
        return res.json({ originalUrl: cachedData, message: "Retrieved from cache" });
    }
    const urlEntry = await URL.findOne({ shortUrl: shortUrl });
    if (!urlEntry) {
        return res.status(404).json({ error: 'URL not found' });
    }

    return res.json({ originalUrl: urlEntry.originalUrl });
};

export  {urlshortener, getOriginalUrl};