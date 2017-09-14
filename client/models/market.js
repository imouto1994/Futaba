// @flow

export type Market = {
  MarketName: string,
  Last: number,
  Bid: number,
  Ask: number,
  High: number,
  Low: number,
  Volume: number,
  BaseVolume: number,
};

const DEFAULT_MARKET: Market = {
  MarketName: "",
  Last: 0,
  Bid: 0,
  Ask: 0,
  High: 0,
  Low: 0,
  Volume: 0,
  BaseVolume: 0,
};

export function createMarket(market: any = {}): Market {
  return {
    ...DEFAULT_MARKET,
    ...market,
  };
}

export function isValidMarket(market: any = {}): boolean {
  return market != null && !!market.MarketName;
}
