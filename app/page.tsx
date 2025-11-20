import ThemeToggle from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const MainPage = () => {
  return (
    <div className="dark:bg-background h-screen">
      <ThemeToggle />
      MainPage
      <Link href="/test">
        <Button variant={'gradient'}>Testing</Button>
      </Link>
    </div>
  )
}

export default MainPage
