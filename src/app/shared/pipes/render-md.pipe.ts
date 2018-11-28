import { Pipe, PipeTransform } from '@angular/core';

const md = window.require('ssb-markdown');

@Pipe({
    name: 'rendermd',
})
export class RenderMd implements PipeTransform {
    public transform(value: string) {
        return md.block(value);
    }
}
