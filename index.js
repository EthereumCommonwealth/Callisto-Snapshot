const net = require('net')
const fs = require('fs')
const Web3 = require('web3')

const snapshotBlock = process.argv[2] || "5500000" // ETC block

const ipcPath = process.env["HOME"] + "/.local/share/io.parity.ethereum/jsonrpc.ipc";

let web3 = new Web3();
web3.setProvider(new web3.providers.IpcProvider(ipcPath, net));

let snapshot = {}

const getAccounts = (accountOffset, callback) => {
  return web3.parity.listAccounts(
    5, accountOffset, web3.toHex(snapshotBlock), function (err, result) {
      if (err) {
        console.log(err)
        process.exit(1)
      }
      callback(result)
    }
  )
}

const getBalance = (account) => {
  web3.eth.getBalance(account, web3.toHex(snapshotBlock), (err, result) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    snapshot[account] = result.toString(10)
  })
}

const writeJSONFile = () => {
  fs.writeFileSync('snapshot.json', JSON.stringify(snapshot));
}

const getBalances = (accounts) => {
  if (accounts.length === 0) {
    writeJSONFile()
    process.exit()
  }

  accounts.forEach((account, idx) => {
    getBalance(account)
    if (idx === accounts.length - 1) {
      console.log("Last address: ", account)
      makeSnapshot(account)
    }
  })
}

const makeSnapshot = (accountOffset) => {
  getAccounts(accountOffset, getBalances)
}

makeSnapshot(null)
