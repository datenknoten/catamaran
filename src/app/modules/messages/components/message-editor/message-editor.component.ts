import { Component, Input, QueryList, ViewChildren, ElementRef, ViewChild } from "@angular/core";
import { Message, Identity } from "@catamaran/hull";
import * as hyperMD from 'hypermd';
import { Store } from "@ngxs/store";
import { GlobalState } from "src/app/shared/states/global.state";
import { NbDialogService } from "@nebular/theme";

@Component({
    selector: 'message-editor',
    templateUrl: './message-editor.component.html',
    styleUrls: [ './message-editor.component.scss' ],
})
export class MessageEditor {
    public constructor(
        public store: Store,
        private dialogService: NbDialogService
    ) {}

    public previewPost?: Message;

    @Input()
    public visible: boolean = false;

    @ViewChildren('editor')
    private editorContainer!: QueryList<any>;

    @ViewChild('contentTemplate')
    private preview: any;

    public editor: any;

    public setupEditor() {
        this.previewPost = new Message();
        this.visible = true;

        const subscription = this.editorContainer.changes.subscribe((item: QueryList<ElementRef>) => {
            subscription.unsubscribe();
            if (item.length === 0) {
                return;
            }
            const editorContainer = item.first;

            this.editor = hyperMD.fromTextArea(editorContainer.nativeElement, {
                lineNumbers: false,
                // hmdInsertFile: this.fileHandler.bind(this),
            });

            this.editor.focus();
        });
    }

    public cancel() {
        this.editor = undefined;
        this.visible = false;
    }

    public submit() {
        const post = new Message();

        post.text = this.editor.getValue();

        post.author = this
            .store
            .selectSnapshot(
                (state: GlobalState) => state.identity.identities['self'],
            );

        // if (!(typeof this.context === 'undefined')) {
        //     if (this.context instanceof PostModel) {
        //         if (typeof this.context.rootId === 'string') {
        //             post.rootId = this.context.rootId;
        //         } else {
        //             post.rootId = this.context.id;
        //         }
        //         post.primaryChannel = this.context.primaryChannel;
        //     } else if (this.context !== 'public') {
        //         post.primaryChannel = this.context;
        //     }
        // }

        this.previewPost = post;


        console.log(this.previewPost);

        this.dialogService.open(this.preview);
    }
}
