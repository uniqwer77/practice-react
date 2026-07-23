import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';
import styles from './Login.module.css';


const schema = yup.object().shape({
    email: yup.string().email('Некорректный email').required('Email обязателен'),
    password: yup.string().min(6, 'Пароль минимум 6 символов').required('Пароль обязателен'),
});

interface FormData {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        try {
            await loginUser(data.email, data.password);
            navigate('/');
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.card}>
            <h1 className={styles.title}>Вход</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Email" error={errors.email?.message} {...register('email')}/>
                <Input type="password" placeholder="Пароль" error={errors.password?.message} {...register('password')}/>
                
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Загрузка...' : 'Войти'}
                </Button>
            </form>
            <p className={styles.text}>Ещё нет аккаунта? 
                <Link to="/register" className={styles.link}> Зарегистрироваться</Link>
            </p>
        </div>
    );
}