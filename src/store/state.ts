import { IProduct } from "@/types/products";

export interface IState {
    products: IProduct[];
    cart: IProduct[];
    market: string;
};

export const defaultState: IState = {
    products: [
        {
            id: 1,
            name: "iPhone 11",
            picture: "https://files.refurbed.com/ii/iphone-11-pro-1619179577.jpg",
            price: 399,
            stock: 3,
        },
        {
            id: 2,
            name: "Samsung Galaxy S8",
            picture: "https://files.refurbed.com/ii/64-gb-schwarz-single-sim-1562659918.jpg",
            price: 275,
            stock: 5,
        },
    ],
    cart: [],
    market: '',
};
  
export const state: IState = JSON.parse(JSON.stringify(defaultState));