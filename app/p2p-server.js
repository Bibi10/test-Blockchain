//Creating a P2P server  fro Nodes

const Websocket = require('ws')

const P2_PORT = process.env.P2_PORT || 5010

const peers = process.env.PEERS ? process.env.PEERS.split(',') : [] //peers COnnections
const MESSAGE_TYPES = {
  chain: 'CHAIN',
  transaction: 'TRANSACTION',
  clear_transactions: 'CLEAR_TRANSACTIONS'
}

class P2Server {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain
    this.transactionPool = transactionPool
    this.sockets = []
  }

  listen() {
    const server = new Websocket.Server({ port: P2_PORT })
    server.on('connection', socket => this.connectToSocket(socket))

    this.connectToPeers()

    console.log(`Listeningon POrt: ${P2_PORT}`)
  }

  connectToPeers() {
    peers.forEach(peer => {
      const socket = new Websocket(peer)

      socket.on('open', () => this.connectToSocket(socket))
    })
  }

  connectToSocket(socket) {
    this.sockets.push(socket)

    this.messageHandler(socket)

    this.sendChain(socket)
  }

  messageHandler(socket) {
    //handle message from peers
    socket.on('message', message => {
      const data = JSON.parse(message)
      switch (data.type) {
        case MESSAGE_TYPES.chain:
          this.blockchain.replaceChain(data.chain)
          break
        case MESSAGE_TYPES.transaction:
          this.transactionPool.updateOrAddTransaction(data.transaction)
          break
        case MESSAGE_TYPES.clear_transactions:
          this.transactionPool.clear()
          break
      }
    })
  }

  sendChain(socket) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.chain,
        chain: this.blockchain.chain
      })
    )
  }

  sendTransaction(socket, transaction) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.transaction,
        transaction
      })
    )
  }

  syncChains() {
    this.sockets.forEach(socket => this.sendChain(socket)) //Synch chain accross peerw
  }

  broadcastTransaction(transaction) {
    this.sockets.forEach(socket => this.sendTransaction(socket, transaction)) //Sharing the transaction accross peers
  }

  broadcastClearTransactions() {
    this.sockets.forEach(socket =>
      socket.send(
        JSON.stringify({
          type: MESSAGE_TYPES.clear_transactions
        })
      )
    )
  }
}

module.exports = P2Server
