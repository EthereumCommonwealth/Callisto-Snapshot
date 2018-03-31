import pandas as pd

from web3 import Web3

genesis_header = """
{
  "config": {
    "chainId": 7919,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 10,
    "eip158Block": 10,
    "byzantiumBlock": 20,
    "callistoBlock": 0,
    "callistoMinerReward": 420000000000000000000,
    "callistoTreasuryAddress": "0x74682Fc32007aF0b6118F259cBe7bCCC21641600",
    "callistoTreasuryReward": 120000000000000000000,
    "callistoStakeAddress": "0x3c06f218Ce6dD8E2c535a8925A2eDF81674984D9",
    "callistoStakeReward": 60000000000000000000
  },
  "nonce": "0x0000000000000000",
  "timestamp": "0x5a939845",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0x47b760",
  "difficulty": "0x080000",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0xc3F70b10CE5EC4aA47ce44Eb0B7900A883cd45Dd",
  "alloc": {
    "0000000000000000000000000000000000000001": {
      "balance": "0x1"
    },
    "0000000000000000000000000000000000000002": {
      "balance": "0x1"
    },
    "0000000000000000000000000000000000000003": {
      "balance": "0x1"
    },
    "0000000000000000000000000000000000000004": {
      "balance": "0x1"
    },
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

total_balance = 0

with open('geth_genesis.json', 'a') as genesis_file:
    genesis_file.write(genesis_header)
    for row in addresses_df.itertuples():
        total_balance += int(row.balance)
    genesis_file.write(account_format.format('0x183394f52b2c8c034835edba3bcececa6f60b5a8', total_balance))
    genesis_file.write("""
  }
}
    """)
