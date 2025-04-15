import { SUPPORTED_LOCALES } from '@env';
import Storage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18n, Scope, TranslateOptions } from 'i18n-js';
import React, { useCallback, useEffect, useState, useContext, createContext } from 'react';

import translations from '@constants/translations';
import { ITranslate } from '@constants/types';
import { logWarn } from '@utils/Logger';

export const TranslationContext = createContext({});
const i18n = new I18n(translations);

export const TranslationProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [locale, setLocale] = useState('en');

  // set the locale once at the beginning of the app
  i18n.locale = 'en';
  // set the key-value pairs for the different languages supported
  i18n.translations = translations;
  // when a value is missing from a language it'll fall back to another language with the key present
  i18n.enableFallback = true;

  /**
   * t() -- a function called that returns the value of a translation key given
   */
  const t = useCallback(
    (scope: Scope, options?: TranslateOptions) => {
      return i18n.t(scope, { ...options, locale });
    },
    [locale]
  );

  /**
   * getLocale() -- will try to get the locale if set from storage. If not,
   * it will check the device's localization settings. If none is found, it
   * will fallback to "en"
   */
  const getLocale = useCallback(async () => {
    const supportedLocales: string[] = SUPPORTED_LOCALES.split(',').map(l => l.toLowerCase());
    const fallback = 'en';

    try {
      // get the stored locale, if found and is supported
      // use it as the app's locale
      const storedLocale = await Storage.getItem('locale');
      if (storedLocale && supportedLocales.includes(storedLocale.toLowerCase())) {
        setLocale(storedLocale.toLowerCase());
        return storedLocale.toLowerCase();
      }

      // if it's not saved in the device, we'll try to get
      // the device's locale and check if it's supported or not
      const deviceLocale = Localization.getLocales()?.[0]?.languageTag ?? fallback;
      const languageCode = deviceLocale.split('-')[0].toLowerCase(); // "en-US" or "en-CA" becomes "en"
      if (supportedLocales.includes(languageCode)) {
        setLocale(languageCode);
        return languageCode;
      }

      // if the locale is not supported, we issue a warning so we can
      // identify this for future releases. We'll set to the fallback locale
      // to continue
      logWarn(
        new Error('Unsupported Locale'),
        'getLocale',
        `Unsupported locale "${deviceLocale}", falling back to "${fallback}"`
      );
      setLocale(fallback);
      return fallback;
    } catch (err: unknown) {
      logWarn(err, 'getLocale', 'Error detecting locale:');
      setLocale(fallback);
      return fallback;
    }
  }, [setLocale]);

  // Get the locale
  useEffect(() => {
    getLocale();
  }, [getLocale]);

  // Once it's set we save it to storage
  useEffect(() => {
    Storage.setItem('locale', locale);
  }, [locale]);

  const contextValue = {
    t,
    locale,
    setLocale,
    translate: t,
  };

  return <TranslationContext.Provider value={contextValue}>{children}</TranslationContext.Provider>;
};

export const useTranslation = (): ITranslate => useContext(TranslationContext) as ITranslate;
