'use client'

import React, { useEffect, useState } from 'react'
import { getAllEntries } from '@/lib/db'

interface Entry {
  id: string
  title: string
  description: string
  createdAt: number
  syncStatus: 'pending' | 'synced'
}

export default function OfflineList() {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    loadOfflineData()
  }, [])

  async function loadOfflineData() {
    const data = await getAllEntries()
    setEntries(data)
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-bold">Saved Offline Entries</h2>

      {entries.length === 0 && (
        <p className="text-gray-500">No entries saved yet.</p>
      )}

      {entries.map((entry) => (
        <div key={entry.id} className="rounded border p-3">
          <h3 className="font-semibold">{entry.title}</h3>
          <p>{entry.description}</p>
          <small className="text-xs text-gray-500">
            {new Date(entry.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  )
}
