import { IProduct } from "@/types/products";
import { MutationTypes } from "./mutation-types";
import { IState } from "./state";
import { MutationTree } from "vuex";
import { ILiveCurrency, IRate } from "@/types/api";

export type Mutations<S = IState> = {
    [MutationTypes.ADD_TO_CART](state: S, product: IProduct): void;
    [MutationTypes.DELETE_FROM_CART](state: S, id: number): void;
    [MutationTypes.ADD_PRODUCT](state: S, product: IProduct): void;
    [MutationTypes.DELETE_PRODUCT](state: S, id: number): void;
    [MutationTypes.SET_PRODUCTS](state: S, products: IProduct[]): void;
    [MutationTypes.SET_VAT_RATES](state: S, vatRates: IRate[]): void;
    [MutationTypes.SET_VAT_RATE](state: S, vatRate: IRate): void;
    [MutationTypes.SET_EXCHANGE_RATE](state: S, exchangeRate: number): void;
    [MutationTypes.SET_CURRENCY](state: S, currency: ILiveCurrency): void;
}

export const mutations: MutationTree<IState> & Mutations = {
    [MutationTypes.ADD_TO_CART](state: IState, product: IProduct) {
        const existingProductIndex = state.cart.findIndex(({ id }) => id === product.id);

        if (existingProductIndex === -1) {
            // add product if not exist in cart
            product.quantity = 1;
            state.cart.push(product);
        } else {
            // change quantity existing product in cart
            state.cart[existingProductIndex].quantity = (state.cart[existingProductIndex].quantity ?? 0) + 1;
        }
    },
    [MutationTypes.DELETE_FROM_CART](state: IState, id: number) {
        const product = state.cart.find((product) => product.id === id);
        const restData = state.cart.filter((grant) => grant.id !== id);

        if (product && product.quantity && product.quantity > 1) {
            --product.quantity;
            state.cart = [...restData, product];
        } else {
            state.cart = [...restData];
        }
    },
    [MutationTypes.ADD_PRODUCT](state: IState, product: IProduct) {
        const existingProductIndex = state.products.findIndex(({ id }) => id === product.id);

        // add if product not exist yet
        if (existingProductIndex === -1) {
            state.products.push(product);
        }
    },
    [MutationTypes.DELETE_PRODUCT](state: IState, id: number) {
        const newData = state.products.filter((product) => product.id !== id);
        state.products = newData;
    },
    [MutationTypes.SET_PRODUCTS](state: IState, products: IProduct[]) {
        const newData = [...state.products, ...products];
        // remove duplicates
        const uniqueProducts = Array.from(new Set(newData.map(({ id }) => id)))
            .map(id => newData.find((product) => product.id === id))
        state.products = uniqueProducts as IProduct[];
    },
    [MutationTypes.SET_VAT_RATES](state: IState, vatRates: IRate[]) {
        state.vatRates = vatRates;
    },
    [MutationTypes.SET_VAT_RATE](state: IState, vatRate: IRate) {
        state.vatRate = vatRate;
    },
    [MutationTypes.SET_EXCHANGE_RATE](state: IState, exchangeRate: number) {
        state.exchangeRate = exchangeRate;
    },
    [MutationTypes.SET_CURRENCY](state: IState, currency: ILiveCurrency) {
        state.currency = currency;
    }
};
