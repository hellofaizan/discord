import React from 'react'
import { useRef, useState } from "react";
import { Inter } from '@next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/router'
import TimeStatus from './timestatus'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {
  const res = await fetch('https://api.lanyard.rest/v1/users/890232380265222215', {
    headers: {
      Accept: 'application/json',
  },
  })
  const data = await res.json()

  return {
    props: { data },
  }
}

const Home = ({ data }) => {
  const router = useRouter()

    const email = useRef("");
    const message = useRef("");
    const [sending, setSending] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const sendMessage = async () => {
      if (email.current == "" || message.current == "") return setErrMsg("Please fill out all fields!");
      const response = new XMLHttpRequest();

      response.open("POST", process.env.NEXT_PUBLIC_WEBHOOK_URL);
      response.setRequestHeader('Content-type', 'application/json');
      setSending(true);

      const timestamp = new Date();

      const msgEmbed = {
        title: `Message by `+ email.current,
        description: message.current,
        color: hexToDecimal("#FFE900"),
        timestamp: timestamp.toISOString(),
      }

      const params = {
        username: "dc.hellofaizan.me",
        content: "<@890232380265222215>",
        embeds: [msgEmbed]
      }
      response.send(JSON.stringify(params));
      response.onload = () => {
        if (response.status >= 200 && response.status < 400) {
          setSending(false);
          setErrMsg("Message sent successfully!");
        } else {
          setSending(false);
          setErrMsg("Something went wrong!");
        }
      }


    

      function hexToDecimal(hex) {
        return parseInt(hex.replace("#",""), 16)
      }
      
  };

  if (router.isFallback) {
    return <div className='flex flex-col items-center justify-center h-screen w-screen py-2'>Loading Data...</div>
  }
  const image = "https://cdn.discordapp.com/avatars/" + data.data.discord_user.id + "/" + data.data.discord_user.avatar

  return (
    <>
    <Head>
        <meta charSet="utf-8" />
        <title>HelloFaizan - Software Enthusiast</title>
        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#171717" />
        <meta
          name="keywords"
          content="HelloFaizan, Faizan Blog, HelloFaizan blog, CuriousFaizan, web developer, github, typescript, nextjs"
        />
        <meta name="description" content="HelloFaizan - Send message to HelloFaizan" />
        <meta name="author" content="Hello Faizan" />
        <meta property="og:title" content="Drop a message to HelloFaizan" />
        <meta
          property="og:description"
          content="HelloFaizan is a liberal person who loves to share his knowledge with others."
        />
        <meta
          property="og:image"
          content="/dc.png"
        />
        <link rel="apple-touch-icon" href="/faizan.png" />
      </Head>
      {/* Icons Card */}
      <div className='absolute bottom-0 left-0 py-2 md:block hidden ml-10 mb-5'>
        <div className='flex flex-col ml-10 mb-10 space-y-5'>
          <a href='https://dicord.gg/invite/rraBbMQraQ' target="_blank" rel="noreferrer"><i className="bi bi-discord hover:text-blue-500"></i></a>
          <a href='https://youtube.com/hellofaizan' target="_blank" rel="noreferrer"><i className="bi bi-youtube hover:text-red-600"></i></a>
          <a href='https://github.com/hellofaizan' target="_blank" rel="noreferrer"><i className="bi bi-github"></i></a>
          <a href='https://www.instagram.com/curiousfaizan/' target="_blank" rel="noreferrer"><i className="bi bi-instagram hover:text-[#ff2bf1]"></i></a>
          <a href='https://twitter.com/HelloFaizandev' target="_blank" rel="noreferrer"><i className="bi bi-twitter hover:text-blue-500"></i></a>
        </div>
      </div>

      {/* Open Source Card at bottow */}
      <div className='absolute bottom-0 right-0 md:block hidden mr-10 mb-5'>
        <p>Ope Source <span className='hover:text-green-600'><a href='https://github.com/hellofaizan/discord' target="_blank" rel="noreferrer"><i class="bi bi-github"></i> Github</a></span></p>
        </div>

      <div className='w-full md:w-1/2 lg:w-1/2 md:justify-center md:container mx-5 mt-5 md:mt-5'>

        {/* Top Card */}
        <div className="relative md:mx-5 place-content-center block overflow-hidden rounded-lg border dark:border-gray-300 border-gray-700 p-4 shadow-lg">
          <span
            className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
          ></span>

          <div className="justify-between flex">
            <div>
              <h3 className="text-lg font-bold dark:text-gray-300 text-gray-900">
                {data && data.data.discord_user.username}#{data && data.data.discord_user.discriminator}
              </h3>
              <div className="flex flex-col">
                <p className="mt-1 text-xs font-medium text-gray-600">
                  {/* Switch case in jsx */}
                  {data && data.data.activities[0] && data.data.activities[0].state} - <span>
                    {/* If else */}
                    {data && data.data.activities[0] && data.data.discord_status == "dnd" ? (
                      <span className='text-red-600 font-bold'>{data && data.data.activities[0] && data.data.discord_status} <i className="bi bi-dot font-bold"></i></span>
                    ) : data && data.data.activities[0] && data.data.discord_status == "online" ? (
                      <span className='text-green-500 font-bold'>{data && data.data.activities[0] && data.data.discord_status} <i className="bi bi-dot font-bold"></i></span>
                    ) : data && data.data.activities[0] && data.data.discord_status == "idle" ? (
                      <span className='text-yellow-500 font-bold'>{data && data.data.activities[0] && data.data.discord_status} <i className="bi bi-dot font-bold"></i></span>
                    ) : (
                      <span className='text-gray-500'>No Status - Offline <i className="bi bi-dot"></i></span>
                    )
                    }
                  </span>
                </p>
              </div>
            </div>

            <div className="ml-3 flex-shrink-0 sm:block">
              <Image
                alt="Paul Clapton"
                src={image}
                className="h-16 w-16 rounded-lg object-cover shadow-sm"
                width={500}
                height={500}
              />
            </div>
          </div>

        </div>

        {/* Bottom Card */}
        <div className='relative overflow-hidden rounded-lg p-5 md:mx-5 shadow-lg mt-6 mb-10 border border-gray-700 dark:border-gray-300' >
          <span
            className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
          ></span>

          <form className=" space-y-4">
            <p className="text-2xl mt-2 mb-0 font-medium">Let&apos;s chat 💬</p>
            <TimeStatus />

            <div>
              <label htmlFor="email" className="text-sm font-medium">Enter Discord Id or Email Address</label>

              <div className="relative mt-1">
                <input
                  type="text"
                  onChange={e => (email.current = e.target.value)}
                  className="w-full rounded-lg dark:bg-[#1e2126] text-black dark:text-white border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="yourname#0000"
                />
                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                  <i className="bi bi-discord"></i>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium">Your Message</label>

              <div className="relative mt-1">
                <textarea
                  id="message"
                  rows="4"
                  onChange={e => (message.current = e.target.value)}
                  className="w-full dark:bg-[#1e2126] rounded-lg text-black dark:text-white border-gray-200 p-4 mb-2 pr-12 text-sm shadow-sm"
                  placeholder="Drop your message. I will reply back soon."
                />
              </div>
            </div>

            <button
            type='button'
              onClick={sendMessage}
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              <span>
              Send Message
                    {sending && <i class="bi bi-stop-circle animate-spin ml-2"></i>}
                    {!sending && <i className="bi bi-chat-left ml-2"></i>}
              </span>
            </button>

            <p className="text-center text-sm text-gray-500">
              {errMsg}
            </p>
          </form>
        </div>

      </div>
    </>
  )
}

export default Home