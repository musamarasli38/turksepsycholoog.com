import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import Menu from '@/components/Menu';

export default async function LocaleLayout({children, params}) {
  const {locale} = params;
  // Ensure the request is tagged with the locale so translations match the URL
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Menu />
      {children}
    </NextIntlClientProvider>
  );
}
