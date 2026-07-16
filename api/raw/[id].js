import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).send('❌ المعرف غير موجود');
    }

    const content = await redis.get(`raw:${id}`);
    if (content === null) {
      return res.status(404).send('❌ المعرف غير صالح أو انتهت صلاحيته');
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(content);
  } catch (error) {
    console.error('خطأ:', error);
    res.status(500).send('خطأ داخلي في الخادم');
  }
}
