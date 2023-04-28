import React, {useEffect, useState} from "react";
import style from "./Auction.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import LinearProgress from "@mui/material/LinearProgress";
import {Typography} from "@mui/material";
import {chainId, getProvider, getShopContract, shopAddress} from "../../helpers/ethers.helper";
import {useQueries} from "react-query";
import {getTokenJson} from "../../axios/axios";
import {useNavigate} from "react-router-dom";
import {AuctionCard} from "./AuctionCard/AuctionCard";
import {IAuctionWithJson} from "../../types/types";
import {AuctionModal} from "./AuctionModal/AuctionModal";

export const Auction = observer(() => {
    const {
        cryptoStore: {
            loading, currentAccountAddress,
            auctions, getAuctions, errorHandler
        }
    } = useStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (!currentAccountAddress) {
            navigate(-1);
        }
    }, [])

    //========= МОНТИРОВАНИЕ =========//
    useEffect(() => {
        const omMountHandler = async () => {
            if (window.ethereum) {
                const provider = getProvider();
                const network = await provider.getNetwork();

                // проверка совпадения сети в которой развернут смарт-контракт с той, к которой подключились
                if (network.chainId === chainId && currentAccountAddress) {
                    await getAuctions();
                }
            }
        }
        omMountHandler().then();
    }, [window.ethereum, currentAccountAddress]);

    // GET TOKEN JSON
    const results = useQueries(
        (auctions || []).map(({tokenUri}) => ({
                queryKey: [tokenUri],
                queryFn: () => getTokenJson(tokenUri),
                enabled: Boolean(auctions)
            })
        )
    )

    const [showModal, setShowModal] = useState(false);
    const [selectedAuctionWithJson, setSelectedAuctionWithJson] = useState<null | IAuctionWithJson>(null);
    const [localLoading, setLocalLoading] = useState(false);

    const buyFromAuction = async (tokenId: number, price: number) => {
        try {
            if (currentAccountAddress) {
                setLocalLoading(true);
                const provider = getProvider();
                const shopContract = getShopContract(provider);
                const signer = provider.getSigner(currentAccountAddress);

                // покупаем токен у магазина
                const tx = await shopContract
                    .connect(signer)
                    .buyTokenFromAuction(tokenId, {value: price});
                await tx.wait();

                // обновляем массив токенов магазина
                await getAuctions();

            }
        } catch (e: any) {
            errorHandler(e);
        } finally {
            setShowModal(false);
            setLocalLoading(false);
        }
    }

    return (
        <div className={style.auction}>

            {
                loading &&
                <LinearProgress className={style.progress}
                                color="secondary"
                />
            }

            <Typography variant="h4" color="primary">
                Auction
            </Typography>

            <Typography variant="h5" color="primary">
                Buy NFT tokens listed on the auction by users
            </Typography>

            {
                !loading && results.length === 0 &&
                <p className={style.empty}>empty</p>
            }

            <>
                {
                    auctions && (
                        <div className={style.cards}>
                            <div className={style.inner}>
                                {
                                    [...results]
                                        .map(({data}, index) => ({
                                            tokenId: auctions[index].tokenId,
                                            seller: auctions[index].seller,
                                            startAt: auctions[index].startAt,
                                            price: auctions[index].price,
                                            json: data,
                                        }))
                                        .map((auctionWithJson, key) => {
                                            return (
                                                <React.Fragment key={key}>
                                                    {
                                                        auctionWithJson.json && (
                                                            <AuctionCard tokenId={auctionWithJson.tokenId}
                                                                         price={auctionWithJson.price}
                                                                         json={auctionWithJson.json}
                                                                         onClick={() => {
                                                                             setSelectedAuctionWithJson(auctionWithJson as IAuctionWithJson);
                                                                             setShowModal(true);
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
                selectedAuctionWithJson &&
                <AuctionModal showModal={showModal}
                              auctionWithJson={selectedAuctionWithJson}
                              onClose={() => setShowModal(false)}
                              currentAccountAddress={currentAccountAddress}
                              buyFromAuction={buyFromAuction}
                              localLoading={localLoading}
                />
            }


        </div>
    )
})
