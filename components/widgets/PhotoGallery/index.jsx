/**
 *
 * @param {Object} param0
 * @param {Array} param0.photosList
 * @returns
 */
export default function PhotoGallery({ photosList = [] }) {
return (
    <section className="h-60 max-w-screen-2xl main flex flex-col gap-4 overflow-hidden">
        <header className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Photo Gallery
            </h2>
            <div className="flex space-x-2">
                <button className="p-2 bg-blue-500 text-white rounded">Previous</button>
                <button className="p-2 bg-blue-500 text-white rounded">Next</button>
            </div>
        </header>
        <main className=" overflow-x-auto">
            {photosList.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                    No photos available.
                </p>
            ) : (
                <>
                    {photosList.map((photo, index) => (
                        <div
                            key={index}
                            className="min-w-80 h-48 overflow-hidden rounded-lg float-left mr-4">
                            <img
                                src={photo.url}
                                alt={photo.alt || `Photo ${index + 1}`}
                                className="min-w-80 h-full object-cover"
                            />
                        </div>
                    ))}
                </>
            )}
        </main>
    </section>
);
}
