export interface BooksModel {
    _id: string | number;
    title: string;
    author: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
}