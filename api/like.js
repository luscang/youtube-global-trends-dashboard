const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const LIKES_KEY = 'yt_dashboard_likes';

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'POST') {
      const count = await redis.incr(LIKES_KEY);
      res.status(200).json({ count });
      return;
    }
    const count = (await redis.get(LIKES_KEY)) || 0;
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: 'unavailable' });
  }
};
