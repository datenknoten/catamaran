import { Identity } from '@catamaran/hull';

export class RegisterIdentity {
    public static readonly type = '[Identity] register';

    public constructor(
        public identity: Identity,
    ) {}

}
