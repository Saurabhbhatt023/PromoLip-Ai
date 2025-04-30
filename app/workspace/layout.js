import React from 'react'
import WorkspaceProvider from './provider'


<<<<<<< HEAD
   function WorkspaceLayout({children}){

      return (

         <div>
            <WorkspaceProvider> 
            {children}
            </WorkspaceProvider>
         </div>
      )
   }
export default WorkspaceLayout
=======
const WorkspaceLayout = ({children}) => {
  return (
    <div>
     <WorkspaceProvider> 
         {children}
         </WorkspaceProvider>

  
    </div>
  )
}

export default WorkspaceLayout

       WorkspaceLayout
>>>>>>> aff22e53b1b7780143a0bf4f2843dd3b58907cc4
