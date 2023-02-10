import React from 'react'
import { Inter } from '@next/font/google'
import Image from 'next/image'

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
        <div className="flex flex-col items-center justify-center w-96 h-96 bg-gray-800 rounded-lg shadow-xl">
          <div className="flex flex-col items-center justify-center w-32 h-32 bg-gray-700 rounded-full">
            <Image src={image} width="500" height="500" alt="avatar" className="w-24 h-24 rounded-full" />
            </div>
            </div>
      </div>
    </div>
    </>
  )
}

export default Home