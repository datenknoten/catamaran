export class FetchPublicFeed {
    public static readonly type = '[Messages] FetchPublicFeed';
    public constructor(
        public loadMore = false,
        public reset = false,
    ) {}
}
