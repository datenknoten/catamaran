import { Component, Input, QueryList, ViewChildren, ElementRef } from "@angular/core";
import { Message } from "@catamaran/hull";
import * as hyperMD from 'hypermd';

@Component({
    selector: 'message-editor',
    templateUrl: './message-editor.component.html',
    styleUrls: [ './message-editor.component.scss' ],
})
export class MessageEditor {
    public previewPost?: Message;

    @Input()
    public visible: boolean = false;

    @ViewChildren('editor')
    private editorContainer!: QueryList<any>;

    public editor: any;

    public setupEditor() {
        const that = this;
        this.previewPost = new Message();
        this.visible = true;

        const subscription = this.editorContainer.changes.subscribe((item: QueryList<ElementRef>) => {
            subscription.unsubscribe();
            if (item.length === 0) {
                return;
            }
            const editorContainer = item.first;

            const getHints = function(editor: any, cb: Function, _options: any) {
                const word = /[\w$]+/;
                const cur = editor.getCursor();
                const curLine = editor.getLine(cur.line);
                const end = cur.ch;
                let start = end;
                while (start && word.test(curLine.charAt(start - 1))) {
                    --start;
                }
                const curWord = start !== end && curLine.slice(start, end);


                // that._suggestion.searchTerm.next(curWord);

                // that._suggestion.suggestions.subscribe(items => {
                //     cb({
                //         list: items,
                //         from: cm.Pos(cur.line, start),
                //         to: cm.Pos(cur.line, end),
                //     });
                // });
            };
            // (getHints as any).async = true;

            // if (typeof this.replyText === 'string') {
            //     editorContainer.nativeElement.value = this.replyText;
            //     this.replyText = undefined;
            // }

            this.editor = hyperMD.fromTextArea(editorContainer.nativeElement, {
                extraKeys: { 'Ctrl-Space': 'autocomplete' },
                lineNumbers: false,
                hintOptions: {
                    hint: getHints,
                },
                // hmdInsertFile: this.fileHandler.bind(this),
            });

            // if (this.context instanceof PostModel) {
            //     editorContainer.nativeElement.scrollIntoView(true);
            // } else {
            //     editorContainer.nativeElement.scrollIntoView(false);
            // }
            this.editor.focus();
        });
    }

    public cancel() {
        this.editor = undefined;
        this.visible = false;
    }
}
