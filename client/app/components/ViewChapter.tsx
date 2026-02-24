import React from 'react'
import ReactPlayer from 'react-player';
interface Props {
    ContentType: 'text' | 'video' | 'image' | 'file' | null;
    ContentData:  string | string[];
}

const ViewChapter: React.FC<Props> = ({ ContentType, ContentData }) => {

    console.log("ContentType:1  ", ContentType)
    console.log("ContentData:1 ", ContentData)

    const source = Array.isArray(ContentData) ? ContentData[0] : ContentData;

    return (
        <div>
            {ContentType === 'text' && <p>{source}</p>}
            {ContentType === 'video' &&
                (
                    <div className="video-container">
                        <ReactPlayer
                            url={source}
                            controls
                            height={600}
                            width={950}
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
        </div>
    )}

export default ViewChapter;