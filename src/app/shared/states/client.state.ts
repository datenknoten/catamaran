import { Client } from "@catamaran/hull";
import {
    State, StateContext, Action,
} from '@ngxs/store';
import { InitClient } from "../actions/init-client.action";
import { InitClientSuccess } from "../actions/init-client-success.action";

export interface ClientStateModel {
    client: Client | undefined;
}

const nodeClient = window.require('@catamaran/hull').Client;

@State<ClientStateModel>({
    name: 'client',
    defaults: {
        client: undefined,
    },
})
export class ClientState {
    @Action(InitClient)
    public async initClient(state: StateContext<ClientStateModel>) {
        const client = await nodeClient.create();
        state.patchState({
            client,
        });

        state.dispatch(new InitClientSuccess());
    }
}
