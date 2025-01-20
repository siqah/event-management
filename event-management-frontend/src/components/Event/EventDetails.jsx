import  { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEventContext } from "../../contexts/EventContext";

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const { selectedEvent, fetchEventById } = useEventContext();

  useEffect(() => {
    fetchEventById(id); // Fetch the selected event details
  }, [id, fetchEventById]);

  if (!selectedEvent) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedEvent.title}</h2>
      <div className="flex items-center text-gray-600 mb-2">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H6zm1 2V3h6v1H7zm-2 3h10v10H5V7z" />
        </svg>
        <span>{selectedEvent.date}</span>
      </div>
      <div className="flex items-center text-gray-600 mb-2">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
        <span>{selectedEvent.location}</span>
      </div>
      <p className="text-gray-700 mt-4">{selectedEvent.description}</p>
      <div className="mt-4">
        <span className="font-semibold">Tickets Available:</span> {selectedEvent.tickets_available}
      </div>
      <div className="mt-2">
        <span className="font-semibold">Price:</span> ${selectedEvent.price}
      </div>
      <div className="mt-2">
        <span className="font-semibold">Creator:</span> {selectedEvent.creator_name}
      </div>
    </div>
  );
};

export default EventDetails;
