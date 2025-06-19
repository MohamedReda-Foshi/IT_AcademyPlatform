export interface ChapterData {
    id: Types.ObjectId;
    ChapterTitle: string; // name of the course
    order: number; // order of the chapter
    videoTitle:string;
    videoUrl?: string; // video URL of the lesson
    filename:string;
    filedata?: string; // file URL of the lesson
    textTitle:string
    text?: string[]; // text content of the chapter
    quize?: string; // text content of the chapter;
    ChapterDescription: string; // description of the chapter
}