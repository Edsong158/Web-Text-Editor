import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;
const STORE_NAME = 'jate_content';

const initdb = async () => {
  try {
    return await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
          console.log('jate database created');
        }
      },
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const putDb = async (content) => {
  console.log(content);
  try {
    const db = await initdb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.put({ id: 1, value: content });
  } catch (error) {
    console.error('Error storing data in database:', error);
    throw error;
  }
};

export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const data = await store.get(1);
    return data?.value
  } catch (error) {
    console.error('Error retrieving data from database:', error);
    throw error;
  }
};

// Ensure database initialization on application startup
initdb();