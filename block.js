const SHA256 =  require('crypto-js/sha256')

class Block {
  constructor( timestamp, lastHash, Hash, data) {
    this.timestamp  = timestamp;  //Bind timestamp value and bind it to timesamp property
    this.lastHash = lastHash;
    this.Hash = Hash;
    this.data = data;
  }

  toString(){
    return `Block - 
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash.substring(0,10)}
      Hash      : ${this.Hash.substring(0,10)}
      Data      : ${this.data}`;
  }

  static genesis() {    //Calling without making new instance and only use with/in this block
      return new this('timestamp', '-----', 'f1r57-h45H', [])  //This represent the class itself
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();   
    const lastHash  = lastBlock.Hash; //
    const Hash      = Block.Hash(timestamp, lastHash, data);

    return new this (timestamp, lastHash, Hash, data)
  }

  static Hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp} ${lastHash} ${data}`).toString();
  }
}

module.exports  = Block;