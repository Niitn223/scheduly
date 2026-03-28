// import { useState, useEffect } from 'react';
// import Navbar from '../../components/Navbar';
// import api from '../../api';

// const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// const defaultAvailability = DAYS.map((_, i) => ({
//   day_of_week: i,
//   start_time: '09:00',
//   end_time: '17:00',
//   is_active: i >= 1 && i <= 5,
// }));

// export default function Availability() {
//   const [availability, setAvailability] = useState(defaultAvailability);
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     api.getAvailability().then(data => {
//       if (data.length > 0) {
//         const merged = defaultAvailability.map(def => {
//           const found = data.find(d => d.day_of_week === def.day_of_week);
//           return found ? {
//             ...def,
//             start_time: found.start_time.slice(0, 5),
//             end_time: found.end_time.slice(0, 5),
//             is_active: !!found.is_active,
//           } : def;
//         });
//         setAvailability(merged);
//       }
//     });
//   }, []);

//   const update = (index, field, value) => {
//     setAvailability(prev => prev.map((d, i) => i === index ? { ...d, [field]: value } : d));
//   };

//   const save = async () => {
//     setSaving(true);
//     await api.saveAvailability({ availability });
//     setSaving(false);
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="max-w-2xl mx-auto px-6 py-10">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">Availability</h1>
//           <p className="text-gray-500 text-sm mt-1">Set the times you're available for bookings.</p>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
//           {availability.map((day, i) => (
//             <div key={day.day_of_week} className="flex items-center gap-4 px-6 py-4">
//               <button
//                 onClick={() => update(i, 'is_active', !day.is_active)}
//                 className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${day.is_active ? 'bg-primary' : 'bg-gray-200'}`}
//               >
//                 <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${day.is_active ? 'translate-x-5' : 'translate-x-1'}`} />
//               </button>

//               <span className={`w-24 text-sm font-medium ${day.is_active ? 'text-gray-900' : 'text-gray-400'}`}>
//                 {DAYS[day.day_of_week]}
//               </span>

//               {day.is_active ? (
//                 <div className="flex items-center gap-2 flex-1">
//                   <input
//                     type="time" value={day.start_time}
//                     onChange={e => update(i, 'start_time', e.target.value)}
//                     className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                   <span className="text-gray-400 text-sm">–</span>
//                   <input
//                     type="time" value={day.end_time}
//                     onChange={e => update(i, 'end_time', e.target.value)}
//                     className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//               ) : (
//                 <span className="text-sm text-gray-400 flex-1">Unavailable</span>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={save} disabled={saving}
//             className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors"
//           >
//             {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }






import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const defaultAvailability = DAYS.map((_, i) => ({
  day_of_week: i,
  start_time: '09:00',
  end_time: '17:00',
  is_active: i >= 1 && i <= 5,
}));

export default function Availability() {
  const [availability, setAvailability] = useState(defaultAvailability);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getAvailability().then(data => {
      if (data.length > 0) {
        const merged = defaultAvailability.map(def => {
          const found = data.find(d => d.day_of_week === def.day_of_week);
          return found ? {
            ...def,
            start_time: found.start_time.slice(0, 5),
            end_time: found.end_time.slice(0, 5),
            is_active: !!found.is_active,
          } : def;
        });
        setAvailability(merged);
      }
    });
  }, []);

  const update = (index, field, value) => {
    setAvailability(prev => prev.map((d, i) => i === index ? { ...d, [field]: value } : d));
  };

  const save = async () => {
    setSaving(true);
    await api.saveAvailability({ availability });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ colorScheme: 'light' }}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Availability</h1>
          <p className="text-gray-500 text-sm mt-1">
            Set the days and times you're available for bookings.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-medium text-gray-700">Weekly Hours</p>
          </div>

          <div className="divide-y divide-gray-100">
            {availability.map((day, i) => (
              <div key={day.day_of_week} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4">
                {/* Toggle */}
                <button
                  onClick={() => update(i, 'is_active', !day.is_active)}
                  className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0069ff] ${
                    day.is_active ? 'bg-[#0069ff]' : 'bg-gray-200'
                  }`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    day.is_active ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>

                {/* Day name */}
                <span className={`w-20 sm:w-24 text-sm font-medium flex-shrink-0 ${
                  day.is_active ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {DAYS[day.day_of_week]}
                </span>

                {/* Time inputs or unavailable */}
                {day.is_active ? (
                  <div className="flex items-center gap-2 flex-1 flex-wrap">
                    <input
                      type="time"
                      value={day.start_time}
                      onChange={e => update(i, 'start_time', e.target.value)}
                      className="border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0069ff] focus:border-transparent"
                    />
                    <span className="text-gray-400 text-sm">–</span>
                    <input
                      type="time"
                      value={day.end_time}
                      onChange={e => update(i, 'end_time', e.target.value)}
                      className="border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0069ff] focus:border-transparent"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-gray-400 flex-1">Unavailable</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={save}
            disabled={saving}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-[#0069ff] text-white hover:bg-blue-700'
            } disabled:opacity-60`}
          >
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </main>
    </div>
  );
}