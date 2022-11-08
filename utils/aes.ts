import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const TAG_POSITION = SALT_LENGTH + IV_LENGTH;
const ENCRYPTED_POSITION = TAG_POSITION + TAG_LENGTH;


function getKey(salt: Buffer, secret: string) {

    return crypto.pbkdf2Sync(secret, salt, 100000, 32, 'sha512');
}

export function encrypt(plainText: string, secret: any) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const salt = crypto.randomBytes(SALT_LENGTH);

    const key = getKey(salt, secret);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    const encrypted = Buffer.concat([
        cipher.update(String(plainText), 'utf8'),
        cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
}

export function decrypt(cipherText: string | string[] | undefined, secret: any) {
    const stringValue = Buffer.from(String(cipherText), 'base64');

    const salt = stringValue.slice(0, SALT_LENGTH);
    const iv = stringValue.slice(SALT_LENGTH, TAG_POSITION);
    const tag = stringValue.slice(TAG_POSITION, ENCRYPTED_POSITION);
    const encrypted = stringValue.slice(ENCRYPTED_POSITION);

    const key = getKey(salt, secret);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    decipher.setAuthTag(tag);

    console.log('d', decipher.update(encrypted))

    //return decipher.update(encrypted) + decipher.final('utf8');
    return decipher.update(encrypted);
}
