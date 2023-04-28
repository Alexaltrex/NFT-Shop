import React, {FC} from "react";
import style from "./MyTokenCard.module.scss";
import {IAccountTokenWithJson} from "../../../types/types";
import SearchIcon from "@mui/icons-material/Search";

interface IMyTokenCard {
    accountTokenWithJson: IAccountTokenWithJson
    onClick: () => void
}

export const MyTokenCard: FC<IMyTokenCard> = ({
                                                  accountTokenWithJson,
                                                  onClick
}) => {
    const {tokenId, isTokenOnAuction, json, price} = accountTokenWithJson;

    return (

        <div className={style.myTokenCard}
             onClick={onClick}
        >
            <img src={json.image} alt=""/>

            <p className={style.id}>
                #{tokenId}
            </p>

            <SearchIcon className={style.icon}
                        sx={{color: "#FFF"}}
                        fontSize="large"
            />

            {
                isTokenOnAuction && (
                    <div className={style.auctionInfo}>
                        <p>on auction</p>
                        <p>{price} wei</p>
                    </div>
                )
            }
        </div>

    )
}
