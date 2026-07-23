import {useHttp} from '../components/hooks/http.hook';
// import getCommentsList from '../services/commentList';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments?: any[];
}

export interface Comment {
    id: string;
    postId: number | string,
    author: string;
    email: string;
    body: string;
}

interface PaginatedResponse<T> {
  data: T[];
}

export type NewPostData = Omit<Post, 'id'>;
export type NewCommentData = Omit<Comment, 'id'>;

const useServices = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'http://localhost:3001';
    const _basePage = 1;

    const getAllPosts = async (page: number = _basePage): Promise<Post[]> => {
        const res = await request<PaginatedResponse<Post>>(`${_apiBase}/posts?_page=${page}&_per_page=3`);
        return res.data;
    }

    const getPost = async (id: number | string): Promise<Post> => {
        return await request<Post>(`${_apiBase}/posts/${id}?_embed=comments`);
    }

    const postPost = async (newPost: NewPostData): Promise<Post> => {
        const createdPost = await request<Post>(
            `${_apiBase}/posts`,
            'POST',
            { 'Content-Type': 'application/json' },
            JSON.stringify(newPost)
        );
        
        return createdPost;
    }

    const postComment = async (newComment: NewCommentData): Promise<Comment> => {
        const createdComment = await request<Comment>(
            `${_apiBase}/comments`,
            'POST',
            { 'Content-Type': 'application/json' },
            JSON.stringify(newComment)
        );
        
        return createdComment; 
    }

    return {loading, getAllPosts, getPost, error, clearError, postPost, postComment};
}

export default useServices;