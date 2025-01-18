import { useState, useEffect } from 'react';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch('/api/bookings')
            .then(response => response.json())
            .then(data => setBookings(data.bookings || []))
            .catch(error => console.error('Error fetching bookings:', error));
    }, []);

    if (!Array.isArray(bookings)) {
        return <div>Loading bookings...</div>;
    }

    return (
        <div>
            <h1>Manage Bookings</h1>
            {bookings.length === 0 ? (
                <p>No bookings available.</p>
            ) : (
                bookings.map(booking => (
                    <div key={booking.id}>
                        <h3>{booking.name}</h3>
                        <p>{booking.details}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ManageBookings;
