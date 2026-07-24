import { useState, useEffect, type SubmitEvent, type ReactNode } from "react"; 
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import useServices, { type Post, type Comment } from '../../services/useServices';
import {isAuthenticated, getCurrentUser} from '../../services/authService';
import CommentItem from "../CommentItem/CommentItem";
import Error from "../404/404";
import { Textarea } from '../ui/Textarea/Textarea';

import styles from './PostItem.module.css';

const PostItem = () => {
    const {id} = useParams<{ id: string }>();
    const postId = id;

    const [post, setPost] = useState<Post | null>(null);
    const [body, setBody] = useState<string>('');

    const { getPost, postComment } = useServices();

    useEffect(() => {
        if (!postId) return;

        getPost(postId)
            .then((data) => {
                setPost(data);
            })
    }, [postId]);

    if (!post) return <Error />;

    const renderCommentsList = (arr?: Comment[]): ReactNode => {
        if (!arr || arr.length === 0) return null;
        return arr.map(i => (
            <CommentItem data={i} key={i.id} />
        ));
    }
   
    const content = renderCommentsList(post.comments);

    const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = getCurrentUser();

        if (!user) return;
        if (!postId) return;

        const newComment = {
            postId: String(postId),
            author: user.username,
            email: user.email,
            body
        }

        postComment(newComment)
            .then((savedComment) => {
                setPost((prev) => prev ? {
                    ...prev,
                    comments: prev.comments ? [...prev.comments, savedComment] : [savedComment]
                } : null);

                setBody('');
            })
            .catch((err) => {
                console.error("Ошибка при отправке комментария:", err);
            });
    }
    
    return (
        <div className={styles.postPage}>

            <Link to={`/`}>
                <p className={styles.backLink}>← Назад</p>
            </Link>

            <div className={styles.postContainer}>
                <h1 className={styles.postTitle}>{post.title}</h1>
                <p className={styles.postBody}>
                    {post.body}
                </p>
            </div>


            {isAuthenticated() ? (
                <>
                    <h2 className={styles.commentsTitle}>Оставить комментарий</h2>

                    <form className={styles.commentForm} onSubmit={onSubmit}>
                        <Textarea
                            placeholder="Ваш комментарий"
                            value={body}
                            name="body"
                            onChange={(e) => setBody(e.target.value)}
                            required></Textarea>

                        <button type="submit">Отправить</button>
                    </form>
                </>
            ) : (
                <div className={styles.authNotice}>
                    <p>Чтобы оставить комментарий, пожалуйста, войдите в аккаунт.</p>
                </div>
            )}
            
            <h2 className={styles.commentsTitle} style={{ marginTop: "30px" }}>
                Комментарии
            </h2>

            <div className={styles.commentsWrapper}>
                {content}
            </div>

        </div>
    );
};

export default PostItem;
