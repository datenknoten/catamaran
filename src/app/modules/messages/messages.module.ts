import { NgModule } from '@angular/core';
import { PublicFeed } from './public-feed/public-feed.component';
import { NbCardModule, NbSidebarModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { BrowserModule } from '@angular/platform-browser';
import { Post } from './post/post.component';
import { RenderMd } from 'src/app/shared/pipes/render-md.pipe';

@NgModule({
    declarations: [
        PublicFeed,
        Post,
        RenderMd,
    ],
    imports: [
        NbSidebarModule,
        NbLayoutModule,
        NbCardModule,
        NbUserModule,
        BrowserModule,
    ],
    providers: [],
    exports: [
        PublicFeed,
        Post,
    ]
})
export class MessagesModule { }
