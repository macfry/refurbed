export interface IProduct {
    id: number;
    name: string;
    picture: string;
    price: number;
    stock: number;
    quantity?: number;
}

export interface IMarketOption {
    value: string;
    name: string;
}
