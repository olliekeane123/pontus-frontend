// Pages/MyCollection.tsx
import { useEffect, useState } from "react"
import Header from "../Components/Header"
import ArtworkCard from "../Components/ArtworkCard"
import ArtworkModal from "../Components/ArtworkModal"
import { useCollection } from "../utils/collectionUtils" // Import the custom hook

const MyCollection = () => {
    // Use the custom collection hook
    const { collection, removeFromCollection } = useCollection() // We don't need setCollection here as useCollection manages it

    const [selectedArtwork, setSelectedArtwork] = useState<any>(null)
    const [showModal, setShowModal] = useState<boolean>(false)

    // When the collection changes, if the modal is open and the selected artwork is no longer in the collection, close the modal.
    // This is good UX to prevent showing a modal for an artwork that's just been removed from this view.
    useEffect(() => {
        if (showModal && selectedArtwork) {
            const isStillInCollection = collection.some(
                (item) =>
                    item.id === selectedArtwork.id &&
                    item.source === selectedArtwork.source
            )
            if (!isStillInCollection) {
                closeModal()
            }
        }
    }, [collection, showModal, selectedArtwork])

    const handleRemove = (artwork: any, e: React.MouseEvent) => {
        e.stopPropagation()
        removeFromCollection(artwork.id, artwork.source)
        // No need to call setCollection(getCollection()) here, useCollection handles state updates.
    }

    // Since the item is being removed from MyCollection, we need to consider closing the modal
    // after removal to reflect the change visually.
    const handleRemoveFromCollectionAndCloseModal = (
        artwork: any,
        e: React.MouseEvent
    ) => {
        handleRemove(artwork, e) // Perform the removal
        closeModal() // Close the modal after removal
    }

    const openModal = (artwork: any) => {
        setSelectedArtwork(artwork)
        setShowModal(true)
        document.body.style.overflow = "hidden"
    }

    const closeModal = () => {
        setSelectedArtwork(null)
        setShowModal(false)
        document.body.style.overflow = "unset"
    }

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">My Collection</h1>

                {collection.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {collection.map((artwork, index) => (
                            <ArtworkCard
                                key={artwork.id || `artwork-${index}`}
                                artwork={artwork}
                                onArtworkClick={openModal}
                                onAddToCollection={() => {}} // Not applicable in MyCollection
                                onRemoveFromCollection={handleRemove} // ArtworkCard calls this
                                isInCollection={true} // Always true for items displayed here
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-lg text-center py-16">
                        Your collection is empty.
                    </p>
                )}

                <ArtworkModal
                    artwork={selectedArtwork}
                    isOpen={showModal}
                    onClose={closeModal}
                    // This is the crucial part: dynamically check if the selected artwork is still in the collection
                    isInCollection={
                        selectedArtwork
                            ? collection.some(
                                  (item) =>
                                      item.id === selectedArtwork.id &&
                                      item.source === selectedArtwork.source
                              )
                            : false
                    }
                    onAddToCollection={() => {}} // Not needed here as you only remove from MyCollection modal
                    onRemoveFromCollection={
                        handleRemoveFromCollectionAndCloseModal
                    } // Use the new handler for modal removal
                />
            </main>
        </>
    )
}

export default MyCollection
