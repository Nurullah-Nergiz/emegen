'use client';

export default function UserProfileError({ error, reset }) {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <h2 className="text-2xl font-bold text-red-500">
                    User Profile Error
                </h2>
                <p className="mt-2 text-gray-600">
                    We couldn't load the profile you were looking for.
                </p>
                <p className="text-gray-600">
                    Please try again later or check the username.
                </p>
                <button
                    onClick={() => reset()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Try again
                </button>
            </div>
        </>
    );
}
