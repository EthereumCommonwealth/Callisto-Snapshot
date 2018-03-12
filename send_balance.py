import time
import pandas as pd

from web3 import Web3, IPCProvider

web3 = Web3(IPCProvider)

addresses_df = pd.read_csv(
    'snapshot/snapshot_0001.txt',
    header=None, names=['id', 'address', 'balance']
)

total_balance = 0
transactions_count = 0

with open('geth_genesis.json', 'a') as genesis_file:
    for row in addresses_df.itertuples():
        transactions_count += 1
        web3.eth.sendTransaction({
            'from': web3.eth.coinbase,
            'to': row.address,
            'value': int(row.balance),
            'gas': 21000,
            'gasPrice': 1800000000000,
        })
        total_balance += int(row.balance)

        if transactions_count == 1000:
            time.sleep(60)

print(total_balance)
