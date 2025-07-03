import dataComments from "../../assets/data.json";
import CommentList from "../../components/CommentList";
import AddComment from "../../components/AddComment";
import Modal from "../../components/Modal";
import useHome from "../../hooks/useHome";

export default function Home() {
  const {
    addComment,
    addReply,
    editComment,
    handleAddComment,
    handleCancelDelete,
    handleConfirmDelete,
    handleOpenDeleteModal,
    replyingToId,
    showModal,
    setAddComment,
    setReplyingToId,
    comments,
  } = useHome();

  return (
    <div className="bg-gray-100 w-full min-h-screen h-full py-10 font-[Rubik] flex items-start justify-center relative pb-[140px] px-6 md:px-2">
      {showModal && (
        <Modal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}

      <div className="flex flex-col justify-center items-center relative mb-4">
        <CommentList
          comments={comments}
          currentUser={dataComments.currentUser}
          replyingToId={replyingToId}
          setReplyingToId={setReplyingToId}
          addReply={addReply}
          deleteComment={handleOpenDeleteModal}
          editComment={editComment}
        />

        <div className="bg-gray-100 flex mx-auto rounded-lg gap-4 w-full items-start fixed bottom-0">
          <div className="flex justify-center w-full px-4 mb-4">
            <AddComment
              addComment={addComment}
              avatar={dataComments.currentUser.image.png}
              setAddComment={setAddComment}
              handleAddComment={() => handleAddComment(addComment)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
