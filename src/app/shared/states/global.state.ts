import { ClientStateModel } from "./client.state";
import { MessageStateModel } from "./message.state";

export interface GlobalState {
    client: ClientStateModel;
    messages: MessageStateModel;
}
