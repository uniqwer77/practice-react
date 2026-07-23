import { useState, useCallback } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async <T = any>(
        url: string,
        method: string = 'GET',
        headers: HeadersInit = {},
        body: BodyInit | null = null
    ): Promise<T> => {

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {method, headers, body});

            if (!response.ok){
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                } 

            const data = await response.json();

            setLoading(false);
            return data;
        } catch(error) {
            setLoading(false);
            const errorMessage = error instanceof Error ? error.message : 'Произошла неизвестная ошибка';
            setError(errorMessage);
            throw error;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []); 

    return {loading, request, error, clearError}
}