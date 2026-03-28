// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../../components/Navbar';
// import EventTypeCard from '../../components/EventTypeCard';
// import api from '../../api';

// export default function Dashboard() {
//   const [eventTypes, setEventTypes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.getEventTypes()
//       .then(setEventTypes)
//       .finally(() => setLoading(false));
//   }, []);

//   const handleDelete = async (id) => {
//     if (!confirm('Delete this event type?')) return;
//     await api.deleteEventType(id);
//     setEventTypes(prev => prev.filter(e => e.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="max-w-6xl mx-auto px-6 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Event Types</h1>
//             <p className="text-gray-500 text-sm mt-1">Create events that people can book on your calendar.</p>
//           </div>
//           <Link
//             to="/admin/event-types/new"
//             className="bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
//           >
//             + New Event Type
//           </Link>
//         </div>

//         {loading ? (
//           <div className="text-center py-20 text-gray-400">Loading...</div>
//         ) : eventTypes.length === 0 ? (
//           <div className="text-center py-20">
//             <p className="text-gray-400 mb-4">No event types yet.</p>
//             <Link to="/admin/event-types/new" className="text-primary font-medium hover:underline">
//               Create your first event type →
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {eventTypes.map(et => (
//               <EventTypeCard key={et.id} eventType={et} onDelete={handleDelete} />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import EventTypeCard from '../../components/EventTypeCard';
import api from '../../api';

export default function Dashboard() {
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEventTypes()
      .then(setEventTypes)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this event type?')) return;
    await api.deleteEventType(id);
    setEventTypes(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ colorScheme: 'light' }}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Event Types</h1>
            <p className="text-gray-500 text-sm mt-1">
              Create events that people can book on your calendar.
            </p>
          </div>
          <Link
            to="/admin/event-types/new"
            className="inline-flex items-center justify-center bg-[#0069ff] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            + New Event Type
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : eventTypes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#0069ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium mb-1">No event types yet</p>
            <p className="text-gray-400 text-sm mb-4">Create your first event type to start accepting bookings.</p>
            <Link
              to="/admin/event-types/new"
              className="inline-flex items-center text-[#0069ff] font-medium text-sm hover:underline"
            >
              Create your first event type →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {eventTypes.map(et => (
              <EventTypeCard key={et.id} eventType={et} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}