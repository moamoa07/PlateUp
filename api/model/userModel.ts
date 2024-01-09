export interface CustomUser {
  id: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  recipeCount: number;
  likeCount: number;
  followerCount: number;
}
