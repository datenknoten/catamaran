import { NgModule } from "@angular/core";
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbOverlayModule, NbThemeModule } from "@nebular/theme";
import { MainPage } from "./main-page/main-page.component";
import { RouterModule } from "@angular/router";
import { NbOverlayContainerAdapter, NbOverlayContainer } from "@nebular/theme/components/cdk";

@NgModule({
    declarations: [
        MainPage,
    ],
    exports: [
        MainPage,
    ],
    imports: [
        NbThemeModule,
        NbSidebarModule,
        NbLayoutModule,
        RouterModule,
    ],
    providers: [
        NbSidebarService,
        { provide: NbOverlayContainer, useClass: NbOverlayContainerAdapter },
    ]
})
export class CoreModule {

}
