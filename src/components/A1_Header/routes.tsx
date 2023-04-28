import {Shop} from "../B1_Shop/Shop";
import {Auction} from "../B3_Auction/Auction";
import React from "react";
import {Admin} from "../B4_Admin/Admin";
import {Logs} from "../Logs/Logs";
import {MyTokens} from "../B2_MyTokens/MyTokens";
import {ethers} from "ethers";

export interface IGetRoutes {
    currentAccountAddress: string | null
    shopOwner: string | null
}

export const getRoutes = ({
                              currentAccountAddress,
                              shopOwner
}: IGetRoutes) => ([
    {
        path: "/",
        label: "Shop",
        element: <Shop/>,
        condition: true,
    },
    {
        path: "/auction",
        label: "Auction",
        element: <Auction/>,
        condition: true,
    },
    {
        path: "/mytokens",
        label: "My tokens",
        element: <MyTokens/>,
        condition: Boolean(currentAccountAddress),
    },
    {
        path: "/admin",
        label: "Admin",
        element: <Admin/>,
        condition: currentAccountAddress && shopOwner && ethers.utils.getAddress(currentAccountAddress) === ethers.utils.getAddress(shopOwner),
    },
    {
        path: "/logs",
        label: "Logs",
        element: <Logs/>,
        condition: true,
    },
]);
