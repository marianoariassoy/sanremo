import React, { useState, ReactNode } from 'react'
import Header from '../components/Header/index'
import Sidebar from '../components/Sidebar/index'
import { useAuth } from '../context'

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isLoggedIn } = useAuth()

  return (
    <div className='dark:bg-boxdark-2 dark:text-bodydark'>
      <div className='flex h-screen overflow-hidden'>
        {isLoggedIn && (
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          {isLoggedIn && (
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          )}

          <main>
            <div className='mx-auto max-w-screen-3xl'>{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
