import {
    Component,
} from '@angular/core';
import { Scuttle } from './shared/providers/scuttle.providers';
import { PostMessage } from '@catamaran/hull';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { InitClient } from './shared/actions/init-client.action';
import { GlobalState } from './shared/states/global.state';

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
