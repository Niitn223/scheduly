import { useState } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

export default function Calendar({ selectedDate, onDateSelect, availability }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const activeDays = new Set(
    (availability || []).filter(a => a.is_active).map(a => a.day_of_week)
  );

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const canGoPrev = viewDate > new Date(today.getFullYear(), today.getMonth(), 1);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-semibold text-gray-900">{MONTHS[month]} {year}</span>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const date = new Date(year, month, day);
          date.setHours(0, 0, 0, 0);
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isPast = date < today;
          const isAvailable = activeDays.has(date.getDay());
          const isSelected = selectedDate === dateStr;
          const isToday = date.getTime() === today.getTime();
          const isDisabled = isPast || !isAvailable;

          return (
            <div key={day} className="flex justify-center">
              <button
                onClick={() => !isDisabled && onDateSelect(dateStr)}
                disabled={isDisabled}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors
                  ${isSelected ? 'bg-primary text-white' : ''}
                  ${!isSelected && isToday ? 'border-2 border-primary text-primary' : ''}
                  ${!isSelected && !isToday && !isDisabled ? 'hover:bg-blue-50 text-gray-900' : ''}
                  ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}