import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Content } from "@catamaran/hull";
import { GlobalState } from "src/app/shared/states/global.state";
import { switchMap } from "rxjs/operators";

@Component({
    selector: 'post-detail',
    templateUrl: './post-detail.component.html',
})
export class PostDetail {
    public post: Observable<Content>;

    public constructor(
        private store: Store,
        private route: ActivatedRoute,
    ) {
        const id = '';
        this.post = this.route.paramMap.pipe(switchMap(params => {
            return this.store.select((state: GlobalState) => state.messages.messages.filter(item => item.id === params.get('id')).pop());
        }));
    }
}
