export enum EMethods {
    POST = 'POST',
    GET = 'GET',
}

export interface IApiOptions {
    signal: AbortSignal;
    headers?: Record<string, string>;
    method: EMethods;
}

export interface ILiveCurrency {
    timestamp: number;
    source: string;
    quotes: Record<string, number>;
}

export interface ICurrencyResponse extends ILiveCurrency {
    privacy: string
    success: boolean;
    terms: string;
}

export interface ICurrencyResponseError {
    success: boolean;
    error: {
        code: number;
        info: string;
    }
}

export interface IRateCategory {
    audiobook: number;
    broadcasting: number;
    ebook: number;
    eperiodical: number;
    eservice: number;
    telecommunication: number;
}

export interface IRate {
    abbreviation: string;
    categories: IRateCategory;
    country_code: string;
    country_name: string;
    currency: string;
    local_name: string;
    member_state: boolean;
    reduced_rates: number[];
    standard_rate: number;
    state_code: null | string;
    state_name: null | string;
    vat_abbreviation: string;
    vat_local_name: string;
}

export interface IRatesResponse {
    has_more: boolean;
    rates_count: number;
    rates: IRate[];
}
