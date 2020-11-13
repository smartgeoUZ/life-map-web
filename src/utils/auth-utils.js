import {CONSTANTS} from '../utils/constants'

const crypto = require('crypto');
// const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);


/**
 * Check Token reg date is actual
 * @param authDate
 * @returns {boolean}
 */
export function tokenDateIsExpired(authDate) {
    let authEndDate = (authDate + 86400) * 1000 * 5

    // console.log(Date.now())
    // console.log(authEndDate)

    return Date.now() > authEndDate;
}

/**
 * Check Telegram Token
 * @param hash
 * @param data
 * @returns {boolean}
 */
export function checkSignature({hash, ...data}) {
    const {createHash, createHmac} = require('crypto');
    // console.log(data)

    const secret = createHash('sha256')
        .update(CONSTANTS.BOT_TOKEN)
        .digest()

    const checkString = Object.keys(data)
        .sort()
        .map(k => (`${k}=${data[k]}`))
        .join('\n');

    const hmac = createHmac('sha256', secret)
        .update(checkString)
        .digest('hex');

    return hmac === hash;
}

/**
 * Check auth Date
 * @param hash
 * @param data
 * @returns {boolean}
 */
export function checkAuthDate(authDate) {
    if (!authDate) {
        return false
    }
    return tokenDateIsExpired(authDate)
}


// /**
//  * Check Telegram Token
//  * @param hash
//  * @param data
//  * @returns {boolean}
//  */
// export function checkTelegramToken(CONSTANTS, baseToken) {
//     if (!token) {
//         return false
//     }
//
//     console.log(token)
//     console.log(baseToken)
//     let hw = encrypt(baseToken)
//     console.log(hw)
//     console.log(decrypt(hw))
// }


export function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')};
}

export function decrypt(text) {
    try {
        let iv = Buffer.from(text.iv, 'hex');
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (e) {
        console.log(e.message)
    }
}

