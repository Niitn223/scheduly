import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function EventTypeCard({ eventType, onDelete }) {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const bookingUrl = `${window.location.origin}/book/${eventType.slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(bookingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 relative flex flex-col">
      {/* Colored top bar */}
      <div className="h-1.5 rounded-t-xl" style={{ backgroundColor: eventType.color }} />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="font-semibold text-gray-900 text-base truncate">{eventType.name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-500">{eventType.duration} min</p>
            </div>
          </div>

          {/* Three-dot menu */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 4a2 2 0 110-4 2 2 0 010 4zm0 4a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <Link
                    to={`/admin/event-types/${eventType.id}`}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>
                  <button
                    onClick={() => { onDelete(eventType.id); setMenuOpen(false); }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        {eventType.description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{eventType.description}</p>
        )}

        {/* Footer */}
        <div className="border-t border-gray-100 pt-4 mt-auto flex items-center gap-2">
          <button
            onClick={copyLink}
            className="flex-1 text-sm text-[#0069ff] font-medium hover:underline text-left truncate"
          >
            {copied ? '✓ Copied!' : `/${eventType.slug}`}
          </button>
          <a
            href={`/book/${eventType.slug}`}
            className="text-xs border border-gray-200 rounded-md px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:border-gray-300 whitespace-nowrap transition-colors"
          >
            View Page →
          </a>
        </div>
      </div>
    </div>
  );
}