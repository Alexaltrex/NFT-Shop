import {BigNumber} from "ethers";

// Price
export interface IPriceLog {
    oldValue: string
    newValue: string
    timestamp: string
}
export type PriceLogUnhandledType = undefined | [BigNumber, BigNumber, BigNumber];

// Buy From Shop
export interface IBuyFromShopLog {
    buyer: string
    tokenId: string
    price: string
    timestamp: string
}

// Sell To Shop
export interface ISellToShopLog {
    seller: string
    tokenId: string
    price: string
    timestamp: string
}
export type BuySellShopLogUnhandledType = undefined | [string, BigNumber, BigNumber, BigNumber];

// AddTokenToAuction
export interface IAddTokenToAuctionLog {
    tokenId: string
    seller: string
    startAt: string
    price: string
}
export type AddTokenToAuctionUnhandledType = undefined | [BigNumber, string, BigNumber, BigNumber];

// RemoveTokenFromAuction
export interface IRemoveTokenFromAuctionLog {
    tokenId: string
    seller: string
    timestamp: string
}
export type RemoveTokenFromAuctionUnhandledType = undefined | [BigNumber, string, BigNumber];

// BuyTokenFromAuction
export interface IBuyTokenFromAuctionLog {
    tokenId: string
    price: string
    buyer: string
    timestamp: string
}
export type BuyTokenFromAuctionUnhandledType = undefined | [BigNumber, BigNumber, string, BigNumber];
