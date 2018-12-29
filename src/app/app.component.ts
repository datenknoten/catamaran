import {
    Component,
} from '@angular/core';
import { Store } from '@ngxs/store';

import { InitClient } from './shared/actions/init-client.action';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
        public store: Store,
    ) {
        this.store.dispatch(new InitClient());
    }
}
