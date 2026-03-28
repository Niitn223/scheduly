// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import api from '../../api';

// export default function Confirmation() {
//   const { id } = useParams();
//   const [booking, setBooking] = useState(null);

//   useEffect(() => {
//     api.getConfirmation(id).then(setBooking);
//   }, [id]);

//   if (!booking) return (
//     <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>
//   );

//   const formatDate = (d) => new Date(d).toLocaleDateString('en-US', {
//     weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
//   });

//   const formatTime = (t) => {
//     const [h, m] = t.split(':').map(Number);
//     const ampm = h >= 12 ? 'PM' : 'AM';
//     return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md w-full text-center">
//         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
//           <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//           </svg>
//         </div>

//         <h1 className="text-2xl font-bold text-gray-900 mb-1">You're Scheduled!</h1>
//         <p className="text-gray-500 text-sm mb-6">A confirmation has been sent to {booking.guest_email}</p>

//         <div className="bg-gray-50 rounded-xl p-5 text-left mb-6 border border-gray-100">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-3 h-3 rounded-full" style={{ backgroundColor: booking.color }} />
//             <span className="font-semibold text-gray-900 text-sm">{booking.event_name}</span>
//           </div>
//           <p className="text-sm text-gray-600 mb-1">📅 {formatDate(booking.booking_date)}</p>
//           <p className="text-sm text-gray-600 mb-1">🕐 {formatTime(booking.start_time)} – {formatTime(booking.end_time)}</p>
//           <p className="text-sm text-gray-600">👤 {booking.host_name}</p>
//         </div>

//         <Link
//           to={`/book/${booking.slug}`}
//           className="text-sm text-primary font-medium hover:underline"
//         >
//           ← Book another time
//         </Link>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';

export default function Confirmation() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    api.getConfirmation(id).then(setBooking);
  }, [id]);

  if (!booking) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400" style={{ colorScheme: 'light' }}>
      Loading...
    </div>
  );

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  const formatTime = (t) => {
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10" style={{ colorScheme: 'light' }}>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-md overflow-hidden">

        {/* Green top bar */}
        <div className="h-1.5 bg-green-500 w-full" />

        <div className="p-8 sm:p-10 text-center">
          {/* Checkmark */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="text-sm font-medium text-green-600 mb-1">Confirmed</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">You're Scheduled!</h1>
          <p className="text-gray-500 text-sm mb-8">
            A confirmation has been sent to <span className="font-medium text-gray-700">{booking.guest_email}</span>
          </p>

          {/* Booking details */}
          <div className="bg-gray-50 rounded-xl p-5 text-left border border-gray-100 mb-6">
            {/* Event name with color dot */}
            <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-gray-100">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: booking.color }} />
              <span className="font-semibold text-gray-900 text-sm">{booking.event_name}</span>
              <span className="ml-auto text-xs text-gray-400 bg-white border border-gray-200 rounded-full px-2.5 py-0.5">
                {booking.duration} min
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#0069ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm font-medium text-gray-800">{formatDate(booking.booking_date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#0069ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="text-sm font-medium text-gray-800">
                    {formatTime(booking.start_time)} – {formatTime(booking.end_time)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#0069ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Host</p>
                  <p className="text-sm font-medium text-gray-800">{booking.host_name}</p>
                </div>
              </div>
            </div>
          </div>

          <Link
            to={`/book/${booking.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-[#0069ff] font-medium hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Book another time
          </Link>
        </div>
      </div>
    </div>
  );
}