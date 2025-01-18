import Navbar from "./Navbar";

const EventBrowsingPage = () => {
    return (
        <div className="container mx-auto p-4">
            <Navbar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Example event card */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Event Title</h2>
                    <p className="text-gray-700 mb-4">Event description goes here. It provides a brief overview of the event.</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">View Details</button>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Event Title</h2>
                    <p className="text-gray-700 mb-4">Event description goes here. It provides a brief overview of the event.</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">View Details</button>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Event Title</h2>
                    <p className="text-gray-700 mb-4">Event description goes here. It provides a brief overview of the event.</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">View Details</button>
                </div>
                {/* Add more event cards as needed */}
            </div>
        </div>
    );
};

export default EventBrowsingPage;