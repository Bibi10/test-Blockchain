//Adding Block Mining endpoints
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2Server = new P2Server(bc, tp);

const miner = new Miner(bc, tp, wallet, p2Server);

app.use(bodyParser.json());

app.post('/transact', (req, res) => {
  res.redirect('/transactions');
});

app.get('/mine-transactions', (req, res) => {
  const block = miner.mine();
  console.log(`Add new Block: ${block.toString()}`);
  res.redirect('/blocks');
});

app.get('/public-key', (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});