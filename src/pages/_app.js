import '@/styles/globals.css'
import Head from 'next/head'
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <!-- COMMON TAGS --> */}
        <meta charset="utf-8" />/
        <title>Hello Faizan - Software Enthusiast</title>
        {/* <!-- Search Engine --> */}
        <meta name="description" content="Chech out all socials of Hellofaizan at one place" />
        <meta name="image" content="https://cdn.discordapp.com/attachments/1065518726855807067/1065518819377950790/cover-image_4.png" />
        {/* <!-- Schema.org for Google --> */}
        <meta itemprop="name" content="Hello Faizan - Software Enthusiast" />
        <meta itemprop="description" content="Chech out all socials of Hellofaizan at one place" />
        <meta itemprop="image" content="https://cdn.discordapp.com/attachments/1065518726855807067/1065518819377950790/cover-image_4.png" />
        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Hello Faizan - Software Enthusiast" />
        <meta name="twitter:description" content="Chech out all socials of Hellofaizan at one place" />
        <meta name="twitter:site" content="@hellofaizandev" />
        <meta name="twitter:image:src" content="https://cdn.discordapp.com/attachments/1065518726855807067/1065518819377950790/cover-image_4.png" />
        {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
        <meta name="og:title" content="Hello Faizan - Software Enthusiast" />
        <meta name="og:description" content="Chech out all socials of Hellofaizan at one place" />
        <meta name="og:image" content="/faizan.png" />
        <meta name="og:url" content="https://l.hellofaizan.me" />
        <meta name="og:site_name" content="Hello Faizan Social Media Links" />
        <meta name="og:locale" content="en_IN" />
        <meta name="fb:admins" content="100008806001503" />
        <meta name="og:type" content="website" />
      </Head>
      <div className="text-black dark:text-white flex flex-row w-full h-full bg-gradient-to-bl from-white to-[#e0e0e0] dark:from-[#171717] dark:to-[#1c1c1c] min-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  )
}
