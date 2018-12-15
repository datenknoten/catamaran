import { NgModule } from "@angular/core";
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbOverlayModule, NbThemeModule, NbUserModule, NbMenuModule } from "@nebular/theme";
import { MainPage } from "./main-page/main-page.component";
import { RouterModule } from "@angular/router";
import { NbOverlayContainerAdapter, NbOverlayContainer } from "@nebular/theme/components/cdk";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations: [
        MainPage,
    ],
    exports: [
        MainPage,
    ],
    imports: [
        BrowserModule,
        NbThemeModule,
        NbSidebarModule,
        NbLayoutModule,
        NbUserModule,
        NbMenuModule,
        RouterModule,
    ],
    providers: [
        NbSidebarService,
        { provide: NbOverlayContainer, useClass: NbOverlayContainerAdapter },
    ]
})
export class CoreModule {

}
