#!/usr/bin/python3
import os
import time
import pandas as pd

from pathlib import Path

from web3 import Web3, IPCProvider
from pathlib import Path

ipc_file = os.path.join(Path.home(), '.callisto/testnet/geth.ipc')

sending_account = "0x183394f52b2c8c034835edba3bcececa6f60b5a8"

web3 = Web3(IPCProvider(ipc_file))

addresses_df = pd.read_csv(
    'snapshot/snapshot_0001.txt',
    header=None, names=['id', 'address', 'balance']
)

transactions_count = web3.eth.getTransactionCount(sending_account)

for row in addresses_df.itertuples():
    counting = int(transactions_count)
    web3.eth.sendTransaction({
        'from': sending_account,
        'to': row.address,
        'value': row.balance,
        'gas': 21000,
        'gasPrice': 1000000000,
        'nonce': counting,
    })
    print("Address:",row.address,"Nonce:",counting)
    transactions_count += 1
    time.sleep(0.1)
