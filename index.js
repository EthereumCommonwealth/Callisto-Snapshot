require("@babel/register")({
  presets: ["@babel/preset-env"]
});

const net = require('net')
const fs = require('fs')
const Web3 = require('web3')

const snapshotBlock = process.argv[2] || "5500000" // ETC block

const cutoff = process.argv[3] ||  10000000000000000  // 0.01 Ether cutoff

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://127.0.0.1:8546`));

const Parity = require("./lib/parity").Parity;
web3.parity = new Parity(web3.currentProvider);

let snapshot = []
let accounts_count = 0
let accounts_checked = 0

const getAccounts = (accountOffset, callback) => {
  return web3.parity.listAccounts(
    1000, accountOffset, web3.utils.toHex(snapshotBlock), function (err, result) {
      if (err) {
        console.log(err)
        process.exit(1)
      }
      callback(result)
    }
  )
}

const getBalance = (account) => {
  web3.eth.getBalance(account, web3.utils.toHex(snapshotBlock), (err, result) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    if (result < cutoff) {
      return // excluding address with small balance
    } else {
      // get contract account type
      web3.eth.getCode(account, (err, code) => {
        if (err) {
          console.log(err)
          process.exit(1)
        }
        if (code.length > 2) {
          return // excluding contract address
        }
        let balance = result.toString(10);
        accounts_count++
        snapshot.push({"address": account, "balance": balance})
      })
    }
  })
}

const writeFile = () => {
  let stream = fs.createWriteStream("snapshot.txt", {flags:'a'})
  for (var i = 0, len = snapshot.length; i < len; i++) {
    let account = snapshot.shift()
    stream.write(`${i},${web3.utils.toChecksumAddress(account.address)},${account.balance}\n`)
  }
  console.log(`Account #${accounts_count} ${new Date().toISOString()}`)
  stream.end()
}

const getBalances = (accounts) => {
  if (accounts.length === 0) {
    writeFile()
    process.exit()
  }

  for (var i = 0, len = accounts.length; i < len; i++) {
    accounts_checked++
    let account = accounts[i]
    getBalance(account)
    if (i === accounts.length - 1) {
      console.log(`Last address: ${account} - Accounts checked ${accounts_checked} - Accounts count ${accounts_count}`)
      writeFile()
      makeSnapshot(account)
    }
  }
}

const makeSnapshot = (accountOffset) => {
  getAccounts(accountOffset, getBalances)
}

makeSnapshot(null)
