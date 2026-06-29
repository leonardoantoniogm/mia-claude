import "@/styles/legacy/general.css";
import "@/styles/legacy/styles.css";
import "@/styles/legacy/queries-index.css";
import "@/styles/legacy/queries-program.css";
import "@/styles/legacy/queries-gallery.css";
import "@/styles/legacy/queries-staff.css";
import "@/styles/legacy/queries-form.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        strategy="afterInteractive"
      />
      <Script
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        strategy="afterInteractive"
      />
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
