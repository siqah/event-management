/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events/allEvents");
      const data = await response.json();
      console.log("Fetched events:", data); // Debug log
      setEvents(data);
      return data;
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  

  // Create an event
  const createEvent = async (eventData) => {
    try {
      const response = await fetch("http://localhost:5000/api/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      } );
      const newEvent = await response.json();
      setEvents((prev) => [...prev, newEvent]); // Update local state
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  // Update an event
  const updateEvent = async (id, updatedEventData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEventData),
      });
      const updatedEvent = await response.json();
      setEvents((prev) =>
        prev.map((event) => (event.id === id ? updatedEvent : event))
      );
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // Delete an Event
  const deleteEvent = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
      });
      setEvents((prev) => prev.filter((event) => event.id !== id)); // Remove from local state
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Fetch an event by ID
  const fetchEventById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`);
      const data = await response.json();
      setSelectedEvent(data);
      return data;
    } catch (error) {
      console.error("Error fetching event by ID:", error);
    }
  };

  // Select an event
  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        selectedEvent,
        fetchEventById,
        fetchEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        selectEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
