// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Navbar from '../../components/Navbar';
// import api from '../../api';

// const COLORS = ['#0069ff', '#7c3aed', '#059669', '#dc2626', '#d97706', '#0891b2'];
// const DURATIONS = [15, 30, 45, 60, 90];

// export default function EventTypeForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEdit = !!id;

//   const [form, setForm] = useState({
//     name: '', slug: '', duration: 30, description: '', color: '#0069ff'
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (isEdit) {
//       api.getEventTypes().then(types => {
//         const found = types.find(t => t.id === parseInt(id));
//         if (found) setForm({
//           name: found.name,
//           slug: found.slug,
//           duration: found.duration,
//           description: found.description || '',
//           color: found.color,
//         });
//       });
//     }
//   }, [id]);

//   const handle = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: value,
//       ...(name === 'name' && !isEdit
//         ? { slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }
//         : {})
//     }));
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       if (isEdit) {
//         await api.updateEventType(id, form);
//       } else {
//         await api.createEventType(form);
//       }
//       navigate('/admin');
//     } catch (err) {
//       setError(err.response?.data?.error || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="max-w-xl mx-auto px-6 py-10">
//         <div className="bg-white rounded-xl border border-gray-200 p-8">
//           <h1 className="text-xl font-bold text-gray-900 mb-6">
//             {isEdit ? 'Edit Event Type' : 'New Event Type'}
//           </h1>

//           {error && (
//             <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>
//           )}

//           <form onSubmit={submit} className="flex flex-col gap-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
//               <input
//                 name="name" value={form.name} onChange={handle} required
//                 placeholder="e.g. 30-min Coffee Chat"
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
//               <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
//                 <span className="bg-gray-50 px-3 py-2.5 text-sm text-gray-400 border-r border-gray-300">
//                   scheduly.app/book/
//                 </span>
//                 <input
//                   name="slug" value={form.slug} onChange={handle} required
//                   placeholder="coffee-chat"
//                   className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
//               <div className="flex gap-2 flex-wrap">
//                 {DURATIONS.map(d => (
//                   <button
//                     key={d} type="button"
//                     onClick={() => setForm(prev => ({ ...prev, duration: d }))}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors
//                       ${form.duration === d
//                         ? 'bg-primary text-white border-primary'
//                         : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
//                       }`}
//                   >
//                     {d} min
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 name="description" value={form.description} onChange={handle}
//                 rows={3} placeholder="What is this event about?"
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
//               <div className="flex gap-2">
//                 {COLORS.map(c => (
//                   <button
//                     key={c} type="button"
//                     onClick={() => setForm(prev => ({ ...prev, color: c }))}
//                     style={{ backgroundColor: c }}
//                     className={`w-8 h-8 rounded-full transition-transform ${form.color === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105'}`}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="flex gap-3 pt-2">
//               <button
//                 type="button" onClick={() => navigate('/admin')}
//                 className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit" disabled={loading}
//                 className="flex-1 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
//               >
//                 {loading ? 'Saving...' : (isEdit ? 'Save Changes' : 'Create Event Type')}
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }







import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../api';

const COLORS = ['#0069ff', '#7c3aed', '#059669', '#dc2626', '#d97706', '#0891b2'];
const DURATIONS = [15, 30, 45, 60, 90];

export default function EventTypeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '', slug: '', duration: 30, description: '', color: '#0069ff'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.getEventTypes().then(types => {
        const found = types.find(t => t.id === parseInt(id));
        if (found) setForm({
          name: found.name,
          slug: found.slug,
          duration: found.duration,
          description: found.description || '',
          color: found.color,
        });
      });
    }
  }, [id]);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && !isEdit
        ? { slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }
        : {})
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEdit) {
        await api.updateEventType(id, form);
      } else {
        await api.createEventType(form);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ colorScheme: 'light' }}>
      <Navbar />
      <main className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
            <h1 className="text-lg font-bold text-gray-900">
              {isEdit ? 'Edit Event Type' : 'New Event Type'}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEdit ? 'Update your event type details.' : 'Create a new event type for people to book.'}
            </p>
          </div>

          <div className="px-6 sm:px-8 py-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-5 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={submit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Event Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handle}
                  required
                  placeholder="e.g. 30-min Coffee Chat"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0069ff] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  URL Slug <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#0069ff] focus-within:border-transparent">
                  <span className="bg-gray-50 px-3 py-2.5 text-sm text-gray-400 border-r border-gray-300 whitespace-nowrap">
                    /book/
                  </span>
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handle}
                    required
                    placeholder="coffee-chat"
                    className="flex-1 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Only lowercase letters, numbers, and hyphens.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {DURATIONS.map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, duration: d }))}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        form.duration === d
                          ? 'bg-[#0069ff] text-white border-[#0069ff]'
                          : 'border-gray-200 text-gray-600 hover:border-[#0069ff] hover:text-[#0069ff] bg-white'
                      }`}
                    >
                      {d} min
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handle}
                  rows={3}
                  placeholder="What is this event about?"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0069ff] focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex gap-2.5">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, color: c }))}
                      style={{ backgroundColor: c }}
                      className={`w-8 h-8 rounded-full transition-all ${
                        form.color === c
                          ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                          : 'hover:scale-110'
                      }`}
                    />
                  ))}
                </div>

                {/* Preview */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-3">
                  <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: form.color }} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{form.name || 'Event name'}</p>
                    <p className="text-xs text-gray-400">{form.duration} min</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-[#0069ff] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors"
                >
                  {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Event Type'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}