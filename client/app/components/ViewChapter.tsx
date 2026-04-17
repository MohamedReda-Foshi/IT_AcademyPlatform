import React from 'react'
import ReactPlayer from 'react-player';
import Quizzes from './Quizzes';
interface Props {
    ContentType: 'text' | 'video' | 'image' | 'file' | null;
    ContentData:  string | string[];
    chapterID: string;
    allClicked: string[];
}

const ViewChapter: React.FC<Props> = ({ ContentType, ContentData, chapterID, allClicked }) => {
    const source = Array.isArray(ContentData) ? ContentData[0] : ContentData;

    const reFormat = /text/.test(allClicked.join(" ")) && /(video)/.test(allClicked.join(" ")) && /(file)/.test(allClicked.join(" "))

    return (
        <div className='flex-1 basis-full'>
            {ContentType === 'text' && <p>{source}</p>}
            {ContentType === 'video' &&
                (
                    <div className="video-container flex">
                        <ReactPlayer
                            url={source}
                            controls
                            width={"100%"}
                            className="mx-auto rounded-lg shadow-md"
                        />
                    </div>
                )}
            {ContentType === 'file' &&
                <div className="p-4 bg-gray-50 rounded-lg">
                    <iframe
                        src={source}
                        width="100%"
                        height="500"
                        className="rounded-lg shadow-md border border-gray-200"
                        title="Document Viewer"
                    />
                </div>
            }
             {/* Quizzes section */}
            {
                reFormat ? 
                    <section className="mt-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                        <Quizzes idCourse={`${chapterID}`} />
                    </section>
                : null
            }
        </div>
    )}

export default ViewChapter;