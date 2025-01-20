import { useState } from "react";
import { Link } from "react-router-dom";
import { useEventContext } from "../../contexts/EventContext";

const EventCreationPage = () => {
  const { createEvent } = useEventContext(); // Access the createEvent function from context
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    tickets_Available: "",
    price: "",
    creator_Name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(eventData); // Use the context function to create the event
      alert("Event created successfully!");

      // Clear the form after successful submission
      setEventData({
        title: "",
        date: "",
        location: "",
        description: "",
        tickets_Available: "",
        price: "",
        creator_Name: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="space-y-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="flex space-x-8 items-center">
          <button>
            <Link to="/" className="text-gray-800">
              Home
            </Link>
          </button>

          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create Event
          </h2>
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter event title"
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter event location"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Provide a brief description"
          />
        </div>
        <div>
          <label
            htmlFor="ticketsAvailable"
            className="block text-sm font-medium text-gray-700"
          >
            Tickets Available
          </label>
          <input
            type="number"
            id="ticketsAvailable"
            name="tickets_Available"
            value={eventData.tickets_Available}
            onChange={handleInputChange}
            required
            min={1}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter number of tickets"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={eventData.price}
            onChange={handleInputChange}
            required
            min={0}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter ticket price"
          />
        </div>
        <div>
          <label
            htmlFor="creatorName"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name
          </label>
          <input
            type="text"
            id="creatorName"
            name="creator_Name"
            value={eventData.creator_Name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your name you want to display as creator"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventCreationPage;
