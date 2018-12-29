import { Component, Input } from "@angular/core";
import { Gathering } from "@catamaran/hull";

@Component({
    selector: 'gathering-content',
    templateUrl: './gathering-content.component.html',
})
export class GatheringContent {
    @Input()
    public post: Gathering;

    public get latestMetadata() {
        if (this.post.metadata.length > 0) {
            return this.post.metadata[0];
        }
    }
}
