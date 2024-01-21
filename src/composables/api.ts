import { API_CURRENCY_KEY, API_CURRENCY_URL, API_VAT_PUBLIC_KEY, API_VAT_URL } from '@/config';
import { EMethods, ICurrencyResponse, ICurrencyResponseError, IRatesResponse } from '@/types/api';
import { Ref, ref } from 'vue';

interface IUseApi {
  loading: Ref<boolean>;
  error: Ref<string | null>;
  exchangeRates: () => Promise<ICurrencyResponse | null>;
  vatRates: (params?: string) => Promise<IRatesResponse | null>;
}

export const useApi = (signal: AbortSignal): IUseApi => {
    const loading = ref(false);
    const error = ref<string | null>(null);

    const exchangeRates = async () => {
        loading.value = true;
        error.value = null;

        try {
            const options = {
                method: EMethods.GET,
                signal,
                headers: {},
                
            };
            const url = `${API_CURRENCY_URL}live?access_key=${API_CURRENCY_KEY}&source=EUR`;
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json() as ICurrencyResponseError | ICurrencyResponse;
            if (!data.success) {
                throw new Error(`${data.error.info}`)
            }
            return data as ICurrencyResponse;
        } catch (err) {
            if (error?.name !== 'CanceledError') {
                error.value = err?.message ?? 'Something goes wrong.';
            }
            return null;
        } finally {
            loading.value = false;
        }
    };

    const vatRates = async (params?: string) => {
        loading.value = true;
        error.value = null;

        try {
            const options = {
                method: EMethods.GET,
                signal,
                headers: { 'X-API-KEY': API_VAT_PUBLIC_KEY },
            };
            const url = `${API_VAT_URL}rates${params ? `?${params}`: '?limit=100'}`;
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json() as IRatesResponse;
            return data;
        } catch (err) {
            if (error?.name !== 'CanceledError') {
                error.value = err?.message ?? 'Something goes wrong.';
            }
            return null;
        } finally {
            loading.value = false;
        }
    };

    return { loading, error, exchangeRates, vatRates };
};