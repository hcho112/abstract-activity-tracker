"use server";

import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

const RPC_URL = "https://api.mainnet.abs.xyz";

export interface TransactionCountResult {
  address: string;
  count: number | null;
  error?: string;
}

async function fetchRpcNonce(address: string): Promise<number> {
  try {
    const payload = {
      jsonrpc: "2.0",
      method: "eth_getTransactionCount",
      params: [address, "latest"],
      id: 1,
    };

    const response = await axios.post(RPC_URL, payload);
    
    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    const countHex = response.data.result;
    return parseInt(countHex, 16);
  } catch (error) {
    console.error(`RPC Error for ${address}:`, error);
    throw error;
  }
}

export async function fetchTransactionCountAction(address: string): Promise<number> {
  try {
    const explorerUrl = `https://abscan.org/address/${address}`;
    
    const config: any = {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
      },
      timeout: 5000
    };

    // Add Proxy support if env var is set
    if (process.env.PROXY_URL) {
      config.httpsAgent = new HttpsProxyAgent(process.env.PROXY_URL);
      config.proxy = false; // Disable axios default proxy handling
    }
    
    const response = await axios.get(explorerUrl, config);

    const html = response.data;
    const match = html.match(/Transactions:\s*([\d,]+)/);
    
    if (match && match[1]) {
      const countStr = match[1].replace(/,/g, "");
      return parseInt(countStr, 10);
    }

    console.warn(`Scraping failed for ${address}, falling back to RPC Nonce.`);
    return await fetchRpcNonce(address);

  } catch (error) {
    console.error(`Error fetching data for ${address}:`, error);
    try {
      return await fetchRpcNonce(address);
    } catch {
      throw error;
    }
  }
}

export async function fetchBatchTransactionCountsAction(addresses: string[]): Promise<TransactionCountResult[]> {
  const promises = addresses.map(async (addr) => {
    try {
      const count = await fetchTransactionCountAction(addr.trim());
      return { address: addr, count };
    } catch {
      return { address: addr, count: null, error: "Failed to fetch" };
    }
  });

  return Promise.all(promises);
}
