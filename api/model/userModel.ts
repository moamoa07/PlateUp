export interface CustomUser {
    id: string;
    email: string;
    displayName: string;
    photoURL: string | null;
    postCount: number;
    likeCount: number;
    followerCount: number;
  }