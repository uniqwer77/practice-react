import { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import { PostsContext } from "../context/PostsContext";
import useServices, { type Post } from '../../services/useServices';
import Error from '../404/404';
import Spinner from '../Spinner/Spinner';

import styles from './PostList.module.css';

const PostList = () => {

    const { postsList, setPostsList } = useContext(PostsContext);
    const [newItemLoading, setNewItemLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(Math.floor(postsList.length / 3) + 1);
    const [postsEnded, setPostsEnded] = useState<boolean>(false);

    const {getAllPosts, error, loading} = useServices();

    useEffect(() => {
        if (postsList.length === 0) {
            onRequest(1);
        }
    }, []);

    const onRequest = (page: number) => {
        setNewItemLoading(true);
        getAllPosts(page)
            .then(onPostsListLoaded)
    }

    const onPostsListLoaded = (newPostsList: Post[]) => {
        let ended = false;

        if (newPostsList.length < 3) {
            ended = true;
        }

        setPostsList((prevPosts: Post[]) => {
            const uniquePosts = newPostsList.filter(
                (newPost) => !prevPosts.some((item) => item.id === newPost.id)
            );
            return [...prevPosts, ...uniquePosts];
        });
        setNewItemLoading(false);
        setPage(prevPage => prevPage + 1);
        setPostsEnded(ended);
    }

    const renderPosts = (arr: Post[]) => {
        const posts = arr.map(post => {
            return (
                <div className={styles.postCard} key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body.slice(0, 100)}</p>
                    <Link to={`/post/${post.id}`}>
                        <p>Подробнее</p>
                    </Link>
                </div>
            );
        });

        return (
            <div className={styles.postList}> 
                {posts}                   
            </div>
        )
    }

    const posts = renderPosts(postsList);

    const errorMessage = error ? <Error/> : null;
    const spinner = loading && postsList.length === 0 ? <Spinner /> : null;

    return (
        <>
            <h1>Список постов</h1>
            {errorMessage}
            {spinner}
            {posts}
            <button
                className={styles.loadMoreBtn}
                disabled={newItemLoading}
                style={{display: postsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(page)}
            >{loading && postsList.length > 0 ? 'Загрузка...' : 'Загрузить ещё'}</button>
        </>
    )
}

export default PostList;