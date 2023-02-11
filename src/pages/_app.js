import '@/styles/globals.css'
import Head from 'next/head'
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="text-black dark:text-white flex flex-row w-full h-full bg-gradient-to-bl from-white to-[#e0e0e0] dark:from-[#171717] dark:to-[#1c1c1c] min-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  )
}
