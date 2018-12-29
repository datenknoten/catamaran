import { Component, Input } from "@angular/core";
import { Content } from "@catamaran/hull";

@Component({
    selector: 'message-content',
    templateUrl: './message-content.component.html',
})
export class MessageContent {
    @Input()
    public post: Content;
}
