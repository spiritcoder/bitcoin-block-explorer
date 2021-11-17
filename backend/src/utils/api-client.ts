import axios, { AxiosResponse } from "axios";
const baseUrl: string = "https://blockchain.info";
import { Blocks, BlockHash, Transaction } from "../model/blocks";



const getBlocks = async (time: string) => {
  let result: AxiosResponse = await axios.get(
    `${baseUrl}/blocks/${time}?format=json`
  );
  let blocks: [Blocks] = result.data;
  return blocks;
};

const getBlockWithBlockHash = async (hash: string) => {
  let result: AxiosResponse = await axios.get(`${baseUrl}/rawblock/${hash}`);
  let blockHash: [BlockHash] = result.data;
  return blockHash;
}

const getTransactionWithHash = async (hash: string) => {
  let result: AxiosResponse = await axios.get(`${baseUrl}/rawtx/${hash}`);
  let transactionHash: Transaction = result.data;
  return transactionHash;
}

export { getBlocks, getBlockWithBlockHash, getTransactionWithHash };
