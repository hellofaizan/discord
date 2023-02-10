import React from 'react'
import { Inter } from '@next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = async () => {
  const res = await fetch('https://api.lanyard.rest/v1/users/890232380265222215')
  const data = await res.json()

  return {
    props: { data },  
  }
}

const Home = ({data}) => {  
  console.log(data)
  const image = "https://cdn.discordapp.com/avatars/"+data.data.discord_user.id+"/"+data.data.discord_user.avatar
  
  return (
    <>
    <div>
      <div className="grid w-screen place-items-center">
        <div className="flex flex-col items-center justify-center mt-20 w-96 h-96 bg-gray-800 rounded-lg shadow-xl">
          <div className="flex flex-col items-center justify-center w-32 h-32 bg-gray-700 rounded-full mt-6">
            <Image src={image} width="500" height="500" alt="avatar" className="rounded-full" />
            </div>
          <div className="flex flex-col items-center justify-center bg-gray-700 rounded-lg mb-10 mt-5 px-5 py-3">
            <h1 className="text-2xl font-bold text-white"><Link href="https://discord.gg/invite/rraBbMQraQ">{data.data.discord_user.username}#{data.data.discord_user.discriminator}</Link></h1>
            </div>

          <div className="flex flex-row items-center justify-center bg-gray-700 rounded-lg mb-10 px-4 py-3">
            <h1 className="font-bold text-white">Listening:</h1>
            <h1 className=" text-white ml-1">{data && data.data.listening_to_spotify ? (
              `${data.data.spotify.song} by ${data.data.spotify.artist}`
              ) : "Nothing right now."}</h1>
            </div>
            </div>
      </div>
    </div>
    </>
  )
}

export default Home