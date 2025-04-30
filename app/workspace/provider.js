"use client";
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react';

const WorkspaceProvider = ({ children }) => {
  const newUserMutation = useMutation(api.users.CreateNewUser);
  const { user, isLoaded } = useUser();
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
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      CreateNewUser();
    }
  }, [isLoaded, user]);

  return <div>{children}</div>;
};

export default WorkspaceProvider;