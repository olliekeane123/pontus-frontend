// utils/collectionUtils.ts

import { useState, useEffect } from "react" // <-- Make sure to import useState and useEffect

const COLLECTION_KEY = "my_art_collection"

// This function will be the single source of truth for getting the collection
export const getCollection = (): any[] => {
    const stored = sessionStorage.getItem(COLLECTION_KEY)
    return stored ? JSON.parse(stored) : []
}

// This function will be the single source of truth for saving the collection
const saveCollectionToStorage = (collection: any[]) => {
    sessionStorage.setItem(COLLECTION_KEY, JSON.stringify(collection))
}

// We'll use a custom hook to manage the collection state and expose update functions
export const useCollection = () => { // <-- This is the missing export
    const [collection, setCollection] = useState<any[]>(getCollection())

    useEffect(() => {
        // This effect will run whenever the collection state changes
        // and save it to sessionStorage.
        saveCollectionToStorage(collection)
    }, [collection])

    const addToCollection = (artwork: any) => {
        const current = getCollection() // Always get the latest from storage
        const exists = current.find((a) => a.id === artwork.id && a.source === artwork.source)
        if (!exists) {
            const updated = [...current, artwork]
            setCollection(updated) // Update the state, which triggers the useEffect to save
        }
    }

    const removeFromCollection = (artworkId: string | number, source: string) => {
        const current = getCollection() // Always get the latest from storage
        const updated = current.filter((a) => !(a.id === artworkId && a.source === source))
        setCollection(updated) // Update the state, which triggers the useEffect to save
    }

    const isInCollection = (artwork: any): boolean => {
        return collection.some(
            (item) => item.id === artwork.id && item.source === artwork.source
        )
    }

    return {
        collection,
        addToCollection,
        removeFromCollection,
        isInCollection,
        setCollection // Expose setCollection for direct updates if needed (e.g., initial load in MyCollection)
    }
}