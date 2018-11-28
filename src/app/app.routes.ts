import { Routes } from '@angular/router';
import { PublicFeed } from './modules/messages/public-feed/public-feed.component';

export const routes: Routes = [
    {
        path: 'feed',
        component: PublicFeed,
    },
    {
        path: '**',
        redirectTo: 'feed',
        pathMatch: 'full',
    },
];
