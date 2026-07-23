import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Post } from "../../services/useServices";

export interface PostsContextType {
  postsList: Post[];
  setPostsList: Dispatch<SetStateAction<Post[]>>;
}

export const PostsContext = createContext<PostsContextType>({
  postsList: [],
  setPostsList: () => {}, 
});