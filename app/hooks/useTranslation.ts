import { useCallback } from 'react';
import { invoiceTranslations } from '@/app/translations/invoice';
import type { Language, TranslationKey } from '@/app/translations/invoice';

export const useTranslation = (language: Language = 'en') => {
    const t = useCallback((key: TranslationKey) => {
        return invoiceTranslations[language][key];
    }, [language]);

    return { t };
}; 