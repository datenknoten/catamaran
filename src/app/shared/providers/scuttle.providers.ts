import { Injectable } from '@angular/core';
import { Client } from '@catamaran/hull';



@Injectable()
export class Scuttle {
    public client: Client;

    public constructor() {
        this.init();
    }

    public async init() {
        console.log('oh hai', nodeClient);
        this.client = await nodeClient.create();
        console.log(this.client);
    }
}
