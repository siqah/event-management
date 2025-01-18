/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import  { createContext, useState, useContext } from 'react';

// Create the context
const EventContext = createContext();

// Create a provider component
export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    const addEvent = (event) => {
        setEvents([...events, event]);
    };

    const removeEvent = (eventId) => {
        setEvents(events.filter(event => event.id !== eventId));
    };

    const updateEvent = (updatedEvent) => {
        setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    };

    return (
        <EventContext.Provider value={{ events, addEvent, removeEvent, updateEvent }}>
            {children}
        </EventContext.Provider>
    );
};

// Custom hook to use the EventContext
export const useEventContext = () => {
    return useContext(EventContext);
};