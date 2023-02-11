import React from 'react'
import { Inter } from '@next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/router'

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

const Home = ({data, data2}) => {  
  const router = useRouter()
  console.log(data)
  console.log(data2)
  if (router.isFallback) {
    return <div className='flex flex-col items-center justify-center h-screen w-screen py-2'>Loading...</div>
  }
  const image = "https://cdn.discordapp.com/avatars/"+data.data.discord_user.id+"/"+data.data.discord_user.avatar
  
  return (
    <>
      <div className='w-1/3 justify-center container mt-10'>
        <div class="relative place-content-center block overflow-hidden rounded-lg border border-gray-100 p-8">
          <span
            class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
          ></span>

          <div class="justify-between sm:flex">
            <div>
              <h3 class="text-xl font-bold dark:text-gray-300 text-gray-900">
                {data && data.data.discord_user.username}#{data && data.data.discord_user.discriminator}
              </h3>
              <div className="flex flex-col">
              <p class="mt-1 text-xs font-medium text-gray-600">
                {/* Switch case in jsx */}
                {data && data.data.activities[0] && data.data.activities[0].state} - <span>
                  {/* If else */}
                  {data && data.data.activities[0] && data.data.discord_status == "dnd" ? (
                    <span className='text-red-600'>{data && data.data.activities[0] && data.data.discord_status}</span>
                  ) : (
                    <span className='text-green-500'>{data && data.data.activities[0] && data.data.discord_status}</span>
                  )}
                </span>
              </p>
              </div>
            </div>

            <div class="ml-3 hidden flex-shrink-0 sm:block">
              <Image
                alt="Paul Clapton"
                src={image}
                class="h-16 w-16 rounded-lg object-cover shadow-sm"
                width={150}
                height={150}
              />
            </div>
          </div>

          <dl class="mt-6 flex">
            <div class="flex flex-col-reverse">
              <dt class="text-sm font-medium text-gray-600">Published</dt>
              <dd class="text-xs text-gray-500">31st June, 2021</dd>
            </div>

            <div class="ml-3 flex flex-col-reverse sm:ml-6">
              <dt class="text-sm font-medium text-gray-600">Reading time</dt>
              <dd class="text-xs text-gray-500">3 minute</dd>
            </div>
          </dl>
        </div>

      </div>
    </>
  )
}

export default Home