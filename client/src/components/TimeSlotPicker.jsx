export default function TimeSlotPicker({ slots, selectedSlot, onSlotSelect }) {
  if (!slots) return null;

  if (slots.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-8">
        No available slots for this day.
      </p>
    );
  }

  const formatTime = (t) => {
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-96 pr-1">
      {slots.map(slot => (
        <button
          key={slot}
          onClick={() => onSlotSelect(slot)}
          className={`w-full py-3 rounded-lg border text-sm font-medium transition-all
            ${selectedSlot === slot
              ? 'bg-primary text-white border-primary'
              : 'border-gray-200 text-gray-800 hover:border-primary hover:text-primary bg-white'
            }`}
        >
          {formatTime(slot)}
        </button>
      ))}
    </div>
  );
}