interface Blocks {
  hash: string;
  height: number;
  time: number;
  block_index: number;
}

interface BlockHash {
  hash: string
  ver: number,
  prev_block: string,
  mrkl_root: string,
  time: number,
  bits: number,
  nonce: number,
  n_tx: number,
  size: number,
  block_index: number,
  main_chain: boolean,
  height: number,
  received_time: number,
  relayed_by: string,
  tx: []
}

interface Transaction {
    hash: string,
    ver: number,
    vin_sz: number,
    vout_sz: number,
    lock_time: string,
    size: number,
    relayed_by: string,
    block_height: number,
    tx_index: number,
    inputs: [],
    out: []
}

export {Blocks, BlockHash, Transaction}