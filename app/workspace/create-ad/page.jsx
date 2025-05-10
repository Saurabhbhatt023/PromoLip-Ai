"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { LoaderCircle, Sparkles } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

const CreateAd = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [scripts, setScripts] = useState([]);
  const [selectedScriptIndex, setSelectedScriptIndex] = useState(null);
  const createVideo = useMutation(api.video.createVideoData);

  const GenerateAIVideoScript = async () => {
    if (!userInput) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/generate-script', {
        topic: userInput
      });

      console.log("Response:", response.data);
      
      if (response.data.scripts && Array.isArray(response.data.scripts)) {
        setScripts(response.data.scripts);
      } else {
        console.log("Invalid scripts format");
        setScripts([]);
      }
      
    } catch (err) {
      console.error("Error generating script:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSelectScript = async (index) => {
    setSelectedScriptIndex(index);
    
    try {
      const videoId = await createVideo({
        topic: userInput,
        script: scripts[index]
      });
      
      console.log("Video created with ID:", videoId);
    } catch (err) {
      console.error("Error saving script:", err);
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
      
      {scripts.length > 0 && (
        <div className='mt-8 w-full max-w-2xl'>
          <h3 className='font-bold text-xl mb-4'>Choose a Script</h3>
          
          {scripts.map((script, index) => (
            <div 
              key={index}
              className={`p-4 mb-4 border rounded-lg cursor-pointer ${selectedScriptIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
              onClick={() => handleSelectScript(index)}
            >
              <h4 className='font-medium mb-2'>Script Option {index + 1}</h4>
              <p className='text-gray-700 whitespace-pre-wrap'>{script.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CreateAd