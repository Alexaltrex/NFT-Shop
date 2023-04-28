import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import style from "./App.module.scss";
import {Header} from "../A1_Header/Header";
import {getRoutes} from "../A1_Header/routes";
import {CustomAlert} from "../X_common/CustomAlert/CustomAlert";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {chainId, getProvider, getShopContract, shopAddress} from "../../helpers/ethers.helper";

// const metaRes = await axios.get("https://ipfs.io/ipfs/QmWhh4mBoGXfGNCGZZALdJuQcFuqsqrKLwhvwK8sM7pEbB/2.json");
// console.log(metaRes.data)

// магазин начеканил себе 100 токенов и болше не будет
// купить токен у магазина
// продать токен магазину
// выставить токен на продажу / убрать с продажи
// купить выставленный на продажу токен

// Shop - купить токены у магазина
// Auction - купить токены выставленные другими аккаунтами
// Список токенов текущего аккаунта. Выставить свои токены на продажу

export const App = observer(() => {
    const {cryptoStore: {
        currentAccountAddress, errorHandler,
        getShopTokens, getAuctions,
        getShopOwner, shopOwner,
        getTokenPriceForSell, getTokenPriceForBuy,
    }} = useStore();

    // при изменении состояния смарт-контракта одним акккаунтом, другие обрабатывают это изменение через события
    // SellPriceChange: getTokenPriceForSell - обновить цену продажи
    // BuyPriceChange: getTokenPriceForBuy - обновить цену покупки
    // BuyFromShop: getShopTokens - обновить список токенов магазина
    // SellToShop: getShopTokens - обновить список токенов магазина
    // AddTokenToAuction: getAuctions - обновить список аукционов
    // RemoveTokenFromAuction: getAuctions - обновить список аукционов

    //========= ADD EVENT LISTENERS =========
    const addListener = async () => {
        try {
            if (window.ethereum) {
                const provider = getProvider();
                const contract = getShopContract(provider);
                const startBlockNumber = await provider.getBlockNumber();

                provider.on("error", (e) => console.log(e));

                // Sell Price Change
                // @ts-ignore
                contract.on("SellPriceChange", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getTokenPriceForSell();
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                });

                // Buy Price Change
                // @ts-ignore
                contract.on("BuyPriceChange", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getTokenPriceForBuy();
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                });

                // BUY TOKEN FROM SHOP
                // @ts-ignore
                contract.on("BuyFromShop", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getShopTokens(shopAddress);
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                });

                //========= SELL TOKEN TO SHOP =========//
                // @ts-ignore
                contract.on("SellToShop", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getShopTokens(shopAddress);
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                });

                // ADD TOKEN TO AUCTION
                // @ts-ignore
                contract.on("AddTokenToAuction", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getAuctions();
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                });

                // REMOVE TOKEN FROM AUCTION
                // @ts-ignore
                contract.on("RemoveTokenFromAuction", async (...args) => {
                    try {
                        const event = args[args.length - 1];
                        if (event.blockNumber > startBlockNumber) {
                            await getAuctions();
                        }
                    } catch (e: any) {
                        errorHandler(e)
                    }
                });

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
                    await getShopOwner();
                }
            }
        }
        omMountHandler().then();
    }, [window.ethereum]);

    return (
        <div className={style.app}>
            <Header/>
            <CustomAlert/>
            <main className={style.main}>
                <Routes>
                    {
                        getRoutes({currentAccountAddress, shopOwner})
                            .map(({path, element, condition}, key) => (
                                <Route key={key} path={path} element={condition ? element : <Navigate to="/" replace={true} />}/>
                            ))
                    }
                </Routes>
            </main>

        </div>
    );
})
