import {action, makeObservable, observable} from "mobx";
import {AlertColor} from "@mui/material";
import {getProvider, getShopContract, getTokenContract, shopAddress} from "../helpers/ethers.helper";
import {ethers} from "ethers";
import {IAccountToken, IAuction, IAuctionResponse, IAuctionWithURI, IShopToken} from "../types/types";

export interface IAlert {
    open: boolean
    message: string
    severity: AlertColor
}

export class CryptoStore {
    loading: boolean = false;
    alert: IAlert = {
        open: false,
        message: "",
        severity: "success" as AlertColor
    }
    connecting: boolean = false; // подключение к аккаунту Metamask
    currentAccountAddress: string | null = null;
    balance: string | null = null;
    shopOwner: string | null = null;
    shopBalance: string = "";
    tokenPriceForSell: number | null = null;
    tokenPriceForBuy: number | null = null;
    auctions: IAuctionWithURI[] | null = null
    accountTokens: IAccountToken[] | null = null
    shopTokens: IShopToken[] | null = null

    constructor() {
        makeObservable(this, {
            loading: observable,
            alert: observable,
            connecting: observable,
            currentAccountAddress: observable,
            balance: observable,
            shopOwner: observable,
            shopBalance: observable,
            tokenPriceForSell: observable,
            tokenPriceForBuy: observable,
            auctions: observable,
            accountTokens: observable,
            shopTokens: observable,

            setLoading: action.bound,
            setConnecting: action.bound,
            setCurrentAccountAddress: action.bound,
            setBalance: action.bound,
            getCurrentAccountBalance: action.bound,
            setAlert: action.bound,
            errorHandler: action.bound,
            setShopBalance: action.bound,
            getShopBalance: action.bound,
            setShopOwner: action.bound,
            getShopOwner: action.bound,
            setTokenPriceForSell: action.bound,
            getTokenPriceForSell: action.bound,
            setTokenPriceForBuy: action.bound,
            getTokenPriceForBuy: action.bound,
            getTokenBalance: action.bound,
            setAuctions: action.bound,
            getAuctions: action.bound,
            setAccountTokens: action.bound,
            getAccountTokens: action.bound,
            setShopTokens: action.bound,
            getShopTokens: action.bound,
        })
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setConnecting(connecting: boolean) {
        this.connecting = connecting
    }

    setCurrentAccountAddress(currentAccountAddress: string | null) {
        this.currentAccountAddress = currentAccountAddress;
    }

    setBalance(balance: string | null) {
        this.balance = balance
    }

    setAlert(alert: IAlert) {
        this.alert = alert
    }

    errorHandler(e: any) {
        // for (let key in e) {
        //     console.log("e." + key + ": " + e[key])
        // }
        console.log(e?.reason || e?.message || "Error");
        this.setAlert({
            open: true,
            message: e?.reason || e?.message || "Error",
            severity: "error"
        })
    }

    //========= GET CURRENT ACCOUNT BALANCE =========//
    async getCurrentAccountBalance(newAccount: string) {
        try {
            const provider = getProvider();
            const balance = await provider.getBalance(newAccount);
            const balanceInWei = ethers.utils.formatUnits(balance, "wei");
            this.setBalance(ethers.utils.commify(balanceInWei))
        } catch (e: any) {
            this.errorHandler(e);
        }
    }

    //========= SET SHOP OWNER =========//
    setShopOwner(shopOwner: string) {
        this.shopOwner = shopOwner;
    }

    //========= GET SHOP OWNER =========//
    async getShopOwner() {
        try {
            const provider = getProvider();
            const shopContract = getShopContract(provider);
            const shopOwner = await shopContract.owner();
            this.setShopOwner(shopOwner);
        } catch (e: any) {
            this.errorHandler(e);
        }
    }

    //========= SET SHOP BALANCE =========//
    setShopBalance(shopBalance: string) {
        this.shopBalance = shopBalance;
    }

    //========= GET SHOP BALANCE =========//
    async getShopBalance() {
        try {
            const provider = getProvider();
            const balance = await provider.getBalance(shopAddress);
            const balanceInWei = ethers.utils.formatUnits(balance, "wei");
            this.setShopBalance(ethers.utils.commify(balanceInWei));
        } catch (e: any) {
            this.errorHandler(e)
        }
    }

    //========= SET TOKEN PRICE FOR SELL =========//
    setTokenPriceForSell(price: number) {
        this.tokenPriceForSell = price;
    }

    //========= GET TOKEN PRICE FOR SELL =========//
    async getTokenPriceForSell() {
        try {
            const provider = getProvider();
            const shopContract = getShopContract(provider);
            const result = await shopContract.getTokenPriceForSell();
            this.setTokenPriceForSell(result.toNumber());
        } catch (e: any) {
            this.errorHandler(e)
        }
    }

    //========= SET TOKEN PRICE FOR BUY =========//
    setTokenPriceForBuy(price: number) {
        this.tokenPriceForBuy = price;
    }

    //========= GET TOKEN PRICE FOR BUY =========//
    async getTokenPriceForBuy() {
        try {
            const provider = getProvider();
            const shopContract = getShopContract(provider);
            const result = await shopContract.getTokenPriceForBuy();
            this.setTokenPriceForBuy(result.toNumber());
        } catch (e: any) {
            this.errorHandler(e)
        }
    }

    //========= GET TOKEN BALANCE =========//
    async getTokenBalance(address: string) {
        try {
            const provider = getProvider();
            const tokenContract = getTokenContract(provider);
            const balance = await tokenContract.balanceOf(address);
            console.log(balance.toNumber())
        } catch (e: any) {
            this.errorHandler(e)
        }
    }

    //========= SET SHOP TOKENS =========//
    setShopTokens(shopTokens: IShopToken[]) {
        this.shopTokens = shopTokens;
    }

    //========= GET SHOP TOKENS =========//
    async getShopTokens(address: string) {
        try {
            this.setLoading(true);
            const provider = getProvider();
            const tokenContract = getTokenContract(provider);
            const shopContract = getShopContract(provider);

            const balance = (await tokenContract.balanceOf(address)).toNumber();

            const shopTokens = [] as IShopToken[];

            for (let i = 0; i < balance; i++) {
                const tokenId = (await tokenContract.tokenOfOwnerByIndex(address, i)).toNumber();
                const tokenUri = await tokenContract.tokenURI(tokenId);
                shopTokens.push({tokenId, tokenUri});
            }

            this.setShopTokens(shopTokens);
        } catch (e: any) {
            this.errorHandler(e)
        } finally {
            this.setLoading(false);
        }
    }

    //========= SET ACCOUNT TOKENS =========//
    setAccountTokens(accountTokens: IAccountToken[]) {
        this.accountTokens = accountTokens;
    }

    //========= GET ACCOUNT TOKENS =========//
    async getAccountTokens(address: string) {
        try {
            this.setLoading(true);
            const provider = getProvider();
            const tokenContract = getTokenContract(provider);
            const shopContract = getShopContract(provider);

            const balance = (await tokenContract.balanceOf(address)).toNumber();

            const accountTokens = [] as IAccountToken[];

            for (let i = 0; i < balance; i++) {
                const tokenId = (await tokenContract.tokenOfOwnerByIndex(address, i)).toNumber();
                const tokenUri = await tokenContract.tokenURI(tokenId);
                const isTokenOnAuction = await shopContract.isTokenOnAuction(tokenId);
                const price = (await shopContract.getAuctionPrice(tokenId)).toNumber();
                accountTokens.push({tokenId, tokenUri, isTokenOnAuction, price});
            }

            this.setAccountTokens(accountTokens);

        } catch (e: any) {
            this.errorHandler(e)
        } finally {
            this.setLoading(false);
        }
    }

    //========= SET AUCTIONS =========//
    setAuctions(auctions: IAuctionWithURI[]) {
        this.auctions = auctions;
    }

    //========= GET AUCTIONS =========//
    async getAuctions() {
        try {
            this.setLoading(true);
            const provider = getProvider();
            const shopContract = getShopContract(provider);
            const tokenContract = getTokenContract(provider);

            const auctions = (await shopContract.getAuctions()) as IAuctionResponse[];
            const auctionsHandled: IAuction[] = auctions
                .map(({price, seller, startAt, tokenId}) => ({
                        price: price.toNumber(),
                        seller,
                        startAt: startAt.toNumber(),
                        tokenId: tokenId.toNumber(),

                    })
                )
            const auctionsHandledWithURI: IAuctionWithURI[] = [];

            for (let i = 0; i < auctionsHandled.length; i++) {
                const tokenUri = await tokenContract.tokenURI(auctionsHandled[i].tokenId)
                auctionsHandledWithURI.push({...auctionsHandled[i], tokenUri})
            }
            this.setAuctions(auctionsHandledWithURI);
        } catch (e: any) {
            this.errorHandler(e)
        } finally {
            this.setLoading(false);
        }
    }

}
