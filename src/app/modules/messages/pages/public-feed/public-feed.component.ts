import { Component, HostListener } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { GlobalState } from "src/app/shared/states/global.state";
import { FetchPublicFeed } from "src/app/shared/actions/fetch-public-feed.action";
import { Router, Scroll } from "@angular/router";
import { filter, delay } from 'rxjs/operators';
import { ViewportScroller } from "@angular/common";
import { Content } from "@catamaran/hull";

@Component({
    selector: 'public-feed',
    templateUrl: './public-feed.component.html',
    styleUrls: [ './public-feed.component.scss' ],
})
export class PublicFeed {
    public posts: Observable<Content[]>;

    public constructor(
        private store: Store,
        private router: Router,
        private scroller: ViewportScroller,
    ) {
        this.posts = this.store.select((state: GlobalState) => state.messages.messages);
        this
            .router
            .events
            .pipe(
                filter(event => (event instanceof Scroll) && (Array.isArray(event.position))),
                delay(0),
            )
            .subscribe((event: Scroll) => {
                this.scroller.scrollToPosition(event.position);
            })
    }

    @HostListener('window:scroll', ['$event'])
    public onScroll() {
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                this.store.dispatch(new FetchPublicFeed(true));
            }
    }
}
