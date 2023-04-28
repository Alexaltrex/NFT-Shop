import style from "./AuctionModal.module.scss";
import Fade from "@mui/material/Fade";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import React, {FC} from "react";
import {IAuctionWithJson} from "../../../types/types";
import {getDate} from "../../../helpers/helpers";
import CircularProgress from "@mui/material/CircularProgress";

interface IAuctionModal {
    showModal: boolean
    auctionWithJson: IAuctionWithJson
    onClose: () => void
    currentAccountAddress: string | null
    buyFromAuction: (tokenId: number, price: number) => void
    localLoading: boolean
}

export const AuctionModal: FC<IAuctionModal> = ({
                                                    showModal,
                                                    auctionWithJson,
                                                    onClose,
                                                    currentAccountAddress,
                                                    buyFromAuction,
                                                    localLoading
                                                }) => {
    const {price, json, startAt, seller, tokenId} = auctionWithJson;
    const {name, image, description, attributes} = json;

    const onCloseHandler = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (reason === 'backdropClick') return
        onClose();
    }

    const onBuyHandler = () => buyFromAuction(tokenId, price);

    return (
        <Modal className={style.auctionModal}
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

                            <div className={style.auctionInfo}>
                                <p>
                                    <span>Seller:</span> {seller}
                                </p>
                                <p>
                                    <span>Start at:</span> {getDate(startAt)}
                                </p>
                                <p>
                                    <span>Price:</span> {price} wei
                                </p>
                            </div>

                            <Button className={style.bnt}
                                    variant="contained"
                                    color="primary"
                                    disabled={!currentAccountAddress}
                                    fullWidth={true}
                                    onClick={onBuyHandler}
                            >
                                <p>
                                    Buy token from auction for <span>{price}</span> wei
                                </p>
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
