interface AddCommentProps {
  addComment: string;
  avatar: string;
  setAddComment: (text: string) => void;
  handleAddComment: () => void;
  buttonLabel?: string;
}

export default function AddComment({
  addComment,
  avatar,
  setAddComment,
  handleAddComment,
  buttonLabel
}: AddCommentProps) {
  return (
    <div className="flex mx-2 p-4 w-full max-w-[700px] items-start gap-4 bg-white rounded-lg relative shadow-[1px_-1px_15px_rgba(0,0,0,0.15)]">
      <img src={avatar} alt="User Avatar" className="w-10 h-10 absolute bottom-4 md:relative md:bottom-0" />
      <textarea
      rows={3}
        className="flex-1 border border-gray-200 rounded-lg p-3 outline-gray-200 focus:outline-[#5457b6] mb-16 md:mb-0"
        placeholder="Add a comment..."
        value={addComment}
        onChange={(e) => setAddComment(e.target.value)}
      ></textarea>
      <button
        onClick={handleAddComment}
        className="bg-[#5457b6] px-6 py-2 rounded-lg text-white font-medium hover:bg-[#7c85e2] cursor-pointer md:relative absolute bottom-4 right-4 md:bottom-0 md:right-0"
      >
        {buttonLabel || 'SEND'}
      </button>
    </div>
  );
}
