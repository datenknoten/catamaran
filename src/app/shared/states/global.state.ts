import { ClientStateModel } from "./client.state";
import { MessageStateModel } from "./message.state";
import { IdentityStateModel } from "./identity.state";

export interface GlobalState {
    client: ClientStateModel;
    messages: MessageStateModel;
    identity: IdentityStateModel;
}
