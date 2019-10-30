#!/usr/bin/python3
import pandas as pd

from web3 import Web3

genesis_header = """
{
  "config": {
    "chainId": 7919,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 1,
    "eip158Block": 2,
    "byzantiumBlock": 3,
    "callistoBlock": 1,
    "callistoMinerReward": 420000000000000000000,
    "callistoTreasuryAddress": "0x74682Fc32007aF0b6118F259cBe7bCCC21641600",
    "callistoTreasuryReward": 120000000000000000000,
    "callistoStakeAddress": "0x3c06f218Ce6dD8E2c535a8925A2eDF81674984D9",
    "callistoStakeReward": 60000000000000000000
  },
  "nonce": "0x0000000000000042",
  "timestamp": "0x00",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0x1000000",
  "difficulty": "0x10000",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "alloc": {
    "0000000000000000000000000000000000000005": {
      "balance": "0x1"
    },
    "0000000000000000000000000000000000000006": {
      "balance": "0x1"
    },
    "0000000000000000000000000000000000000007": {
      "balance": "0x1"
    },
    "0000000000000000000000000000000000000008": {
      "balance": "0x1"
    }"""

addresses_df = pd.read_csv(
    'snapshot/snapshot_0001.txt',
    header=None, names=['id', 'address', 'balance']
)

account_format = ',\n"{0}": {{"balance": "{1}"}}'

with open('geth_genesis.json', 'a') as genesis_file:
    genesis_file.write(genesis_header)
    for row in addresses_df.itertuples():
        genesis_file.write(
            account_format.format(
                row.address, Web3.toHex(int(row.balance))
            )
        )
    genesis_file.write("""
  }
}
    """)
