import type { CommentData, User } from "../../types/type";
import Comment from "../Comment";

interface CommentListProps {
  comments: CommentData[];
  currentUser: User;
  replyingToId: number | null;
  setReplyingToId: (id: number | null) => void;
  addReply: (parentId: number, content: string) => void;
  deleteComment: (id: number) => void;
  editComment: (id: number, newContent: string) => void;
}

export default function CommentList({
  comments,
  currentUser,
  replyingToId,
  setReplyingToId,
  addReply,
  editComment,
  deleteComment
}: CommentListProps) {
  return (
    <div className="mb-[80px] md:mb-[20px]">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          replyingToId={replyingToId}
          setReplyingToId={setReplyingToId}
          addReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
}
