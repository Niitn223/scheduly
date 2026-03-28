// import { useState, useEffect } from 'react';
// import Navbar from '../../components/Navbar';
// import MeetingRow from '../../components/MeetingRow';
// import api from '../../api';

// export default function Meetings() {
//   const [filter, setFilter] = useState('upcoming');
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     api.getBookings(filter)
//       .then(setBookings)
//       .finally(() => setLoading(false));
//   }, [filter]);

//   const handleCancel = async (id) => {
//     if (!confirm('Cancel this meeting?')) return;
//     await api.cancelBooking(id);
//     setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="max-w-3xl mx-auto px-6 py-10">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">Meetings</h1>

//         <div className="flex border-b border-gray-200 mb-6">
//           {['upcoming', 'past'].map(f => (
//             <button
//               key={f} onClick={() => setFilter(f)}
//               className={`px-5 py-2.5 text-sm font-medium capitalize border-b-2 transition-colors -mb-px
//                 ${filter === f ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <div className="text-center py-20 text-gray-400">Loading...</div>
//         ) : bookings.length === 0 ? (
//           <div className="text-center py-20 text-gray-400">No {filter} meetings.</div>
//         ) : (
//           <div className="flex flex-col gap-3">
//             {bookings.map(b => (
//               <MeetingRow key={b.id} booking={b} onCancel={handleCancel} isPast={filter === 'past'} />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import MeetingRow from '../../components/MeetingRow';
import api from '../../api';

export default function Meetings() {
  const [filter, setFilter] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getBookings(filter)
      .then(setBookings)
      .finally(() => setLoading(false));
  }, [filter]);

  const handleCancel = async (id) => {
    if (!confirm('Cancel this meeting?')) return;
    await api.cancelBooking(id);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ colorScheme: 'light' }}>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage your scheduled meetings.</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {['upcoming', 'past'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-3 text-sm font-medium capitalize border-b-2 transition-colors -mb-px ${
                filter === f
                  ? 'border-[#0069ff] text-[#0069ff]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-6 h-6 animate-spin mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Loading...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No {filter} meetings</p>
            <p className="text-gray-400 text-sm mt-1">
              {filter === 'upcoming'
                ? 'Your upcoming meetings will appear here.'
                : 'Your past meetings will appear here.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {bookings.map(b => (
              <MeetingRow
                key={b.id}
                booking={b}
                onCancel={handleCancel}
                isPast={filter === 'past'}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}