import React from 'react'

interface ReviewProps {
    name: string;
    job: string;
    review: string;

}

function Review(props: ReviewProps) {
return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-red-700 flex items-center justify-center mr-4">
                    <span className="font-bold">RK</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{props.name}</h3>
                    <p className="text-red-500 text-sm">{props.job}</p>
                  </div>
                </div>
                <p className="italic text-gray-300">{props.review}</p>
              </div>
    )
}

export default Review