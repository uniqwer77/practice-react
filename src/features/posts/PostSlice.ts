import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {Post } from '../../services/useServices'

interface PostsState {
    posts: Post[];
    page: number;
    postsEnded: boolean;
}

const initialState: PostsState = {
    posts: [],
    page: 1,
    postsEnded: false,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPosts(state, action: PayloadAction<Post[]>) {
            state.posts.push(...action.payload);
        },

        addPost(state, action: PayloadAction<Post>) {
            state.posts.unshift(action.payload);
        },

        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },

        setPostsEnded(state, action: PayloadAction<boolean>) {
            state.postsEnded = action.payload;
        },
    },
});

export const {
    addPosts,
    addPost,
    setPage,
    setPostsEnded,
} = postsSlice.actions;

export default postsSlice.reducer;