import { Pipe, PipeTransform } from '@angular/core';
import { PostMessage } from '@catamaran/hull';

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

    public transform(post: PostMessage) {
        if (post.text) {
            return md.block(post.text, {
                imageLink: this.transformLink,
                toUrl: this.transformLink,
            });
        } else if(post.raw && post.raw.value && post.raw.value.content) {
            return `<pre><code>${JSON.stringify(post.raw.value.content, undefined, 4)}</code></pre>`;
        } else {
            return '';
        }
    }
}
