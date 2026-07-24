import { useNavigate } from 'react-router-dom';
import { useState, type SubmitEvent } from 'react';
import { getCurrentUser } from '../../services/authService';
import useServices from '../../services/useServices';
import { Input } from '../ui/Input/Input';
import { Textarea } from '../ui/Textarea/Textarea';

import { useAppDispatch } from "../../store/hook";

import {
    addPost,
} from "../../features/posts/PostSlice";

import styles from './CreatePost.module.css';

const CreatePost = () => {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const { postPost, loading, error } = useServices();
    const navigate = useNavigate();
    const user = getCurrentUser();
    
    if (!user) {
        return;
    }

    const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newPost = {
            userId: String(user.id),
            title,
            body
        }

        postPost(newPost)
            .then((createdPost) => {
                dispatch(addPost(createdPost));
                setTitle('');
                setBody('');
                navigate('/');
            })
            .catch(() => {});
    }

    return (
        <div className={styles.form}>
            <h1>Создать пост</h1>
            {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
                <form  onSubmit={onSubmit}>
                    <Input 
                        type="text" 
                        placeholder="Заголовок" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <Textarea 
                        placeholder="Текст поста"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required></Textarea>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Сохранение...' : 'Создать'}
                    </button>
                </form>
        </div>
    );
}

export default CreatePost;