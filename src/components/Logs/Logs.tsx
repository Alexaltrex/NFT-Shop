import React, {useEffect, useState} from "react";
import style from "./Logs.module.scss"
import {Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {
    AddTokenToAuctionUnhandledType,
    BuySellShopLogUnhandledType, BuyTokenFromAuctionUnhandledType, IAddTokenToAuctionLog,
    IBuyFromShopLog, IBuyTokenFromAuctionLog,
    IPriceLog, IRemoveTokenFromAuctionLog,
    ISellToShopLog,
    PriceLogUnhandledType, RemoveTokenFromAuctionUnhandledType
} from "../../types/log.type";
import {chainId, getProvider, getShopContract} from "../../helpers/ethers.helper";
import {
    addTokenToAuctionLogArgsHandler,
    buyFromShopLogArgsHandler, buyTokenFromAuctionLogArgsHandler,
    priceLogArgsHandler, removeTokenFromAuctionLogArgsHandler,
    sellToShopLogArgsHandler
} from "../../helpers/logs.helpers";
import {LogsTable} from "./LogsTable/LogsTable";

export const Logs = observer(() => {
    const {cryptoStore: {errorHandler}} = useStore();

    const [buyPriceLogs, setBuyPriceLogs] = useState<IPriceLog[]>([]);
    const [sellPriceLogs, setSellPriceLogs] = useState<IPriceLog[]>([]);
    const [buyFromShopLogs, setBuyFromShopLogs] = useState<IBuyFromShopLog[]>([]);
    const [sellToShopLogs, setSellToShopLogs] = useState<ISellToShopLog[]>([]);
    const [addTokenToAuctionLogs, setAddTokenToAuctionLogs] = useState<IAddTokenToAuctionLog[]>([]);
    const [removeTokenFromAuctionLogs, setRemoveTokenFromAuctionLogs] = useState<IRemoveTokenFromAuctionLog[]>([]);
    const [buyTokenFromAuctionLogs, setBuyTokenFromAuctionLogs] = useState<IBuyTokenFromAuctionLog[]>([]);

    //========= GET BUY PRICE LOGS =========//
    const getBuyPriceLogs = async () => {
        try {
            if (window.ethereum) {
                const provider = getProvider();
                const contract = getShopContract(provider);
                const filter = contract.filters.BuyPriceChange();
                const logs = await contract.queryFilter(filter);
                setBuyPriceLogs(logs.map(({args}: { args: PriceLogUnhandledType }) => priceLogArgsHandler(args)))
            }
        } catch (e: any) {
            errorHandler(e)
        }
    }

    //========= GET SELL PRICE LOGS =========//
    const getSellPriceLogs = async () => {
        try {
            if (window.ethereum) {
                const provider = getProvider();
                const contract = getShopContract(provider);
                const filter = contract.filters.SellPriceChange();
                const logs = await contract.queryFilter(filter);
                setSellPriceLogs(logs.map(({args}: { args: PriceLogUnhandledType }) => priceLogArgsHandler(args)))
            }
        } catch (e: any) {
            errorHandler(e)
        }
    }

    //========= GET BUY FROM SHOP LOGS =========//
    const getBuyFromShopLogs = async () => {
        try {
            if (window.ethereum) {
                const provider = getProvider();
                const contract = getShopContract(provider);
                const filter = contract.filters.BuyFromShop();
                const logs = await contract.queryFilter(filter);
                setBuyFromShopLogs(logs.map(({args}: { args: BuySellShopLogUnhandledType }) => buyFromShopLogArgsHandler(args)))
            }
        } catch (e: any) {
            errorHandler(e)
        }
    }

    //========= GET SELL TO SHOP LOGS =========//
    const getSellToShopLogs = async () => {
        try {
            if (window.ethereum) {
                const provider = getProvider();
                const contract = getShopContract(provider);
                const filter = contract.filters.SellToShop();
                const logs = await contract.queryFilter(filter);
                setSellToShopLogs(logs.map(({args}: { args: BuySellShopLogUnhandledType }) => sellToShopLogArgsHandler(args)))
            }
        } catch (e: any) {
            errorHandler(e)
        }
    }

    //========= GET ADD TOKEN TO AUCTION LOGS =========//
    const getAddTokenToAuctionLogs = async () => {
        try {
            if (window.ethereum) {
                const provider = getProvider();
                const contract = getShopContract(provider);
                const filter = contract.filters.AddTokenToAuction();
                const logs = await contract.queryFilter(filter);
                setAddTokenToAuctionLogs(logs.map(({args}: { args: AddTokenToAuctionUnhandledType }) => addTokenToAuctionLogArgsHandler(args)))
            }
        } catch (e: any) {
            errorHandler(e)
        }
    }

    //========= GET REMOVE TOKEN FROM AUCTION LOGS =========//
    const getRemoveTokenFromAuctionLogs = async () => {
        try {
            if (window.ethereum) {
                const provider = getProvider();
                const contract = getShopContract(provider);
                const filter = contract.filters.RemoveTokenFromAuction();
                const logs = await contract.queryFilter(filter);
                setRemoveTokenFromAuctionLogs(logs.map(({args}: { args: RemoveTokenFromAuctionUnhandledType }) => removeTokenFromAuctionLogArgsHandler(args)))
            }
        } catch (e: any) {
            errorHandler(e)
        }
    }

    //========= GET BUY TOKEN FROM AUCTION LOGS =========//
    const getBuyTokenFromAuctionLogs = async () => {
        try {
            if (window.ethereum) {
                const provider = getProvider();
                const contract = getShopContract(provider);
                const filter = contract.filters.BuyTokenFromAuction();
                const logs = await contract.queryFilter(filter);
                setBuyTokenFromAuctionLogs(logs.map(({args}: { args: BuyTokenFromAuctionUnhandledType }) => buyTokenFromAuctionLogArgsHandler(args)))
            }
        } catch (e: any) {
            errorHandler(e)
        }
    }


    //========= ADD EVENT LISTENERS =========
    const addListener = async () => {
        try {
            if (window.ethereum) {
                const provider = getProvider();
                const contract = getShopContract(provider);
                const startBlockNumber = await provider.getBlockNumber();

                provider.on("error", (e) => console.log(e));

                // @ts-ignore
                contract.on("BuyPriceChange", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getBuyPriceLogs();
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                })

                // @ts-ignore
                contract.on("SellPriceChange", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getSellPriceLogs();
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                })

                // @ts-ignore
                contract.on("BuyFromShop", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getBuyFromShopLogs();
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                })

                // @ts-ignore
                contract.on("SellToShop", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getSellToShopLogs();
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                })

                // @ts-ignore
                contract.on("AddTokenToAuction", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getAddTokenToAuctionLogs();
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                })

                // @ts-ignore
                contract.on("RemoveTokenFromAuction", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getRemoveTokenFromAuctionLogs();
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                })

                // @ts-ignore
                contract.on("BuyTokenFromAuction", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getBuyTokenFromAuctionLogs();
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                })

            }
        } catch (e: any) {
            errorHandler(e)
        }
    }

    //========= МОНТИРОВАНИЕ =========//
    useEffect(() => {
        const omMountHandler = async () => {
            if (window.ethereum) {
                const provider = getProvider();
                const network = await provider.getNetwork();

                // проверка совпадения сети в которой развернут смарт-контракт с той, к которой подключились
                if (network.chainId === chainId) {
                    await addListener();
                    await getSellPriceLogs();
                    await getBuyPriceLogs();
                    await getBuyFromShopLogs();
                    await getSellToShopLogs();
                    await getAddTokenToAuctionLogs();
                    await getRemoveTokenFromAuctionLogs();
                    await getBuyTokenFromAuctionLogs();
                }
            }
        }
        omMountHandler().then();
    }, [window.ethereum]);


    return (
        <div className={style.logs}>
            <Typography variant="h4" color="primary">
                Logs
            </Typography>

            <LogsTable tableLibel="Buy From Shop Price Change"
                       headerLabels={["oldValue", "newValue", "timestamp"]}
                        // @ts-ignore
                       logs={buyPriceLogs}
                       headerClassName="header_price"
                       rowClassName="row_price"
            />

            <LogsTable tableLibel="Sell To Shop Price Change"
                       headerLabels={["oldValue", "newValue", "timestamp"]}
                        // @ts-ignore
                       logs={sellPriceLogs}
                       headerClassName="header_price"
                       rowClassName="row_price"
            />

            <LogsTable tableLibel="Buy From Shop"
                       headerLabels={["buyer", "tokenId", "price", "timestamp"]}
                       // @ts-ignore
                       logs={buyFromShopLogs}
                       headerClassName="header_buy_sell_shop"
                       rowClassName="row_buy_sell_shop"
            />

            <LogsTable tableLibel="Sell To Shop"
                       headerLabels={["seller", "tokenId", "price", "timestamp"]}
                        // @ts-ignore
                       logs={sellToShopLogs}
                       headerClassName="header_buy_sell_shop"
                       rowClassName="row_buy_sell_shop"
            />

            <LogsTable tableLibel="Add Token To Auction"
                       headerLabels={["tokenId", "seller", "startAt", "price"]}
                        // @ts-ignore
                       logs={addTokenToAuctionLogs}
                       headerClassName="header_add_to_auction"
                       rowClassName="row_add_to_auction"
            />

            <LogsTable tableLibel="Remove Token From Auction"
                       headerLabels={["tokenId", "seller", "timestamp"]}
                        // @ts-ignore
                       logs={removeTokenFromAuctionLogs}
                       headerClassName="header_remove_from_auction"
                       rowClassName="row_remove_from_auction"
            />

            <LogsTable tableLibel="Buy Token From Auction"
                       headerLabels={["tokenId", "price", "buyer", "timestamp"]}
                        // @ts-ignore
                       logs={buyTokenFromAuctionLogs}
                       headerClassName="header_buy_from_auction"
                       rowClassName="row_buy_from_auction"
            />

        </div>
    )
})
