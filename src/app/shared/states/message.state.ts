import { PostMessage } from '@catamaran/hull';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { InitClientSuccess } from '../actions/init-client-success.action';
import { GlobalState } from './global.state';
import { tap } from 'rxjs/operators';

export interface MessageStateModel {
    messages: PostMessage[];
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

    @Action(InitClientSuccess)
    public fetch(state: StateContext<MessageStateModel>) {
        state.setState({
            messages: [],
        });
        const client = this.store.selectSnapshot((state: GlobalState) => state.client.client);
        console.log(client);
        client
            .message
            .fetchPublicFeed()
            .subscribe((post) => {
                const posts = state.getState().messages;
                state.patchState({
                    messages: [
                        ...posts,
                        post,
                    ]
                });
            });
    }
}
