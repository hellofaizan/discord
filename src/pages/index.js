import React from 'react'
import { Inter } from '@next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/router'
import TimeStatus from './timestatus'

const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = async () => {
  const res = await fetch('https://api.lanyard.rest/v1/users/890232380265222215')
  const data = await res.json()

  // get github followers using fetch
  const res2 = await fetch('https://api.github.com/users/curiousfaizan')
  const data2 = await res2.json()

  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: { data, data2 },
    revalidate: 15
  }
}

const Home = ({ data, data2 }) => {
  const router = useRouter()
  console.log(data)
  console.log(data2)
  if (router.isFallback) {
    return <div className='flex flex-col items-center justify-center h-screen w-screen py-2'>Loading...</div>
  }
  const image = "https://cdn.discordapp.com/avatars/" + data.data.discord_user.id + "/" + data.data.discord_user.avatar

  return (
    <>
      {/* Icons Card */}
      <div className='absolute bottom-0 left-0 py-2 md:block hidden ml-10 mb-5'>
        <div className='flex flex-col ml-10 mb-10 space-y-5'>
          <a href='https://dicord.gg/invite/rraBbMQraQ' target="_blank" rel="noreferrer"><i class="bi bi-discord hover:text-blue-500"></i></a>
          <a href='https://youtube.com/hellofaizan' target="_blank" rel="noreferrer"><i class="bi bi-youtube hover:text-red-600"></i></a>
          <a href='https://github.com/hellofaizan' target="_blank" rel="noreferrer"><i class="bi bi-github"></i></a>
          <a href='https://www.instagram.com/curiousfaizan/' target="_blank" rel="noreferrer"><i class="bi bi-instagram hover:text-[#ff2bf1]"></i></a>
          <a href='https://twitter.com/HelloFaizandev' target="_blank" rel="noreferrer"><i class="bi bi-twitter hover:text-blue-500"></i></a>
        </div>
      </div>

      <div className='w-full md:w-1/2 lg:w-1/2 md:justify-center md:container mx-5 mt-5 md:mt-5'>

        {/* Top Card */}
        <div className="relative md:mx-5 place-content-center block overflow-hidden rounded-lg border dark:border-gray-300 border-gray-700 p-4 shadow-lg">
          <span
            className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
          ></span>

          <div className="justify-between flex">
            <div>
              <h3 className="text-base font-bold dark:text-gray-300 text-gray-900">
                {data && data.data.discord_user.username}#{data && data.data.discord_user.discriminator}
              </h3>
              <div className="flex flex-col">
                <p className="mt-1 text-xs font-medium text-gray-600">
                  {/* Switch case in jsx */}
                  {data && data.data.activities[0] && data.data.activities[0].state} - <span>
                    {/* If else */}
                    {data && data.data.activities[0] && data.data.discord_status == "dnd" ? (
                      <span className='text-red-600 font-bold'>{data && data.data.activities[0] && data.data.discord_status}</span>
                    ) : data && data.data.activities[0] && data.data.discord_status == "online" ? (
                      <span className='text-green-500 font-bold'>{data && data.data.activities[0] && data.data.discord_status}</span>
                    ) : data && data.data.activities[0] && data.data.discord_status == "idle" ? (
                      <span className='text-yellow-500 font-bold'>{data && data.data.activities[0] && data.data.discord_status}</span>
                    ) : (
                      <span className='text-gray-500'>No Status - Offline</span>
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

          <form action="" className=" space-y-4">
            <p className="text-2xl mt-2 mb-0 font-medium">Let&apos;s chat 💬</p>
            <TimeStatus />

            <div>
              <label for="email" className="text-sm font-medium">Enter Discord Id or Email Address</label>

              <div className="relative mt-1">
                <input
                  type="username"
                  id="username"
                  className="w-full rounded-lg dark:bg-[#1e2126] text-black dark:text-white border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="yourname#0000"
                />
                <span class="absolute inset-y-0 right-4 inline-flex items-center">
                  <i class="bi bi-discord"></i>
                </span>
              </div>
            </div>

            <div>
              <label for="password" className="text-sm font-medium">Your Message</label>

              <div className="relative mt-1">
                <textarea
                  type="message"
                  id="message"
                  rows="4"
                  className="w-full dark:bg-[#1e2126] rounded-lg text-black dark:text-white border-gray-200 p-4 mb-2 pr-12 text-sm shadow-sm"
                  placeholder="Drop your message. I will reply back soon."
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Send Message   <i class="bi bi-chat-left ml-2"></i>
            </button>

            <p className="text-center hidden text-sm text-gray-500">
              Error Message Here
            </p>
          </form>
        </div>

      </div>
    </>
  )
}

export default Home