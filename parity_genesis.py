import pandas as pd

genesis_header = """
{
  "name": "CallistoTestnet",
  "dataDir": "CallistoTestnet",
  "engine": {
    "Ethash": {
      "params": {
        "minimumDifficulty": "0x020000",
        "difficultyBoundDivisor": "0x0800",
        "durationLimit": "0x0d",
        "blockReward": "0x2086ac351052600000",
        "homesteadTransition": 0,
        "eip150Transition": 0,
        "eip160Transition": 10,
        "eip161abcTransition": 10,
        "eip161dTransition": 10,
        "eip100bTransition": 20,
        "eip649Transition": 20,
        "eip649Reward": "0x29A2241AF62C0000",
        "callistoTransition": 0,
        "callistoMinerReward": "0x16c4abbebea0100000",
        "callistoTreasuryAddress": "0x74682Fc32007aF0b6118F259cBe7bCCC21641600",
        "callistoTreasuryReward": "0x68155a43676e00000",
        "callistoStakeAddress": "0x3c06f218Ce6dD8E2c535a8925A2eDF81674984D9",
        "callistoStakeReward": "0x340aad21b3b700000"
      }
    }
  },
  "params": {
    "gasLimitBoundDivisor": "0x0400",
    "registrar": "0xc3F70b10CE5EC4aA47ce44Eb0B7900A883cd45Dd",
    "accountStartNonce": "0x00",
    "maximumExtraDataSize": "0x20",
    "minGasLimit": "0x1388",
    "networkID": "0x1eef",
    "maxCodeSize": 24576,
    "eip86Transition": "0xffffffffffffffff",
    "eip98Transition": "0xffffffffffffffff",
    "eip155Transition": 10,
    "eip140Transition": 20,
    "eip211Transition": 20,
    "eip214Transition": 20,
    "eip658Transition": 20
  },
  "genesis": {
    "seal": {
      "ethereum": {
        "nonce": "0x0000000000000000",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    },
    "difficulty": "0x080000",
    "author": "0xc3F70b10CE5EC4aA47ce44Eb0B7900A883cd45Dd",
    "timestamp": "0x5a939845",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "gasLimit": "0x47b760"
  },
  "nodes": [
    "enode://960fe04f86af9fc61609b79200049333beae15583e343c298b4a676041f0f452329ff3e7bd41651663f82b56f82b3f98fdf85d16f311fa40a00fc900b3db6d7a@159.203.121.76:30303"
  ],
  "accounts": {
    "0000000000000000000000000000000000000005": {
	  "balance": "1",
      "builtin": {
        "name": "modexp",
        "activate_at": "0x00",
        "pricing": {
          "modexp": {
            "divisor": 20
          }
        }
      }
    },
    "0000000000000000000000000000000000000006": {
	  "balance": "1",
      "builtin": {
        "name": "alt_bn128_add",
        "activate_at": "0x00",
        "pricing": {
          "linear": {
            "base": 500,
            "word": 0
          }
        }
      }
    },
    "0000000000000000000000000000000000000007": {
	  "balance": "1",
      "builtin": {
        "name": "alt_bn128_mul",
        "activate_at": "0x00",
        "pricing": {
          "linear": {
            "base": 40000,
            "word": 0
          }
        }
      }
    },
    "0000000000000000000000000000000000000008": {
	  "balance": "1",
      "builtin": {
        "name": "alt_bn128_pairing",
        "activate_at": "0x00",
        "pricing": {
          "alt_bn128_pairing": {
            "base": 100000,
            "pair": 80000
          }
        }
      }
    }"""

addresses_df = pd.read_csv(
    'snapshot/snapshot_0001.txt',
    header=None, names=['id', 'address', 'balance']
)

account_format = ',\n"{0}": {{"balance": "{1}"}}'

with open('parity_genesis.json', 'a') as genesis_file:
    genesis_file.write(genesis_header)
    for row in addresses_df.itertuples():
        genesis_file.write(
            account_format.format(
                row.address, row.balance
            )
        )
    genesis_file.write("""
  }
}
    """)
