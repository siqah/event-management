/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);



// eslint-disable-next-line react/prop-types
export const EventPrivider = ({ children}) => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    //Fetch all events
    const fetchEvents = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/event/getAllEvents");
            const data = await response.json();
            setEvents(data);
        }catch(error){
            console.error("Error:", error);
        }
    }

    //Create an event 
    const createEvent = async (eventData) => {
        try{
            const response = await fetch("http://localhost:3000/api/events/createEvent", {
                method: "POST",
                headers:{"Contest-Type": "application/json"},
                body: JSON.stringify(eventData),
            });
            const newEvent = await response.json();
            setEvents([...events, newEvent]); // update local state

        }catch(error){
            console.eror("error creating event:", error);
        }
    };

    //Update an event
    const updateEvent = async (id, updateEventData) => {
        try{
            const response = await fetch(`htttp://localhost:3000/api/events/${id}`,{
                method: "PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(updateEventData)

            });
            const updatedEvent = await response.json();
            setEvents(events.map((event) => (event.id === id ? updatedEvent : event)));

        }catch(error){
            console.error("Error message:", error)
        }
    }

    //Delete an Event
    const deleteEvent = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/events/${id}`, {
                method: "DELETE",
            });
            setEvents(events.filter((event) => event.id !== id)); // Remove from local state
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    //select an event
    const selectEvent = (event) => {
        setSelectedEvent(event)
    };
    return (
        <EventContext.Provider 
         value= {{
            events,
            selectedEvent,
            fetchEvents,
            createEvent,
            updateEvent,
            deleteEvent,
            selectEvent,
         }}
        >
            {children}
        </EventContext.Provider>
    )
    

}