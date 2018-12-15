import { NgModule } from '@angular/core';
import { PublicFeed } from './pages/public-feed/public-feed.component';
import { PostDetail } from './pages/post-detail/post-detail.component';
import { NbCardModule, NbSidebarModule, NbLayoutModule, NbUserModule, NbListModule } from '@nebular/theme';
import { BrowserModule } from '@angular/platform-browser';
import { Post } from './components/post/post.component';
import { RenderMd } from 'src/app/shared/pipes/render-md.pipe';
import { RouterModule } from '@angular/router';
import { HumanReadableDatePipe } from 'src/app/shared/pipes/human-readable-date.pipe';
import { SortPostsPipe } from 'src/app/shared/pipes/sort-posts.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faReply, faGlobe, faHashtag } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    declarations: [
        PublicFeed,
        PostDetail,
        Post,
        RenderMd,
        HumanReadableDatePipe,
        SortPostsPipe,
    ],
    imports: [
        NbSidebarModule,
        NbLayoutModule,
        NbCardModule,
        NbUserModule,
        NbListModule,
        BrowserModule,
        RouterModule,
        FontAwesomeModule,
    ],
    providers: [],
    exports: [
        PublicFeed,
        Post,
        PostDetail,
    ]
})
export class MessagesModule {
    public constructor() {
        library.add(faCoffee);
        library.add(faReply);
        library.add(faGlobe);
        library.add(faHashtag);
    }
}
