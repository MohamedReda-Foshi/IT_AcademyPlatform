import React from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import Link from "next/link";

function Comments({ name, tComment, comments, ncomment, nlike }) {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-screen-lg mx-auto mb-4">
      {/* Comment Section */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Comment Header */}
        <div className="mb-4 flex items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
            <h2 className="text-sm text-gray-500">{tComment}</h2>
          </div>
        </div>
        {/* Comment Content */}
        <p className="text-gray-600 mb-4">{comments}</p>

        {/* Likes and Comments */}
        <div className="flex items-center justify-between text-gray-600 text-lg">
          <div className="flex items-center space-x-2">
            <FaHeart className="text-gray-500" />
            <span>{nlike}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="CommentsPage">
              <span>
                <FaComment className="text-gray-500" />
                <span className="text-gray-500">{ncomment}</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          <button className="text-black">Edit</button>
          <button className="text-black">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Comments;
