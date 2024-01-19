import { IProduct } from "@/types/products";
import { IState } from "./state";
import { GetterTree } from "vuex";

export type Getters = {
    cart(sate: IState): IProduct[];
    products(state: IState): IProduct[];
};
  
export const getters: GetterTree<IState, IState> & Getters = {
    cart: (state) => state.cart,
    products: (state) => state.products,
};
