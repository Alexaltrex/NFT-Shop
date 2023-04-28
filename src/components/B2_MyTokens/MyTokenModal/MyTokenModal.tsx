import React, {FC} from "react";
import Fade from "@mui/material/Fade";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import {FormikHelpers, useFormik} from "formik";
import style from "./MyTokenModal.module.scss"
import {IAccountTokenWithJson} from "../../../types/types";
import CircularProgress from "@mui/material/CircularProgress";

interface IValues {
    price: number
}

interface IMyTokenModal {
    showModal: boolean
    accountTokenWithJson: IAccountTokenWithJson
    onClose: () => void
    currentAccountAddress: string | null
    onSellHandler: (tokenId: number) => void
    addToAuction: (tokenId: number, price: number) => void
    removeFromAuction: (tokenId: number) => void
    tokenPriceForSell: number
    localLoading: boolean
}

export const MyTokenModal: FC<IMyTokenModal> = ({
                                                    showModal,
                                                    accountTokenWithJson,
                                                    onClose,
                                                    currentAccountAddress,
                                                    onSellHandler,
                                                    addToAuction,
                                                    removeFromAuction,
                                                    tokenPriceForSell,
                                                    localLoading
                                                }) => {
    const {tokenId, json, price, isTokenOnAuction} = accountTokenWithJson;
    const {name, image, description, attributes } = json;

    const onCloseHandler = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (reason === 'backdropClick') return
        onClose();
    }

    // add to auction
    const initialValues: IValues = {
        price: 1
    }
    const onSubmit = async ({price}: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            await addToAuction(tokenId, price);
        } finally {
            formikHelpers.resetForm();
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    const removeFromAuctionHandler = () => removeFromAuction(tokenId);

    return (
        <Modal className={style.myTokenModal}
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
                        localLoading && (
                            <div className={style.loading}>
                                <CircularProgress size={100}/>
                            </div>
                        )
                    }

                    <div className={style.content}>
                        <img src={image} alt="" className={style.img}/>
                        <div className={style.info}>
                            <Typography variant="h4">
                                {name}
                            </Typography>
                            <Typography variant="h5">
                                {description}
                            </Typography>

                            <Typography variant="h6"
                                        className={style.attributesLabel}
                            >
                                Attributes:
                            </Typography>
                            <div className={style.attributes}>
                                {
                                    [
                                        attributes[3],
                                        attributes[4],
                                        attributes[5],
                                        attributes[6],
                                        attributes[7],
                                    ].map(({trait_type, value}, key) => (
                                        <p key={key}>
                                            <span>{trait_type}</span>: <span>{value}</span>
                                        </p>
                                    ))
                                }
                            </div>

                            {
                                !isTokenOnAuction &&
                                <Button className={style.buyBnt}
                                        variant="contained"
                                        color="primary"
                                        disabled={!currentAccountAddress}
                                        fullWidth={true}
                                        onClick={() => onSellHandler(tokenId)}
                                >
                                    <p>Sell token to shop for <span>{tokenPriceForSell}</span> wei</p>
                                </Button>
                            }

                            <>
                                {
                                    isTokenOnAuction ? (
                                        <div className={style.removeFromAuction}>
                                            <p className={style.price}>
                                                Token price on auction, wei: {price}
                                            </p>
                                            <Button className={style.buyBnt}
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={!currentAccountAddress}
                                                    fullWidth={true}
                                                    onClick={removeFromAuctionHandler}
                                            >
                                                <p>Remove token from auction</p>
                                            </Button>
                                        </div>

                                    ) : (
                                        <div className={style.addToAuction}>
                                            <Typography className={style.label}>Add token on auction with price
                                                (wei)</Typography>
                                            <form onSubmit={formik.handleSubmit}
                                                  className={style.form}
                                            >
                                                <TextField fullWidth
                                                           size="small"
                                                           type="number"
                                                           inputProps={{
                                                               min: 1
                                                           }}
                                                           {...formik.getFieldProps('price')}
                                                           //disabled={!window.ethereum || sellLoading}
                                                           className={style.field}
                                                           sx={{
                                                               "& .MuiOutlinedInput-notchedOutline": {
                                                                   border: "none"
                                                               }
                                                           }}
                                                />

                                                <Button type="submit"
                                                        variant="contained"
                                                        fullWidth
                                                        className={style.buyBtn}
                                                        //disabled={!window.ethereum || sellLoading}
                                                        size="small"
                                                        color="secondary"
                                                        disableElevation
                                                >
                                                    <div className={style.preloaderWrapper}>
                                                        <p>Add</p>
                                                        {/*{*/}
                                                        {/*    sellLoading &&*/}
                                                        {/*    <div className={style.preloader}>*/}
                                                        {/*        <CircularProgress color="success" size={25}/>*/}
                                                        {/*    </div>*/}
                                                        {/*}*/}
                                                    </div>
                                                </Button>
                                            </form>
                                        </div>
                                    )
                                }
                            </>


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
