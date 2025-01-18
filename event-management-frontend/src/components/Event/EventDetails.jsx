/* eslint-disable react/prop-types */

const EventDetails = ({ event }) => {
    if (!event) {
        return <div>No event details available.</div>;
    }

    return (
        <div className="event-details">
            <h2>{event.name}</h2>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>
        </div>
    );
};

export default EventDetails;