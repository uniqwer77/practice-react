import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../../services/authService';
import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import styles from './Register.module.css';

const schema = yup.object().shape({
    username: yup.string().min(3, 'Имя от 3 символов').required('Имя обязательно'),
    email: yup.string().email('Некорректный email').required('Email обязателен'),
    password: yup.string().min(6, 'Пароль от 6 символов').required('Пароль обязателен'),
});

interface FormData {
    username: string;
    email: string;
    password: string;
}

export default function Register() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        try {
            await registerUser(data.username, data.email, data.password);
            navigate('/login');
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.card}>
            <h1 className={styles.title}>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Имя пользователя" error={errors.username?.message} {...register('username')}/>
                <Input placeholder="Email" error={errors.email?.message} {...register('email')}/>
                <Input type="password" placeholder="Пароль" error={errors.password?.message} {...register('password')}/>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Загрузка...' : 'Зарегистрироваться'}
                </Button>
            </form>
            <p className={styles.text}>Уже есть аккаунт? 
                <Link to="/login"  className={styles.link}>Войти</Link>
            </p>
        </div>
    );
}