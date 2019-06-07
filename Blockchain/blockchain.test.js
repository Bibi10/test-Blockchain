const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain',  () => {
  let bc, bc2;

  beforeEach(() => {  
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('Start with the Genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('Add a new block', () => {
    const data = 'foo';
    bc.addBlock(data);

    expect(bc.chain[bc.chain.length-1].data).toEqual(data);
  });

  it('Validate a valid chain', () => {
    bc2.addBlock('foo');

    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('invalidates a valid chain with a corrupt genesis block', () => {
    bc2.chain[0].data = 'Bad data';

    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('invalidates a corrupt chain', () => {
    bc2.addBlock('foo');
    bc2.chain[1].data = 'Not foo';

   expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('Replace the chain with a valid chain', () => {
    bc2.addBlock('doo');
    bc2.replaceChain(bc2.chain); 

   expect(bc2.chain).toEqual(bc2.chain);
  });

  it('Does not replace the chain with one of less than or equal to less than the actual Chain length', () => {
    bc.addBlock('foo');
    bc2.replaceChain(bc2.chain); 

    expect(bc.chain).not.toEqual(bc2.chain);
  })

});