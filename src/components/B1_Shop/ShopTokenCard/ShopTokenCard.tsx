import React, {FC} from "react";
import style from "./ShopTokenCard.module.scss"
import {ITokenJson} from "../../../types/types";
import SearchIcon from '@mui/icons-material/Search';

interface IShopTokenCard {
    tokenId: number
    json: ITokenJson
    onClick: () => void
}

export const ShopTokenCard: FC<IShopTokenCard> = ({
                                              tokenId,
                                              json,
                                              onClick
                                          }) => {
    return (
        <div className={style.shopTokenCard}
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
        </div>
    )
}
