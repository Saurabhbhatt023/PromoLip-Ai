"use client";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { Sidebar } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AppSidebar from './_components/AppSidebar';

const WorkspaceProvider = ({ children }) => {
  const newUserMutation = useMutation(api.users.CreateNewUser);
  const { user, isLoaded } = useUser();
  const [userDetail , setUserDetail] = useState()
  const [isUserCreated, setIsUserCreated] = useState(false);

  const CreateNewUser = async () => {
    if (!user || !isLoaded || isUserCreated) return;
    
    try {
      const result = await newUserMutation({
        name: user?.fullName || '',
        email: user?.primaryEmailAddress?.emailAddress || '',
        picture: user?.imageUrl || '',
      });
      console.log("User created/loaded:", result);
      setIsUserCreated(true);
      setUserDetail(result)
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      CreateNewUser();
      
    }
  }, [isLoaded, user]);

  return (
    <UserDetailContext.Provider value = {{userDetail , setUserDetail}}> 
  
      <SidebarProvider> 
        <AppSidebar/>
      <div>
      <SidebarTrigger/>
        {children}</div>
      </SidebarProvider>
  </UserDetailContext.Provider>
)
}

export default WorkspaceProvider;
