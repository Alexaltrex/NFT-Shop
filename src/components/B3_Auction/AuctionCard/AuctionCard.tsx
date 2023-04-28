import React, {FC} from "react";
import style from "./AuctionCard.module.scss";
import {IAuctionWithJson, ITokenJson} from "../../../types/types";
import SearchIcon from "@mui/icons-material/Search";

interface IAuctionCard {
    tokenId: number
    price: number
    json: ITokenJson
    onClick: () => void
}

export const AuctionCard: FC<IAuctionCard> = ({
                                                  tokenId,
                                                  price,
                                                  json,
                                                  onClick
                                              }) => {

    const {image} = json

    return (
        <div className={style.auctionCard}
             onClick={onClick}
        >
            <img src={image} alt=""/>
            <p className={style.id}>
                #{tokenId}
            </p>
            <p className={style.price}>
                {price} wei
            </p>
            <SearchIcon className={style.icon}
                        sx={{color: "#FFF"}}
                        fontSize="large"
            />
        </div>
    )
}
