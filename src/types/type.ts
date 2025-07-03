export interface User {
  username: string;
  image: {
    png: string;
    webp?: string;
  };
}

export interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo?: string; 
  replies: CommentData[];
}

export interface CommentProps {
  comment: CommentData;
  currentUser: User;
  replyingToId: number | null;
  setReplyingToId: (id: number | null) => void;
  addReply: (parentId: number, newContent: string) => void;
}
