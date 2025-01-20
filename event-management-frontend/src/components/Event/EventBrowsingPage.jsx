import { useEffect, useState } from "react";

import EventCard from "./EventCard";
import Navbar from "./Navbar";
import { useEventContext } from "../../contexts/EventContext";

 const EventBrowsingPage = () => {
  const { events, fetchEvents } = useEventContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);
      try {
        await fetchEvents();
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
   <>
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-600">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No events available at the moment. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  </>
  );

};

export default EventBrowsingPage;