import React, {FC, useEffect, useState} from "react";
import {ITokenJson} from "../../../types/types";
import style from "./ShopModal.module.scss";
import Modal from '@mui/material/Modal';
import Fade from "@mui/material/Fade";
import {Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {FormikHelpers, useFormik} from "formik";
import TextField from "@mui/material/TextField";
import {chainId, getProvider, getShopContract, shopAddress} from "../../../helpers/ethers.helper";
import CircularProgress from "@mui/material/CircularProgress";

interface IValues {
    price: number
}

interface IShopModal {
    showModal: boolean
    token: ITokenJson
    onClose: () => void
    currentAccountAddress: string | null
    price: number
    onBuyHandler: (tokenId: number, price: number) => void
    buyLoading: boolean
}

export const ShopModal: FC<IShopModal> = ({
                                              showModal,
                                              token,
                                              onClose,
                                              currentAccountAddress,
                                              price,
                                              onBuyHandler,
                                              buyLoading
                                          }) => {
    const onCloseHandler = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (reason === 'backdropClick') return
        onClose();
    }

    return (
        <Modal className={style.shopModal}
               open={showModal}
               closeAfterTransition
               onClose={onCloseHandler}
               sx={{
                   "& .MuiBackdrop-root": {
                       backgroundColor: "rgba(0,0,0,0.9)"
                   }
               }}
        >
            <Fade in={showModal}>
                <div className={style.wrapper}>

                    {
                        buyLoading && (
                            <div className={style.loading}>
                                <CircularProgress size={100}/>
                            </div>
                        )
                    }

                    <div className={style.content}>
                        <img src={token.image} alt="" className={style.img}/>
                        <div className={style.info}>
                            <Typography variant="h4">
                                {token.name}
                            </Typography>
                            <Typography variant="h5">
                                {token.description}
                            </Typography>

                            <Typography variant="h6"
                                        className={style.attributesLabel}
                            >
                                Attributes:
                            </Typography>
                            <div className={style.attributes}>
                                {
                                    [
                                        token.attributes[3],
                                        token.attributes[4],
                                        token.attributes[5],
                                        token.attributes[6],
                                        token.attributes[7],
                                    ].map(({trait_type, value}, key) => (
                                        <p key={key}>
                                            <span>{trait_type}</span>: <span>{value}</span>
                                        </p>
                                    ))
                                }
                            </div>

                            <Button className={style.buyBnt}
                                    variant="contained"
                                    color="primary"
                                    disabled={!currentAccountAddress}
                                    fullWidth={true}
                                    onClick={() => onBuyHandler(token.edition, price)}
                            >
                                <p>Buy NFT token for <span>{price}</span> wei</p>
                            </Button>

                        </div>
                    </div>

                    <IconButton className={style.closeBtn}
                                size='large'
                                onClick={() => onClose()}
                    >
                        <CloseIcon fontSize="large" sx={{color: "#FFF"}}/>
                    </IconButton>
                </div>

            </Fade>
        </Modal>
    )
}
