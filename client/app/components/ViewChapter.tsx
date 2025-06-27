import React from 'react'
import ReactPlayer from 'react-player';
interface Props {
    ContentType: 'text' | 'video' | 'image' | 'file' | null;
    ContentData: undefined;
}

const ViewChapter: React.FC<Props> = ({ ContentType, ContentData }) => {

    console.log("ContentType:1  ", ContentType)
    console.log("Contentdata 1:", ContentData)

    return (
        <div>
            {ContentType === 'text' && <p>{ContentData}</p>}
            {ContentType === 'video' &&
                (
                    <div className="video-container">
                        <ReactPlayer
                            url={ContentData}
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
                        src={ContentData}
                        width="100%"
                        height="500"
                        className="rounded-lg shadow-md border border-gray-200"
                        title="Document Viewer"
                    />
                </div>
            }
        </div>
    )}

export default ViewChapter