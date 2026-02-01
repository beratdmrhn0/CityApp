import * as SecureStore from 'expo-secure-store';

type SetOptions = SecureStore.SecureStoreOptions;

async function setItem(key: string, value: string, options?: SetOptions) {
  await SecureStore.setItemAsync(key, value, options);
}

async function getItem(key: string, options?: SetOptions) {
  return SecureStore.getItemAsync(key, options);
}

async function deleteItem(key: string, options?: SetOptions) {
  await SecureStore.deleteItemAsync(key, options);
}

async function setJson<T>(key: string, value: T, options?: SetOptions) {
  await setItem(key, JSON.stringify(value), options);
}

async function getJson<T>(key: string, options?: SetOptions): Promise<T | null> {
  const raw = await getItem(key, options);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export const secureStorage = {
  setItem,
  getItem,
  deleteItem,
  setJson,
  getJson,
};

