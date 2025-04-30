"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from 'react'

const Provider = ({children}) => {

    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)
  return (

<ConvexProvider client={convex}>
<<<<<<< HEAD
    <div>
=======
<div>
>>>>>>> aff22e53b1b7780143a0bf4f2843dd3b58907cc4
    {children}      
    </div>
    </ConvexProvider>
  )
}

export default Provider
