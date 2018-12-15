import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {LINK_PROVIDERS} from './link-provider';
import {PrecompiledLibraryLinkService} from './precompiled-library-link.service';
import {NgxElectronModule} from 'ngx-electron';
import {NodeAddonLinkService} from './node-addon-link.service';
import { Scuttle } from './shared/providers/scuttle.providers';
import { NgxsModule } from '@ngxs/store';
import { ClientState } from './shared/states/client.state';
import { MessageState } from './shared/states/message.state';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbSidebarService, NbOverlayModule, NbOverlayService, NbListModule, NbMenuModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { MainPage } from './core/main-page/main-page.component';
import { MessagesModule } from './modules/messages/messages.module';
import { routes } from './app.routes';
import { RenderMd } from './shared/pipes/render-md.pipe';
import { HumanReadableDatePipe } from './shared/pipes/human-readable-date.pipe';
import { IdentityState } from './shared/states/identity.state';
import { SortPostsPipe } from './shared/pipes/sort-posts.pipe';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        NgxElectronModule,
        NgxsModule.forRoot([
            ClientState,
            MessageState,
            IdentityState,
        ]),
        NgxsRouterPluginModule.forRoot(),
        NbThemeModule.forRoot({
            name: 'default',
        }),
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
        }),
        CoreModule,
        MessagesModule,
        FontAwesomeModule,
    ],
    providers: [
        RenderMd,
        HumanReadableDatePipe,
        SortPostsPipe,
    ],
    entryComponents: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

