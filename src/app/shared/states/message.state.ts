import { Content } from '@catamaran/hull';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { InitClientSuccess } from '../actions/init-client-success.action';
import { GlobalState } from './global.state';
import { tap } from 'rxjs/operators';
import { FetchPublicFeed } from '../actions/fetch-public-feed.action';
import { RegisterIdentity } from '../actions/register-identity.action';
import { RouterNavigation, Navigate } from '@ngxs/router-plugin';

export interface MessageStateModel {
    messages: Content[];
}

@State<MessageStateModel>({
    name: 'messages',
    defaults: {
        messages: [],
    }
})
export class MessageState {
    public constructor(
        private store: Store,
    ) {}

    @Action(FetchPublicFeed)
    @Action(InitClientSuccess)
    public fetchPublicFeed(state: StateContext<MessageStateModel>, action: InitClientSuccess | FetchPublicFeed) {
        let loadMore = false;
        let reset = false;
        if (action instanceof FetchPublicFeed) {
            loadMore = action.loadMore;
            reset = action.reset;
        }
        if (reset === true) {
            state.setState({
                messages: [],
            });
        }

        const client = this.store.selectSnapshot((state: GlobalState) => state.client.client);

        if (typeof client === 'undefined') {
            return;
        }

        client
            .message
            .fetchPublicFeed(loadMore)
            .subscribe((post) => {
                this.store.dispatch(new RegisterIdentity(post.author));
                const _state = state.getState();

                state.patchState({
                    messages: [
                        ..._state.messages,
                        post,
                    ].filter((value, index, self) => {
                        return self.indexOf(value) === index;
                    }),
                });
            });
    }
}
