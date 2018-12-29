import { Pipe, PipeTransform } from '@angular/core';

const md = window.require('ssb-markdown');

@Pipe({
    name: 'rendermd',
})
export class RenderMd implements PipeTransform {
    private transformLink(id: string) {
        if (id.startsWith('&')) {
            return `http://localhost:8989/blobs/get/${id}`;
        } else if(id.startsWith('%')) {
            return `/#/post/${id}`
        } else {
            return `/#/identity/${id}`;
        }
    }

    public transform(text: string) {
        return md.block(text, {
            imageLink: this.transformLink,
            toUrl: this.transformLink,
        });

    }
}
