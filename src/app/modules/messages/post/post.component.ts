import { Component, Input } from "@angular/core";
import { PostMessage } from "@catamaran/hull";

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
})
export class Post {
    @Input()
    public post: PostMessage;
}
