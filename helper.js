// https://github.com/indutny/elliptic
// https://github.com/cryptocoinjs/secp256k1-node
// https://www.npmjs.com/package/uuid
// https://www.npmjs.com/package/crypto-js

const EC = require('elliptic').ec
const SHA256 = require('crypto-js/sha256')
const uuidV1 = require('uuid/v1')
const ec = new EC('secp256k1')

class Helper {
  static genKeyPair() {
    return ec.genKeyPair()
  }

  static id() {
    return uuidV1()
  }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString()
  }

  static verifySignature(publicKey, signature, dataHash) {
    return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature)
  }
}

module.exports = Helper

//Contain our signature verification for any Block Creation (Block = Public Key + Signature(previous Hash + Actual Hash) )
