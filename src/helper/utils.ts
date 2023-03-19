import * as crypto from 'crypto';

// For hashing passwords
export default class utils {
    static hash256(str: string) {
        // create a sha-256 hasher
        const sha256Hasher = crypto.createHmac('sha256', process.env.APP_SECRET);
        // hash the string
        return sha256Hasher.update(str).digest('hex');
    }
}