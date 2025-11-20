'use client'
import OfflineList from '@/components/entries'
import ThemeToggle from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { saveEntryOffline } from '@/lib/db'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const MainPage = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('SW registered', reg))
        .catch((err) => console.log('SW failed', err))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const entry = {
      id: crypto.randomUUID(),
      title,
      description,
      createdAt: Date.now(),
      syncStatus: 'pending' as const,
    }

    await saveEntryOffline(entry)

    alert('Saved offline!')
    setTitle('')
    setDescription('')
  }
  return (
    <div className="dark:bg-background flex h-screen flex-col items-center gap-6">
      <ThemeToggle />

      <Link href="/test">
        <Button variant={'gradient'}>Testing</Button>
      </Link>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Save Offline
        </button>
      </form>
      <OfflineList />
    </div>
  )
}

export default MainPage
