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

  static genesis() {    //Calling without making instance and only use it in this block

      return  new this('Genesis time', '-----', 'f1r57- h45H, []')  //This represent the class itself
  }

}

module.exports  = Block;