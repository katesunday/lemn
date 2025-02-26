import './globals.css';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-gradient m-12 flex min-h-screen flex-col font-mono">
        <header className="p-4 text-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 text-center text-xl font-bold"
          >
            <Image src="/favicon.ico" alt="logo" width={40} height={40} />
            Pokemon Information
          </Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
