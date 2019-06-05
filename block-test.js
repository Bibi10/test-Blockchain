const Block = require('./block')

const fooBlock = Block.mineBlock(Block.genesis(), ['Gbanha','foo','Blabla']);
console.log(fooBlock.toString());

