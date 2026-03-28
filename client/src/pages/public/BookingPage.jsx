// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Calendar from '../../components/Calendar';
// import TimeSlotPicker from '../../components/TimeSlotPicker';
// import BookingForm from '../../components/BookingForm';
// import api from '../../api';

// export default function BookingPage() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const [eventType, setEventType] = useState(null);
//   const [availability, setAvailability] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [slots, setSlots] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [step, setStep] = useState('slots');
//   const [loading, setLoading] = useState(false);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     api.getEventBySlug(slug)
//       .then(setEventType)
//       .catch(() => setNotFound(true));
//     api.getAvailability().then(setAvailability);
//   }, [slug]);

//   useEffect(() => {
//     if (selectedDate) {
//       setSlots(null);
//       setSelectedSlot(null);
//       setStep('slots');
//       api.getSlots(slug, selectedDate).then(setSlots);
//     }
//   }, [selectedDate]);

//   const handleSlotSelect = (slot) => {
//     setSelectedSlot(slot);
//     setStep('form');
//   };

//   const handleBook = async (form) => {
//     setLoading(true);
//     try {
//       const booking = await api.createBooking({
//         event_type_id: eventType.id,
//         guest_name: form.name,
//         guest_email: form.email,
//         booking_date: selectedDate,
//         start_time: selectedSlot,
//         notes: form.notes,
//       });
//       navigate(`/book/confirmed/${booking.id}`);
//     } catch (err) {
//       alert(err.response?.data?.error || 'Booking failed. Please try again.');
//       setStep('slots');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (notFound) return (
//     <div className="min-h-screen flex items-center justify-center text-gray-500">
//       Event not found.
//     </div>
//   );

//   if (!eventType) return (
//     <div className="min-h-screen flex items-center justify-center text-gray-400">
//       Loading...
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-4xl flex overflow-hidden relative">

//         {/* Back button */}
//             <div className="absolute top-4 left-4">
//             <button
//                 onClick={() => window.history.back()}
//                 className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
//             >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//                 Back
//             </button>
//             </div>

//         {/* LEFT — Event Info */}
//         <div className="w-64 flex-shrink-0 border-r border-gray-100 p-8">
//           <div className="w-10 h-10 rounded-full mb-4 flex items-center justify-center text-white font-bold text-sm"
//                style={{ backgroundColor: eventType.color }}>
//             {eventType.host_name?.charAt(0)}
//           </div>
//           <p className="text-sm text-gray-500 mb-1">{eventType.host_name}</p>
//           <h1 className="text-lg font-bold text-gray-900 mb-3">{eventType.name}</h1>

//           <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             {eventType.duration} min
//           </div>

//           {selectedDate && selectedSlot && (
//             <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//             </div>
//           )}

//           {eventType.description && (
//             <p className="text-sm text-gray-500 mt-4">{eventType.description}</p>
//           )}
//         </div>

//         {/* MIDDLE — Calendar */}
//         <div className="flex-1 p-8 border-r border-gray-100">
//           <h2 className="text-base font-semibold text-gray-900 mb-5">Select a Date</h2>
//           <Calendar
//             selectedDate={selectedDate}
//             onDateSelect={setSelectedDate}
//             availability={availability}
//           />
//         </div>

//         {/* RIGHT — Slots or Form */}
//         <div className="w-64 flex-shrink-0 p-8">
//           {!selectedDate ? (
//             <p className="text-sm text-gray-400 mt-8">Select a date to see available times.</p>
//           ) : step === 'slots' ? (
//             <>
//               <h2 className="text-base font-semibold text-gray-900 mb-4">
//                 {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//               </h2>
//               {slots === null
//                 ? <p className="text-sm text-gray-400">Loading slots...</p>
//                 : <TimeSlotPicker slots={slots} selectedSlot={selectedSlot} onSlotSelect={handleSlotSelect} />
//               }
//             </>
//           ) : (
//             <BookingForm
//               slot={selectedSlot}
//               date={selectedDate}
//               onSubmit={handleBook}
//               onBack={() => setStep('slots')}
//               isLoading={loading}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from '../../components/Calendar';
import TimeSlotPicker from '../../components/TimeSlotPicker';
import BookingForm from '../../components/BookingForm';
import api from '../../api';

export default function BookingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [eventType, setEventType] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState('calendar');
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.getEventBySlug(slug)
      .then(setEventType)
      .catch(() => setNotFound(true));
    api.getAvailability().then(setAvailability);
  }, [slug]);

  useEffect(() => {
    if (selectedDate) {
      setSlots(null);
      setSelectedSlot(null);
      setStep('slots');
      api.getSlots(slug, selectedDate).then(setSlots);
    }
  }, [selectedDate]);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStep('form');
  };

  const handleBook = async (form) => {
    setLoading(true);
    try {
      const booking = await api.createBooking({
        event_type_id: eventType.id,
        guest_name: form.name,
        guest_email: form.email,
        booking_date: selectedDate,
        start_time: selectedSlot,
        notes: form.notes,
      });
      navigate(`/book/confirmed/${booking.id}`);
    } catch (err) {
      alert(err.response?.data?.error || 'Booking failed. Please try again.');
      setStep('slots');
    } finally {
      setLoading(false);
    }
  };

  if (notFound) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500" style={{ colorScheme: 'light' }}>
      Event not found.
    </div>
  );

  if (!eventType) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400" style={{ colorScheme: 'light' }}>
      Loading...
    </div>
  );

  const formatSelectedDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4" style={{ colorScheme: 'light' }}>
      {/* Back button */}
      <div className="max-w-5xl mx-auto mb-4">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Main card */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Mobile: stack vertically. Desktop: 3 columns */}
        <div className="flex flex-col lg:flex-row">

          {/* LEFT PANEL — Event Info */}
          <div className="lg:w-64 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100 p-6 lg:p-8">
            <div
              className="w-10 h-10 rounded-full mb-4 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: eventType.color }}
            >
              {eventType.host_name?.charAt(0)}
            </div>
            <p className="text-sm text-gray-500 mb-0.5">{eventType.host_name}</p>
            <h1 className="text-lg font-bold text-gray-900 mb-3">{eventType.name}</h1>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {eventType.duration} min
            </div>

            {selectedDate && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatSelectedDate(selectedDate)}
              </div>
            )}

            {eventType.description && (
              <p className="text-sm text-gray-500 mt-4 leading-relaxed">{eventType.description}</p>
            )}
          </div>

          {/* MIDDLE PANEL — Calendar */}
          <div className={`flex-1 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 ${step === 'form' ? 'hidden lg:block' : ''}`}>
            <h2 className="text-base font-semibold text-gray-900 mb-5">Select a Date</h2>
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              availability={availability}
            />
          </div>

          {/* RIGHT PANEL — Slots or Form */}
          <div className="lg:w-64 flex-shrink-0 p-6 lg:p-8">
            {!selectedDate ? (
              <div className="flex flex-col items-center justify-center h-full py-10 lg:py-0 lg:mt-12">
                <svg className="w-10 h-10 text-gray-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-400 text-center">Select a date to see available times.</p>
              </div>
            ) : step === 'slots' ? (
              <>
                <h2 className="text-base font-semibold text-gray-900 mb-1">
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' })}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                {slots === null
                  ? (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Loading slots...
                    </div>
                  )
                  : <TimeSlotPicker slots={slots} selectedSlot={selectedSlot} onSlotSelect={handleSlotSelect} />
                }
              </>
            ) : (
              <BookingForm
                slot={selectedSlot}
                date={selectedDate}
                onSubmit={handleBook}
                onBack={() => setStep('slots')}
                isLoading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}