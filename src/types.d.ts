interface IArticleData {
    authorUid: string;
    title: string;
    metaTitle: string;
    datePublished: Date;
    lastUpdated: Date;
    imageUrl: string;
    summary?: string;
    articleBody: string;
    category: string;
    likesCount: number;
    position: number;
    authorName?: string;
}