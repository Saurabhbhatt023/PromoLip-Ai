"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { LoaderCircle, Sparkles } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const CreateAd = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const GenerateAIVideoScript = async () => {
    if (!userInput) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/generate-script', {
        topic: userInput
      });

      console.log("Response:", response);
    } catch (err) {
      console.error("Error generating script:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='mt-32 flex flex-col items-center justify-center w-full p-7'>
      <div>
        <Image src="/Ad.png" alt="icon" width={150} height={150} />
      </div>
      <h2 className='font-bold text-2xl text-center'>🎥Create Ad Video Ads in Just One Click</h2>
      <p className='mt-3 text-lg text-gray-500'>Turn your idea into stunning, scroll-stopping video- instantly effortlessly, and without editing skills!</p>

      <Input
        placeholder='Enter the topic or product info'
        className='w-lg text-lg mt-5'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <Button
        className='mt-5 w-md'
        onClick={GenerateAIVideoScript}
        disabled={loading}
      >
        {loading ? <LoaderCircle className='animate-spin mr-2' /> : <Sparkles className='mr-2' />}
        Generate
      </Button>
    </div>
  )
}

export default CreateAd
