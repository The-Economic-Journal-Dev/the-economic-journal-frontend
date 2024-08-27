interface IArticleData {
    authorUid: string;
    title: string;
    metaTitle: string;
    datePublished: Date;
    lastUpdated: Date;
    imageUrl: string;
    summary?: string;
    articleBody: string;
    category: "Finance" | "Economic" | "Business" | "Entrepreneurship";
    likesCount: number;
    articleText: string;
    position: number;
}