import { openDB, DBSchema } from 'idb'

interface Entry {
  id: string
  title: string
  description: string
  createdAt: number
  syncStatus: 'pending' | 'synced'
}

interface MyDB extends DBSchema {
  entries: {
    key: string
    value: Entry
  }
}

export const dbPromise = openDB<MyDB>('my-offline-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('entries')) {
      db.createObjectStore('entries', { keyPath: 'id' })
    }
  },
})

export async function saveEntryOffline(entry: Entry) {
  const db = await dbPromise
  await db.put('entries', entry)
}

export async function getAllEntries() {
  const db = await dbPromise
  return await db.getAll('entries')
}

export async function getPendingEntries() {
  const db = await dbPromise
  return await db.getAllFromIndex('entries', 'syncStatus')
}
