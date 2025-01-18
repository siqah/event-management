import { Link } from "react-router-dom";
import Analytics from "./Analytics";
import ManageBookings from "./ManageBookings"
import ManageEvents from "./ManageEvents"
function AdminDashboard() {
  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl text-gray-800 border-b-2 border-gray-300 pb-2">Admin Dashboard</h1>
      <div className="flex ">
      <aside className="mt-5 h-full bg-slate-100 p-5 max-h-full ">
        <ul className="list-none p-0">
          <li className="my-2">
            <Link to="/admin/events" className="no-underline text-blue-500 hover:underline">Manage Events</Link>
          </li>
          <li className="my-2">
            <Link to="/admin/bookings" className="no-underline text-blue-500 hover:underline">Manage Bookings</Link>
          </li>
          <li className="my-2">
            <Link to="/admin/analytics" className="no-underline text-blue-500 hover:underline">View Analytics</Link>
          </li>
        </ul>
      </aside>
      <main className="ml-5 mt-5 ">
        <h2 className="text-xl text-gray-800 border-b-2 border-gray-300 pb-2">Welcome to the Admin Dashboard</h2>
        <p className="mt-5">Please select an option from the sidebar to get started.</p>
         <ManageBookings />
         <Analytics />
         <ManageEvents />
      </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
