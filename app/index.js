const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require('../blockchain')
const P2server = require('./p2p-server')
const Wallet = require('../wallet')
const TransactionPool = require('../wallet/transaction-pool')
const Miner = require('./miner')

const HTTP_PORT = process.env.HTTP_PORT || 3001

const app = express()
const bc = new Blockchain()
const wallet = new Wallet()
const tp = new TransactionPool()
const P2Server = new P2server(bc, tp)
const miner = new Miner(bc, tp, wallet, P2Server)

app.use(bodyParser.json())

app.get('/blocks', (req, res) => {
  res.json(bc.chain)
})

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data)
  console.log(`New block added: ${block.toString()}`)

  P2Server.syncChains()

  res.redirect('/blocks')
})

app.get('/transactions', (req, res) => {
  res.json(tp.transactions)
})

app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body
  const transaction = wallet.createTransaction(recipient, amount, bc, tp)
  P2Server.broadcastTransaction(transaction)
  res.redirect('/transactions')
})

app.get('/mine-transactions', (req, res) => {
  const block = miner.mine()
  console.log(`New block added: ${block.toString()}`)
  res.redirect('/blocks')
})

app.get('/public-key', (req, res) => {
  res.json({ publicKey: wallet.publicKey })
})

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))
P2Server.listen()
