import './globals.css';
import Link from 'next/link';
import Head from 'next/head';

export const metadata = {
  title: 'Lemn',
  description: 'Lemn test app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <Head>
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <body className="bg-gradient m-12 flex min-h-screen flex-col font-mono">
        <header className="p-4 text-center">
          <Link href="/" className="text-center text-xl font-bold">
            Pokemon Information
          </Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
