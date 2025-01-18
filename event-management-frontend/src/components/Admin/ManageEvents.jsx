import { useEffect, useState } from "react";
import axios from "axios";


function ManageEvents() {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      const fetchEvents = async () => {
        const response = await axios.get("/api/events");
        setEvents(response.data);
      };
      fetchEvents();
    }, []);
  
    const deleteEvent = async (id) => {
      await axios.delete(`/api/events/${id}`);
      setEvents(events.filter((event) => event.id !== id));
    };
  
    return (
      <div>
        <h2>Manage Events</h2>
        {events.map((event) => (
          <div key={event.id}>
            <h3>{event.title}</h3>
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }

  export default ManageEvents;