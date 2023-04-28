import React, {useEffect, useState} from "react";
import style from "./Shop.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {chainId, getProvider, getShopContract, shopAddress} from "../../helpers/ethers.helper";
import {useQueries} from "react-query";
import {getTokenJson} from "../../axios/axios";
import {Typography} from "@mui/material";
import {ShopModal} from "./ShopModal/ShopModal";
import {ITokenJson} from "../../types/types";
import LinearProgress from "@mui/material/LinearProgress";
import {ShopTokenCard} from "./ShopTokenCard/ShopTokenCard";

export const Shop = observer(() => {
    const {
        cryptoStore: {
            currentAccountAddress, loading,
            tokenPriceForBuy, getTokenPriceForBuy,
            errorHandler,
            shopTokens, getShopTokens,
        }
    } = useStore();

    // монтирование
    useEffect(() => {
        const omMountHandler = async () => {
            if (window.ethereum) {
                const provider = getProvider();
                const network = await provider.getNetwork();

                // проверка совпадения сети в которой развернут смарт-контракт с той, к которой подключились
                if (network.chainId === chainId) {
                    await getShopTokens(shopAddress);
                    await getTokenPriceForBuy();
                }
            }
        }
        omMountHandler().then();
    }, [window.ethereum]);

    const results = useQueries(
        (shopTokens || []).map(({tokenUri}) => ({
                queryKey: [tokenUri],
                queryFn: () => getTokenJson(tokenUri),
                enabled: Boolean(shopTokens)
            })
        )
    )

    const [showModal, setShowModal] = useState(false);
    const [selectedToken, setSelectedToken] = useState<null | ITokenJson>(null);
    const [buyLoading, setBuyLoading] = useState(false);

    const onBuyHandler = async (tokenId: number, price: number) => {
        try {
            if (currentAccountAddress) {
                setBuyLoading(true);
                const provider = getProvider();
                const shopContract = getShopContract(provider);
                const signer = provider.getSigner(currentAccountAddress);

                // покупаем токен у магазина
                const tx = await shopContract
                    .connect(signer)
                    .buyTokenFromShop(tokenId, {value: price});
                await tx.wait();

                // обновляем массив токенов магазина
                await getShopTokens(shopAddress);
            }
        } catch (e: any) {
            errorHandler(e);
        } finally {
            setShowModal(false);
            setBuyLoading(false);
        }
    }

    return (
        <div className={style.shop}>

            {
                loading &&
                <LinearProgress className={style.progress}
                                color="secondary"
                />
            }

            <Typography variant="h4" color="primary">
                Shop
            </Typography>

            <Typography variant="h5" color="primary">
                Buy NFT tokens
            </Typography>

            <>
                {
                    shopTokens && (
                        <div className={style.cards}>
                            <div className={style.inner}>
                                {
                                    results
                                        .map(({data}, index) => ({
                                            tokenId: shopTokens[index].tokenId,
                                            json: data
                                        }))
                                        .sort((a, b) => {
                                            if (a.tokenId > b.tokenId) {
                                                return 1
                                            }
                                            if (a.tokenId < b.tokenId) {
                                                return -1
                                            }
                                            return 0
                                        })
                                        .map(({tokenId, json}, key) => {
                                                return (
                                                    <React.Fragment key={tokenId}>
                                                        {
                                                            json && (
                                                                <ShopTokenCard tokenId={tokenId}
                                                                               json={json}
                                                                               onClick={() => {
                                                                                   setSelectedToken(json)
                                                                                   setShowModal(true)
                                                                               }}
                                                                />
                                                            )
                                                        }
                                                    </React.Fragment>
                                                )
                                            }
                                        )
                                }
                            </div>
                        </div>
                    )
                }
            </>

            {
                selectedToken && tokenPriceForBuy &&
                <ShopModal showModal={showModal}
                           onClose={() => setShowModal(false)}
                           token={selectedToken as ITokenJson}
                           currentAccountAddress={currentAccountAddress}
                           price={tokenPriceForBuy}
                           onBuyHandler={onBuyHandler}
                           buyLoading={buyLoading}
                />
            }

        </div>
    )
})
