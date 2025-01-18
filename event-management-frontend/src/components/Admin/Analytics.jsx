import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', attendees: 400, events: 24 },
    { name: 'Feb', attendees: 300, events: 18 },
    { name: 'Mar', attendees: 500, events: 30 },
    { name: 'Apr', attendees: 200, events: 20 },
    { name: 'May', attendees: 278, events: 27 },
    { name: 'Jun', attendees: 189, events: 23 },
    { name: 'Jul', attendees: 239, events: 25 },
    { name: 'Aug', attendees: 349, events: 28 },
    { name: 'Sep', attendees: 400, events: 30 },
    { name: 'Oct', attendees: 300, events: 22 },
    { name: 'Nov', attendees: 500, events: 35 },
    { name: 'Dec', attendees: 600, events: 40 },
];

const Analytics = () => {
    return (
        <div className="w-full h-96 p-4">
            <h2 className="text-2xl font-bold mb-4">Event Analytics</h2>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="attendees" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="events" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Analytics;