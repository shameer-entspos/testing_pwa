import { openDB, DBSchema, IDBPDatabase } from 'idb'

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
    indexes: { syncStatus: 'pending' | 'synced' } // define index type
  }
}

let dbPromise: Promise<IDBPDatabase<MyDB>> | null = null

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<MyDB>('my-offline-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('entries')) {
          const store = db.createObjectStore('entries', { keyPath: 'id' })
          store.createIndex('syncStatus', 'syncStatus')
        }
      },
    })
  }
  return dbPromise
}

// Save entry offline
export async function saveEntryOffline(entry: Entry) {
  const db = await getDB()
  await db.put('entries', entry)
}

// Get all entries
export async function getAllEntries(): Promise<Entry[]> {
  const db = await getDB()
  return db.getAll('entries')
}

// Get only pending entries
export async function getPendingEntries(): Promise<Entry[]> {
  const db = await getDB()
  return db.getAllFromIndex('entries', 'syncStatus', 'pending')
}

// Optional: get synced entries
export async function getSyncedEntries(): Promise<Entry[]> {
  const db = await getDB()
  return db.getAllFromIndex('entries', 'syncStatus', 'synced')
}
