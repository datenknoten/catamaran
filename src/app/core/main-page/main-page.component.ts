 import { Component } from "@angular/core";
import { NbMenuItem, NbMenuService } from "@nebular/theme";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Identity } from "@catamaran/hull";
import { GlobalState } from "src/app/shared/states/global.state";
import Avatars from "@dicebear/avatars";
import SpriteCollection from '@dicebear/avatars-identicon-sprites';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FetchPublicFeed } from "src/app/shared/actions/fetch-public-feed.action";
import { Navigate } from "@ngxs/router-plugin";
import { Location } from "@angular/common";


@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: [ './main-page.component.scss' ]
})
export class MainPage {
    public items: NbMenuItem[] = [
        {
            title: 'Public Feed',
            data: 'feed',
        },
        {
            title: 'Back',
            data: 'back',
        }
    ];

    public name: Observable<string>;
    public image: Observable<SafeUrl>;

    public constructor(
        private store: Store,
        private sanitizer: DomSanitizer,
        private menu: NbMenuService,
        private _location: Location,
    ) {
        this.name = this.store.select((state: GlobalState) => {
            if (!state.identity.identities['self']) {
                return '';
            }

            if (!state.identity.identities['self'].primaryName) {
                return '';
            }

            return state.identity.identities['self'].primaryName.name;
        });

        this.image = this.store.select((state: GlobalState) => {
            const author = state.identity.identities['self'];
            if (!author) {
                let avatars = new Avatars(SpriteCollection);
                let svg = avatars.create('unknown');
                return this.sanitizer.bypassSecurityTrustUrl(`data:image/svg+xml;utf8,${svg}`);

            }

            if (!author.primaryImage) {
                let avatars = new Avatars(SpriteCollection);
                let svg = avatars.create(author.id);
                return this.sanitizer.bypassSecurityTrustUrl(`data:image/svg+xml;utf8,${svg}`);
            }

            return `http://localhost:8989/blobs/get/${author.primaryImage.blobId}`;
        });

        this.menu.onItemClick().subscribe(item => {
            if (item.item.data === 'feed') {
                this
                    .store
                    .dispatch(new FetchPublicFeed(false, false))
                    .subscribe(() => {
                        this.store.dispatch(new Navigate(['feed']));
                    });
            } else if (item.item.data === 'back') {
                this._location.back();
            }
        })
    }
}
