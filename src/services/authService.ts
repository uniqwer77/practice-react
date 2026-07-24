export interface User {
  id: string;
  username: string;
  email: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

const API_URL = import.meta.env.VITE_API_URL;

const base64UrlEncode = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const base64UrlDecode = (str: string): string => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return decodeURIComponent(escape(atob(base64)));
};

const generateJwt = (user: User): string => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  
  const payload: JwtPayload = {
    sub: user.id,
    username: user.username,
    email: user.email,
    iat: now,
    exp: now + (24 * 60 * 60)
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = base64UrlEncode('secret_signature_key');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const parseJwt = (token: string): JwtPayload | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(base64UrlDecode(parts[1]));
  } catch {
    return null;
  }
};

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  const payload = parseJwt(token);
  if (!payload) return false;
  return payload.exp > Math.floor(Date.now() / 1000);
};

export const registerUser = async (username: string, email: string, password: string) => {
  const checkResponse = await fetch(`${API_URL}/users`);
  const users = await checkResponse.json();

  const existingUser = users.find((u: any) => u.email === email);

  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует');
  }

  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  if (!response.ok) {
    throw new Error('Ошибка при сохранении пользователя');
  }

  return { message: 'Успешная регистрация' };
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/users`);
  
  if (!response.ok) {
    throw new Error('Ошибка подключения к серверу');
  }

  const users = await response.json();

  const user = users.find(
    (u: any) => u.email === email && String(u.password) === String(password)
  );

  if (!user) {
    throw new Error('Неверный email или пароль');
  }

  const userPublicData: User = { id: String(user.id), username: user.username, email: user.email };
  const token = generateJwt(userPublicData);

  localStorage.setItem('auth_token', token);

  return { token, user: userPublicData };
};

export const logoutUser = () => {
  localStorage.removeItem('auth_token');
};

export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const getCurrentUser = (): User | null => {
  const token = getToken();
  if (!token || !isTokenValid(token)) return null;

  const payload = parseJwt(token);
  if (!payload) return null;

  return {
    id: payload.sub,
    username: payload.username,
    email: payload.email
  };
};

export const isAuthenticated = (): boolean => {
  return isTokenValid(getToken());
};