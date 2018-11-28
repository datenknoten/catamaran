import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { PostMessage } from "@catamaran/hull";
import { GlobalState } from "src/app/shared/states/global.state";

@Component({
    selector: 'public-feed',
    templateUrl: './public-feed.component.html',
})
export class PublicFeed {
    public posts: Observable<PostMessage[]>;

    public constructor(
        private store: Store,
    ) {
        this.posts = this.store.select((state: GlobalState) => state.messages.messages);
    }
}
