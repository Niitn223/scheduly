export default function MeetingRow({ booking, onCancel, isPast }) {
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });

  const formatTime = (t) => {
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  const isCancelled = booking.status === 'cancelled';

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-4
      ${isCancelled ? 'opacity-60' : ''}`}>
      <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: booking.color }} />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm">{booking.event_name}</p>
        <p className="text-sm text-gray-500">{booking.guest_name} · {booking.guest_email}</p>
        <p className="text-sm text-gray-500">
          {formatDate(booking.booking_date)} at {formatTime(booking.start_time)}
        </p>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {isCancelled && (
          <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full">Cancelled</span>
        )}
        {!isPast && !isCancelled && (
          <button
            onClick={() => onCancel(booking.id)}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}