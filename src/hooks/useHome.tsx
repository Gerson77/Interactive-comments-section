import { useState } from "react";
import type { CommentData } from "../types/type";
import dataComments from "../assets/data.json";

export default function useHome() {
  const [comments, setComments] = useState<CommentData[]>(
    normalizeComments(dataComments.comments)
  );
  const [addComment, setAddComment] = useState("");
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  // ✅ Garante que todos os comentários tenham replies
  function normalizeComments(comments: any[]): CommentData[] {
    return comments.map((comment) => ({
      ...comment,
      replies: comment.replies ? normalizeComments(comment.replies) : [],
    }));
  }

  function handleAddComment(newComment: string) {
    if (!newComment.trim()) return;

    const comment: CommentData = {
      id: Date.now(),
      content: newComment,
      createdAt: "Just now",
      score: 0,
      user: dataComments.currentUser,
      replies: [],
    };

    setComments((prev) => [...prev, comment]);
    setAddComment("");
  }

  // 🔍 Encontra username pelo id
  function findUsernameById(
    id: number,
    comments: CommentData[]
  ): string | null {
    for (const comment of comments) {
      if (comment.id === id) {
        return comment.user.username;
      }
      if (comment.replies.length) {
        const result = findUsernameById(id, comment.replies);
        if (result) return result;
      }
    }
    return null;
  }

  // 🔍 Encontra o comentário raiz
  function findRootComment(
    comments: CommentData[],
    targetId: number
  ): CommentData | null {
    for (const comment of comments) {
      if (comment.id === targetId) return comment;

      const found = findInReplies(comment.replies, targetId);
      if (found) return comment;
    }
    return null;
  }

  function findInReplies(
    replies: CommentData[],
    targetId: number
  ): CommentData | null {
    for (const reply of replies) {
      if (reply.id === targetId) return reply;
      if (reply.replies.length) {
        const found = findInReplies(reply.replies, targetId);
        if (found) return found;
      }
    }
    return null;
  }

  // 🚀 Adiciona reply no comentário raiz
  function addReply(parentId: number, newContent: string) {
    const replyingToUser = findUsernameById(parentId, comments) || "";

    const newReply: CommentData = {
      id: Date.now(),
      content: newContent,
      createdAt: "Just now",
      score: 0,
      user: dataComments.currentUser,
      replyingTo: replyingToUser,
      replies: [],
    };

    const rootComment = findRootComment(comments, parentId);
    if (!rootComment) return;

    const updatedComments = comments.map((comment) => {
      if (comment.id === rootComment.id) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyingToId(null);
  }

  function handleOpenDeleteModal(id: number) {
    setShowModal(true);
    setCommentToDelete(id);
  }

  function deleteComment(id: number) {
    const updatedComments = deleteRecursive(comments, id);
    setComments(updatedComments);
    setReplyingToId(null);
  }

  function deleteRecursive(comments: CommentData[], id: number): CommentData[] {
    return comments
      .filter((comment) => comment.id !== id)
      .map((comment) => ({
        ...comment,
        replies: deleteRecursive(comment.replies, id),
      }));
  }

  function handleConfirmDelete() {
    if (commentToDelete !== null) {
      deleteComment(commentToDelete);
    }
    setShowModal(false);
    setCommentToDelete(null);
  }

  function handleCancelDelete() {
    setShowModal(false);
    setCommentToDelete(null);
  }

  function editComment(id: number, newContent: string) {
    const updatedComments = editRecursive(comments, id, newContent);
    setComments(updatedComments);
  }

  function editRecursive(
    comments: CommentData[],
    id: number,
    newContent: string
  ): CommentData[] {
    return comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, content: newContent };
      }
      return {
        ...comment,
        replies: editRecursive(comment.replies, id, newContent),
      };
    });
  }

  return {
    addComment,
    editComment,
    handleCancelDelete,
    handleConfirmDelete,
    handleOpenDeleteModal,
    addReply,
    handleAddComment,
    replyingToId,
    showModal,
    setAddComment,
    setReplyingToId,
    comments
  };
}
