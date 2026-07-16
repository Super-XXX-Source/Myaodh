import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { id } = req.query; // نأخذ المعرف من الرابط

  const content = await kv.get(`raw:${id}`);
  if (content === null) {
    return res.status(404).send('المعرف غير موجود');
  }

  // نرسل النص كنص خام (Plain Text)
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(content);
}
