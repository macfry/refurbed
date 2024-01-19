import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { IState } from "./state";
import { ActionTypes } from "./action-types";

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
}

export const actions: ActionTree<IState, IState> & Actions = {
    [ActionTypes.NO_ACTION]({ commit }, data: unknown) {
        console.log(data, commit);
    },
};
