import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { IState } from "./state";
import { ActionTypes } from "./action-types";
import { useApi } from "@/composables/api";
import { MutationTypes } from "./mutation-types";

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<IState, IState>, 'commit'>;
  
export interface Actions {
    [ActionTypes.NO_ACTION](
        { commit }: AugmentedActionContext,
        data: unknown,
    ): void;
    [ActionTypes.GET_VAT_RATE](
        { commit }: AugmentedActionContext,
        payload: {
            countryCode: string,
            abortSignal: AbortSignal,
        }
    ): Promise<void>;
    [ActionTypes.GET_EXCHANGE_RATE](
        { commit }: AugmentedActionContext,
        payload: {
            currency: string,
            abortSignal: AbortSignal,
        }
    ): Promise<void>;
}

export const actions: ActionTree<IState, IState> & Actions = {
    [ActionTypes.NO_ACTION]({ commit }, data: unknown) {
        console.log(data, commit);
    },

    async [ActionTypes.GET_VAT_RATE]({ commit, state }, payload) {
        const { vatRates } = useApi(payload.abortSignal);
    
        if (!state.vatRates.length) {
            const vatResponse = await vatRates();
            commit(MutationTypes.SET_VAT_RATES, vatResponse?.rates ?? []);
        }

        const rate = state.vatRates.find(({ country_code }) => country_code === payload.countryCode);
        if (rate) {
            commit(MutationTypes.SET_VAT_RATE, rate);
            return;
        } else {
            const vatResponse = await vatRates(`country_code=${payload.countryCode}`);
            // debugger;
            commit(MutationTypes.SET_VAT_RATES, [...state.vatRates, ...(vatResponse?.rates ?? [])]);

            if (vatResponse) {
                commit(MutationTypes.SET_VAT_RATE, vatResponse.rates[0]);
            }
            
        }
    },

    async [ActionTypes.GET_EXCHANGE_RATE]({ commit, state }, payload) {
        if (payload.currency === 'EUR' || !payload.currency) {
            commit(MutationTypes.SET_EXCHANGE_RATE, 1);
            return;
        }

        const rates = state.currency?.quotes
        const diffInSec = (Date.now() - (state.currency?.timestamp ?? 0)) / 1000;
        // debugger;
        if (diffInSec <= 600 && rates) {
            const exchangeRate = rates[`EUR${payload.currency}`] ?? 1;
            commit(MutationTypes.SET_EXCHANGE_RATE, exchangeRate);
            return
        }

        const { exchangeRates } = useApi(payload.abortSignal);
        const exchangeResponse = await exchangeRates();
        if (exchangeResponse) {
            commit(MutationTypes.SET_CURRENCY, exchangeResponse);
            const exchangeRateResponse = exchangeResponse.quotes[`EUR${payload.currency}`] ?? 1;
            commit(MutationTypes.SET_EXCHANGE_RATE, exchangeRateResponse);
            return;
        } 

        commit(MutationTypes.SET_EXCHANGE_RATE, 1);
    },
};
