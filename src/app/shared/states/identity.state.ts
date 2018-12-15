import { Identity } from '@catamaran/hull';
import { RegisterIdentity } from '../actions/register-identity.action';
import { Action, StateContext, State, Store } from '@ngxs/store';
import { InitClientSuccess } from '../actions/init-client-success.action';
import { GlobalState } from './global.state';


export interface IdentityStateModel {
    identities: {
        [index: string]: Identity,
    };
}

@State<IdentityStateModel>({
    name: 'identity',
    defaults: {
        identities: {},
    }
})
export class IdentityState {
    public constructor(
        private store: Store,
    ) {}

    @Action(RegisterIdentity)
    public register(state: StateContext<IdentityStateModel>, action: RegisterIdentity) {
        // const patch: Partial<IdentityStateModel> = {
        //     identities: {}
        // };
        // patch.identities[action.identity.id] = action.identity;

        // state.patchState(patch);
    }

    @Action(InitClientSuccess)
    public fetchSelf(state: StateContext<IdentityStateModel>) {
        const client = this.store.selectSnapshot((state: GlobalState) => state.client.client);
        const self = client.identity.selfIdentity;

        if (self && self.isSelf) {
            const patch: Partial<IdentityStateModel> = {
                identities: {}
            };
            patch.identities[self.id] = self;
            patch.identities['self'] = self;
            console.log(patch);
            state.patchState(patch);
        }
    }
}
