import { Routes } from '@angular/router';
import { PublicFeed } from './modules/messages/pages/public-feed/public-feed.component';
import { PostDetail } from './modules/messages/pages/post-detail/post-detail.component';

export const routes: Routes = [
    {
        path: 'feed',
        component: PublicFeed,
    },
    {
        path: 'post/:id',
        component: PostDetail,
    },
    {
        path: '**',
        redirectTo: 'feed',
        pathMatch: 'full',
    },
];
