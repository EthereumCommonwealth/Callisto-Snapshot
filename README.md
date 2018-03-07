# Callisto-Snapshot

Callisto Snapshot script and result

## Requirements

- Node >6 LTS (Tested with Node 8 LTS)
- Parity with RPC available and `--fat-db=on` flag.

## Snapshot info

The snapshot info has a JSON object with the address as key and the balance **in wei** as value.

Example:

```
{"0x0000000000000000000000000000000000000001":"1","0x6b83f808fce08f51adb2e9e35a21a601e702785f":"3658842135483472000000000","0x0000000000000000000000000000000000000005":"1","0x46739b691c011530aaf480aacd339c206a2046e6":"5843750000000000000","0x0000000000000000000000000000000000000008":"1","0x0000000000000000000000000000000000000003":"1","0x0000000000000000000000000000000000000006":"1","0x3c06f218ce6dd8e2c535a8925a2edf81674984d9":"1971720000000000000000000","0x0000000000000000000000000000000000000007":"1","0x0000000000000000000000000000000000000004":"1","0xc3f70b10ce5ec4aa47ce44eb0b7900a883cd45dd":"1999999999999958000000000000000","0x74682fc32007af0b6118f259cbe7bccc21641600":"3943440000000000000000000","0x6c525b3c87922ab8dd06c9f215355b832215df1b":"288439023366528000000000","0x0000000000000000000000000000000000000002":"1","0xe13b6676b18e1787c7ef88aa33e9cee2f1c18e43":"2909908200000000000000","0xbfc77e6510eaf0474469d65e64e77a7de0607929":"9900326881200000000000000"}
```

## Run

- `node index.js <block_number>`

`<block_number>` -> MUST be a valid block number.

The script will write a file called snapshot.json with the snapshot info.

## NOTE

`node_modules` exists in the repo because we did a little change on `web3/lib/web3/methods/parity.js` allowing fetch info of `listAccounts` method specifying the block number.

```
var listAccounts = new Method({
    name: 'listAccounts',
    call: 'parity_listAccounts',
    params: 3 // Before value: 2
});
```
