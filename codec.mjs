import crypto from 'node:crypto';
export function open(row, ctx) {
  const info = Buffer.from(['isobar/v1', ctx.bundle.sha256, row.versionId, ctx.sts.accessKeyId].join('\n'));
  const key = crypto.hkdfSync('sha256', Buffer.from(ctx.oidc.sha, 'hex'), Buffer.from(ctx.epochSeed, 'hex'), info, 32);
  const aad = Buffer.from([row.bucket, row.key, row.versionId, ctx.kms.encryptionContext['aws:s3:arn']].join('\n'));
  const d = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(row.iv, 'base64'));
  d.setAAD(aad);
  d.setAuthTag(Buffer.from(row.tag, 'base64'));
  return JSON.parse(Buffer.concat([d.update(Buffer.from(row.ciphertext, 'base64')), d.final()]).toString('utf8'));
}
