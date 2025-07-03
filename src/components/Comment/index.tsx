import { useState } from "react";
import type { CommentData, User } from "../../types/type";
import AddComment from "../AddComment";

interface CommentProps {
  comment: CommentData;
  currentUser: User;
  replyingToId: number | null;
  setReplyingToId: (id: number | null) => void;
  addReply: (parentId: number, content: string) => void;
  editComment: (id: number, newContent: string) => void;
  deleteComment: (id: number) => void;
}

export default function Comment({
  comment,
  currentUser,
  replyingToId,
  setReplyingToId,
  addReply,
  editComment,
  deleteComment,
}: CommentProps) {
  const isReply = "replyingTo" in comment;
  const isCurrentUser = currentUser.username === comment.user.username;
  const isReplying = replyingToId === comment.id;
  
  const [inputText, setInputText] = useState("");
  const [seeMore, setSeeMore] = useState(false)

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  function handleReply() {
    setReplyingToId(isReplying ? null : comment.id);
  }

  function handleSeeMore() {
    setSeeMore((prev) => !prev)
  }

  return (
    <div className="w-full">
      <div
        className={`bg-white w-full flex md:flex-row flex-col-reverse gap-4 p-6 my-3 rounded-lg ${
          isReply ? "max-w-[600px]" : "max-w-[700px]"
        }`}
      >
        <div className="w-[100px] md:w-[42px] h-10 md:h-[90px] flex justify-between md:justify-center items-center md:flex-col gap-2 p-3 bg-gray-100 rounded-lg">
          <img src="https://res.cloudinary.com/mycompanyhosts/image/upload/v1751552309/interactive-commets-section/icon-plus_hyngap.svg" className="w-3 h-3 cursor-pointer" />
          <span className="text-[#5457b6] font-medium text-md">
            {comment.score}
          </span>
          <img src="https://res.cloudinary.com/mycompanyhosts/image/upload/v1751552309/interactive-commets-section/icon-minus_ho9jme.svg" className="w-3 h-1 cursor-pointer" />
        </div>

        <div className="flex gap-2 flex-col w-full relative">
          <div className="flex justify-between ">
            <div className="flex items-center gap-4">
              <img className="w-8 h-8" src={comment.user.image.png} />
              <h4 className="font-bold text-[#5457b6]">
                {comment.user.username}
              </h4>
              <small className="text-gray-500">{comment.createdAt}</small>
            </div>

            {isCurrentUser ? (
              <div className="flex items-center gap-4 absolute -bottom-12 right-0 md:relative md:bottom-0">
                <button
                  className="flex items-center gap-2 text-red-400 font-medium cursor-pointer hover:opacity-50"
                  onClick={() => deleteComment(comment.id)}
                >
                  <img src="https://res.cloudinary.com/mycompanyhosts/image/upload/v1751552308/interactive-commets-section/icon-delete_v7rxok.svg" />
                  Delete
                </button>

                {isEditing ? (
                  <button
                    className="flex items-center gap-2 text-[#5457b6] font-medium cursor-pointer hover:opacity-50"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-2 text-[#5457b6] font-medium cursor-pointer hover:opacity-50"
                    onClick={() => {
                      setIsEditing(true);
                      setEditText(comment.content);
                    }}
                  >
                    <img src="https://res.cloudinary.com/mycompanyhosts/image/upload/v1751552308/interactive-commets-section/icon-edit_v2lnpw.svg" />
                    Edit
                  </button>
                )}
              </div>
            ) : (
              <div
                className="flex items-center gap-2 cursor-pointer hover:opacity-50 absolute -bottom-12 right-0 md:relative md:bottom-0"
                onClick={handleReply}
              >
                <img src="https://res.cloudinary.com/mycompanyhosts/image/upload/v1751552309/interactive-commets-section/icon-reply_hqhcwt.svg" />
                <span className="text-[#5457b6] font-medium">Reply</span>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="flex-col flex gap-2 items-end">
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 outline-[#5457b6] focus:outline-[#5457b6]"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button
                onClick={() => {
                  if (!editText.trim()) return;
                  editComment(comment.id, editText);
                  setIsEditing(false);
                }}
                className="w-full max-w-[120px] cursor-pointer uppercase bg-[#5457b6] px-6 py-2 rounded-lg text-white font-medium hover:bg-[#7c85e2]"
              >
                Update
              </button>
            </div>
          ) : (
            <p className={`${seeMore ? 'line-clamp-none cursor-pointer' : 'line-clamp-3 cursor-pointer'} text-gray-500`} onClick={handleSeeMore}>
              {isReply && (
                <span className="text-[#5457b6] font-medium mr-1">
                  @{comment.replyingTo}
                </span>
              )}
              {comment.content}
            </p>
          )}
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="sm:ml-12 flex justify-between mb-8">
          <div className="w-[2px] bg-gray-300 rounded-full opacity-50 my-3" />

          <div className="flex flex-col w-full justify-between ml-4 sm:ml-12">
            {comment.replies.map((reply: CommentData) => (
              <Comment
                key={reply.id}
                comment={reply}
                currentUser={currentUser}
                replyingToId={replyingToId}
                setReplyingToId={setReplyingToId}
                addReply={addReply}
                deleteComment={deleteComment}
                editComment={editComment}
              />
            ))}
          </div>
        </div>
      )}
      {isReplying && (
        <div className="w-full mt-4 bg-gray-50 rounded-lg mb-8">
          <AddComment
            addComment={inputText}
            avatar={currentUser.image.png}
            handleAddComment={() => {
              if (!inputText.trim()) return;
              addReply(comment.id, inputText);
              setInputText("");
            }}
            setAddComment={setInputText}
          />
        </div>
      )}
    </div>
  );
}
