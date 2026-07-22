import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';

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
            alert('Успешная регистрация!');
            navigate('/login');
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input placeholder="Имя пользователя" {...register('username')} />
                    <p>{errors.username?.message}</p>
                </div>

                <div>
                    <input placeholder="Email" {...register('email')} />
                    <p>{errors.email?.message}</p>
                </div>

                <div>
                    <input type="password" placeholder="Пароль" {...register('password')} />
                    <p>{errors.password?.message}</p>
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Загрузка...' : 'Зарегистрироваться'}
                </button>
            </form>
            <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </div>
    );
}