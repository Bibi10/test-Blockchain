const Block = require('./block')

// const fooBlock = Block.mineBlock(Block.genesis(), ['Gbanha','foo','Blabla']);
// console.log(fooBlock.toString());

describe('Block', () => {
  let data, lastBlock, block;

  beforeEach(() =>  {
     data      = 'bar';
     lastBlock = Block.genesis();
     block     = Block.mineBlock(lastBlock, data);
  })

  it('Sets the `data` to match the input',  () => {
    expect(block.data).toEqual(data);

  });

  it('sets the `lastHash` to match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.Hash);
  });
});