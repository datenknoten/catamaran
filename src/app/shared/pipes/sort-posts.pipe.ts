/**
 * @license MIT
 */

import {
    Pipe,
    PipeTransform,
} from '@angular/core';
import { Content } from '@catamaran/hull';

@Pipe({
    name: 'sortPosts',
})
export class SortPostsPipe implements PipeTransform {
    public transform(value: Content[], direction: 'ASC' | 'DESC' = 'ASC'): any {
        if (!Array.isArray(value)) {
            return;
        }

        if (value.length === 0) {
            return;
        }

        if (direction === 'ASC') {
            return value.slice().sort((a: Content, b: Content) => +b.lastActivity - +a.lastActivity);
        } else {
            return value.slice().sort((a: Content, b: Content) => +a.lastActivity - +b.lastActivity);
        }
    }

}
