import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';

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
        <div>
            <h1>Вход</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input placeholder="Email" {...register('email')} />
                    <p>{errors.email?.message}</p>
                </div>

                <div>
                    <input type="password" placeholder="Пароль" {...register('password')} />
                    <p>{errors.password?.message}</p>
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Загрузка...' : 'Войти'}
                </button>
            </form>
            <p>Ещё нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </div>
    );
}