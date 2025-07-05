// src/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { Toaster } from 'react-hot-toast';
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </main>
  );
}
