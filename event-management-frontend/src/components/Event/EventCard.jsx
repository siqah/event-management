/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`/events/${event.id}`); // Navigate to the event details page
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-bold">{event.title}</h3>
      <p className="text-sm text-gray-600">{event.date}</p>
      <p className="text-sm text-gray-600">{event.location}</p>
      <button
        onClick={handleShowDetails}
        className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Show More
      </button>
    </div>
  );
};

export default EventCard;