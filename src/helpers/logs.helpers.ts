import {getDate} from "./helpers";
import {
    AddTokenToAuctionUnhandledType,
    BuySellShopLogUnhandledType, BuyTokenFromAuctionUnhandledType,
    PriceLogUnhandledType,
    RemoveTokenFromAuctionUnhandledType
} from "../types/log.type";

export const priceLogArgsHandler = (args: PriceLogUnhandledType) => (
    args ? ({
        oldValue: String(args[0].toNumber()),
        newValue: String(args[1].toNumber()),
        timestamp: getDate(args[2].toNumber()),
    }) : ({
        oldValue: '',
        newValue: '',
        timestamp: '',
    })
);

export const buyFromShopLogArgsHandler = (args: BuySellShopLogUnhandledType) => (
    args ? ({
        buyer: args[0],
        tokenId: String(args[1].toNumber()),
        price: String(args[2].toNumber()),
        timestamp: getDate(args[3].toNumber()),
    }) : ({
        buyer: '',
        tokenId: '',
        price: '',
        timestamp: '',
    })
);

export const sellToShopLogArgsHandler = (args: BuySellShopLogUnhandledType) => (
    args ? ({
        seller: args[0],
        tokenId: String(args[1].toNumber()),
        price: String(args[2].toNumber()),
        timestamp: getDate(args[3].toNumber()),
    }) : ({
        seller: '',
        tokenId: '',
        price: '',
        timestamp: '',
    })
);

export const addTokenToAuctionLogArgsHandler = (args: AddTokenToAuctionUnhandledType) => (
    args ? ({
        tokenId: String(args[0].toNumber()),
        seller: args[1],
        startAt: getDate(args[2].toNumber()),
        price: String(args[3].toNumber()),
    }) : ({
        tokenId: '',
        seller: '',
        startAt: '',
        price: '',
    })
);

export const removeTokenFromAuctionLogArgsHandler = (args: RemoveTokenFromAuctionUnhandledType) => (
    args ? ({
        tokenId: String(args[0].toNumber()),
        seller: args[1],
        timestamp: getDate(args[2].toNumber()),

    }) : ({
        tokenId: "",
        seller: "",
        timestamp: "",
    })
);

export const buyTokenFromAuctionLogArgsHandler = (args: BuyTokenFromAuctionUnhandledType) => (
    args ? ({
        tokenId: String(args[0].toNumber()),
        price: String(args[1].toNumber()),
        buyer: args[2],
        timestamp: getDate(args[3].toNumber()),

    }) : ({
        tokenId: "",
        price: "",
        buyer: "",
        timestamp: "",
    })
);
