import {useHttp} from '../components/hooks/http.hook';
// import getCommentsList from '../services/commentList';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments?: any[];
}

interface PaginatedResponse<T> {
  data: T[];
}

const useServices = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'http://localhost:3001/posts';
    const _basePage = 1;

    const getAllPosts = async (page: number = _basePage): Promise<Post[]> => {
        const res = await request<PaginatedResponse<Post>>(`${_apiBase}?_page=${page}&_per_page=3`);
        return res.data;
        // return res.data.map(_transformPost);
    }

    const getPost = async (id: number | string): Promise<Post> => {
        const res = await request<Post>(`${_apiBase}/${id}`);
        return _transformPost(res);
    }

    const _transformPost = (post: Post): Post => {
        const newPost = { ...post };
        // newPost.comments = getCommentsList();
        return newPost;
    }

    return {loading, getAllPosts, getPost, error, clearError};
}

export default useServices;