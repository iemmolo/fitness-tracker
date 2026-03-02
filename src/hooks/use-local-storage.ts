import { useState, useCallback } from "react"
import { getStorageItem, setStorageItem, removeStorageItem } from "@/lib/storage"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    getStorageItem(key, initialValue)
  )

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value
        setStorageItem(key, next)
        return next
      })
    },
    [key]
  )

  const removeValue = useCallback(() => {
    removeStorageItem(key)
    setStoredValue(initialValue)
  }, [key, initialValue])

  return [storedValue, setValue, removeValue] as const
}
