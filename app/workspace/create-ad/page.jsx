"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const CreateAd = () => {
  const [userInput ,setUserInput] = useState();
  return (
    <div className = 'mt-32 flex flex-col items-center justify-center w-full p-7 '>
   <div>
  <Image src="/Ad.png" alt="icon" width={150} height={150} />
</div>
      <h2 className='font-bold text-2xl text-center'> 🎥Create Ad Video Ads in  Just One Click</h2>
      <p className='mt-3 text-lg text-gray-500 '> Turn your idea into stunning, scroll-stopping video- instantly effortlessly, and without editing skills!</p>
    
    <Input placeholder = 'Enter the topic or product info' className={'w-lg text-lg mt-5 '} 
    
     onChange={(e) => setUserInput(e.target.value)}
    />
 

    <Button className={'mt-5 w-md'}> <Sparkles/> Generate</Button>
 
    </div>
  )
}

export default CreateAd