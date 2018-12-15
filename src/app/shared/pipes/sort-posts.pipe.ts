/**
 * @license MIT
 */

import {
    Pipe,
    PipeTransform,
} from '@angular/core';
import * as moment from 'moment';
import { PostMessage } from '@catamaran/hull';

@Pipe({
    name: 'sortPosts',
})
export class SortPostsPipe implements PipeTransform {
    public transform(value: PostMessage[], direction: 'ASC' | 'DESC' = 'ASC'): any {
        if (!Array.isArray(value)) {
            return;
        }

        if (value.length === 0) {
            return;
        }

        if (direction === 'ASC') {
            return value.slice().sort((a: PostMessage, b: PostMessage) => +b.lastActivity - +a.lastActivity);
        } else {
            return value.slice().sort((a: PostMessage, b: PostMessage) => +a.lastActivity - +b.lastActivity);
        }
    }

}
