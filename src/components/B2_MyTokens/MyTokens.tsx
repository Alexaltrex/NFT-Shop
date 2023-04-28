import React, {useEffect, useState} from "react";
import style from "./MyTokens.module.scss"
import {Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {chainId, getProvider, getShopContract, getTokenContract, shopAddress} from "../../helpers/ethers.helper";
import {useQueries} from "react-query";
import {getTokenJson} from "../../axios/axios";
import LinearProgress from "@mui/material/LinearProgress";
import {IAccountTokenWithJson} from "../../types/types";
import {MyTokenCard} from "./MyTokenCard/MyTokenCard";
import {MyTokenModal} from "./MyTokenModal/MyTokenModal";
import {ethers} from "ethers";
import {useNavigate} from "react-router-dom";

export const MyTokens = observer(() => {
    const {
        cryptoStore: {
            currentAccountAddress, loading,
            tokenPriceForSell, getTokenPriceForSell,
            errorHandler,
            accountTokens, getAccountTokens
        }
    } = useStore();

    const navigate = useNavigate();
    useEffect(() => {
        if (!currentAccountAddress) {
            navigate(-1);
        }
    }, []);

    //========= МОНТИРОВАНИЕ =========//
    useEffect(() => {
        const omMountHandler = async () => {
            if (window.ethereum) {
                const provider = getProvider();
                const network = await provider.getNetwork();

                // проверка совпадения сети в которой развернут смарт-контракт с той, к которой подключились
                if (network.chainId === chainId && currentAccountAddress) {
                    await getAccountTokens(currentAccountAddress);
                    await getTokenPriceForSell();
                }
            }
        }
        omMountHandler().then();
    }, [window.ethereum, currentAccountAddress]);

    // GET TOKENS JSONS
    const results = useQueries(
        (accountTokens || []).map(({tokenUri}) => ({
                queryKey: [tokenUri],
                queryFn: () => getTokenJson(tokenUri),
                enabled: Boolean(accountTokens)
            })
        )
    );

    const [showModal, setShowModal] = useState(false);
    const [selectedAccountTokenWithJson, setSelectedAccountTokenWithJson] = useState<null | IAccountTokenWithJson>(null);
    const [localLoading, setLocalLoading] = useState(false);

    const onSellHandler = async (tokenId: number) => {
        try {
            if (currentAccountAddress) {
                setLocalLoading(true);
                const provider = getProvider();
                const shopContract = getShopContract(provider);
                const tokenContract = getTokenContract(provider);
                const signer = provider.getSigner(currentAccountAddress);

                // разрешаем магазину переводить токен
                const approveTx = await tokenContract
                    .connect(signer)
                    .approve(shopAddress, tokenId);
                await approveTx.wait();

                // продаем токены магазину
                const tx = await shopContract
                    .connect(signer)
                    .sellTokenToShop(tokenId)
                await tx.wait();

                // обновляем массив своих токенов
                await getAccountTokens(currentAccountAddress);
            }
        } catch (e: any) {
            errorHandler(e);
        } finally {
            setShowModal(false);
            setLocalLoading(false);
        }
    }

    const addToAuction = async (tokenId: number, price: number) => {
        try {
            if (currentAccountAddress) {
                setLocalLoading(true);
                const provider = getProvider();
                const shopContract = getShopContract(provider);
                const tokenContract = getTokenContract(provider);
                const signer = provider.getSigner(currentAccountAddress);

                // выставляем лот на аукцион
                const tx = await shopContract
                    .connect(signer)
                    .addTokenToAuction(tokenId, price);
                await tx.wait();

                // разрешаем магазину переводить токен
                const approveTx = await tokenContract
                    .connect(signer)
                    .approve(shopAddress, tokenId);
                await approveTx.wait();

                // обновляем массив токенов аккаунта
                await getAccountTokens(currentAccountAddress);
            }
        } catch (e: any) {
            errorHandler(e);
        } finally {
            setLocalLoading(false);
            setShowModal(false);
        }
    }

    const removeFromAuction = async (tokenId: number) => {
        try {
            if (currentAccountAddress) {
                setLocalLoading(true);
                const provider = getProvider();
                const shopContract = getShopContract(provider);
                const tokenContract = getTokenContract(provider);
                const signer = provider.getSigner(currentAccountAddress);

                // запрещаем магазину переводить токен (даем разрешение нулевому адресу)
                const approveTx = await tokenContract
                    .connect(signer)
                    .approve(ethers.constants.AddressZero, tokenId);
                await approveTx.wait();

                // удаляем лот с аукциона
                const tx = await shopContract
                    .connect(signer)
                    .removeTokenFromAuction(tokenId);
                await tx.wait();

                // обновляем массив токенов аккаунта
                await getAccountTokens(currentAccountAddress);
            }
        } catch (e: any) {
            errorHandler(e);
        } finally {
            setLocalLoading(false);
            setShowModal(false);
        }
    }

    return (
        <div className={style.myTokens}>

            {
                loading &&
                <LinearProgress className={style.progress}
                                color="secondary"
                />
            }

            <Typography variant="h4" color="primary">
                My tokens
            </Typography>

            <Typography variant="h5" color="primary">
                Manage your NFT tokens
            </Typography>

            {
                !loading && results.length === 0 &&
                <p className={style.empty}>empty</p>
            }

            <>
                {
                    accountTokens && (
                        <div className={style.cards}>
                            <div className={style.inner}>
                                {
                                    [...results]
                                        .map(({data}, index) => ({
                                            tokenId: accountTokens[index].tokenId,
                                            json: data,
                                            isTokenOnAuction: accountTokens[index].isTokenOnAuction,
                                            price: accountTokens[index].price
                                        }))
                                        .map((token, key) => {
                                                return (
                                                    <React.Fragment key={key}>
                                                        {
                                                            token.json && (
                                                                <MyTokenCard
                                                                    accountTokenWithJson={token as IAccountTokenWithJson}
                                                                    onClick={() => {
                                                                        setShowModal(true);
                                                                        setSelectedAccountTokenWithJson(token as IAccountTokenWithJson);
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
                selectedAccountTokenWithJson && tokenPriceForSell &&
                <MyTokenModal showModal={showModal}
                              accountTokenWithJson={selectedAccountTokenWithJson}
                              onClose={() => setShowModal(false)}
                              currentAccountAddress={currentAccountAddress}
                              onSellHandler={onSellHandler}
                              addToAuction={addToAuction}
                              removeFromAuction={removeFromAuction}
                              tokenPriceForSell={tokenPriceForSell}
                              localLoading={localLoading}
                />
            }

        </div>
    )
})
