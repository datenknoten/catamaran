import { Component, Input } from "@angular/core";
import { PostMessage, Identity } from "@catamaran/hull";
import * as moment from 'moment';
import Avatars from '@dicebear/avatars';
import SpriteCollection from '@dicebear/avatars-identicon-sprites';
import { DomSanitizer } from "@angular/platform-browser";


type AuthorActivity = {
    author: Identity | undefined,
    activity: Date,
};

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: [ './post.component.scss' ]
})
export class Post {
    @Input()
    public post: PostMessage;

    @Input()
    public mode: 'condensed' | 'full' | 'draft' | 'comment' = 'condensed';

    public constructor(
        private sanitizer: DomSanitizer,
    ) {

    }

    public debug() {
        console.log(this.post);
    }

    public getPicture(author?: Identity) {
        if (author && author.primaryImage) {
            return `http://localhost:8989/blobs/get/${author.primaryImage.blobId}`;
        } else if(author) {
            let avatars = new Avatars(SpriteCollection);
            let svg = avatars.create(author.id);
            return this.sanitizer.bypassSecurityTrustUrl(`data:image/svg+xml;utf8,${svg}`);
        } else {
            let avatars = new Avatars(SpriteCollection);
            let svg = avatars.create('unknown');
            return this.sanitizer.bypassSecurityTrustUrl(`data:image/svg+xml;utf8,${svg}`);
        }
    }

    public escapeID(id: string) {
        return encodeURI(id);
    }

    public toIsoDate(date: Date) {
        if (!(date instanceof Date)) {
            return undefined;
        }
        return moment(date).format('YYYY-MM-DD HH:mm');
    }

    public get aggregateComments() {
        if (this.post.comments.length === 0) {
            return [];
        }

        const originalActivities = this.post.comments.map<AuthorActivity>((comment) => {
            return {
                author: comment.author,
                activity: comment.createdAt,
            };
        });

        const activities: AuthorActivity[] = [];

        for (const activity of originalActivities) {
            const _activity = activities.filter(item => item.author === activity.author).pop();

            if (typeof _activity !== 'undefined') {
                if (_activity.activity < activity.activity) {
                    _activity.activity = activity.activity;
                }
            } else {
                activities.push(activity);
            }
        }

        activities.sort((a, b) => b.activity.getTime() - a.activity.getTime());

        return activities;
}
}
