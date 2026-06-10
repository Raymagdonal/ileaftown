import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  } : undefined,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { key } = req.body || {};
    if (!key) return res.status(400).json({ error: 'Missing "key" in request body' });

    const cmd = new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key });
    await s3Client.send(cmd);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('delete error', err);
    return res.status(500).json({ error: 'Failed to delete object', details: String(err) });
  }
}
