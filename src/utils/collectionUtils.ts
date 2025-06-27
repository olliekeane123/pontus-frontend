import { useState, useEffect } from "react"

const COLLECTION_KEY = "my_art_collection"

export const getCollection = (): any[] => {
    const stored = sessionStorage.getItem(COLLECTION_KEY)
    return stored ? JSON.parse(stored) : []
}

const saveCollectionToStorage = (collection: any[]) => {
    sessionStorage.setItem(COLLECTION_KEY, JSON.stringify(collection))
}

export const useCollection = () => {
    const [collection, setCollection] = useState<any[]>(getCollection())

    useEffect(() => {
        saveCollectionToStorage(collection)
    }, [collection])

    const addToCollection = (artwork: any) => {
        const current = getCollection()
        const exists = current.find((a) => a.id === artwork.id && a.source === artwork.source)
        if (!exists) {
            const updated = [...current, artwork]
            setCollection(updated)
        }
    }

    const removeFromCollection = (artworkId: string | number, source: string) => {
        const current = getCollection()
        const updated = current.filter((a) => !(a.id === artworkId && a.source === source))
        setCollection(updated)
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
        setCollection
    }
}