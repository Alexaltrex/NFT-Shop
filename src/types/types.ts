import {BigNumber} from "ethers";

export interface ITokenJson {
    description: string
    image: string
    name: string
    edition: number
    attributes: {
        trait_type: string
        value: string
    }[]
}

export interface IAuctionResponse {
    tokenId: BigNumber
    seller: string
    startAt: BigNumber
    price: BigNumber
}

export interface IAuction {
    tokenId: number
    seller: string
    startAt: number
    price: number
}

export interface IAuctionWithURI extends IAuction {
    tokenUri: string
}

export interface IAuctionWithJson extends IAuction {
    json: ITokenJson
}

export interface IShopToken {
    tokenId: number
    tokenUri: string
}

export interface IAccountToken extends IShopToken {
    isTokenOnAuction: boolean
    price: number
}

export interface IAccountTokenWithJson {
    tokenId: number
    json: ITokenJson
    isTokenOnAuction: boolean
    price: number
}
