import { Request, Response } from "express";
import { BadRequestError } from "../errors/error-handler";
import { getBlocks, getBlockWithBlockHash, getTransactionWithHash } from "../utils/api-client";
import { createResponse } from "../utils/create-response";

class BlockController {

  getBlocks = async (req: Request, res: Response) => {
    let blocks = await getBlocks(req.params.time);
    createResponse(res, 200, "gotten blocks", blocks)
  }

  getABlock = async (req: Request, res: Response) => {
    let blockTransactions = await getBlockWithBlockHash(req.params.hash);
    createResponse(res, 200, "block transactions", blockTransactions)
  }
}

export const blockController = new BlockController();