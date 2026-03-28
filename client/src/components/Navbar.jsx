// import { Link, useLocation } from 'react-router-dom';

// export default function Navbar() {
//   const location = useLocation();

//   const links = [
//     { to: '/admin', label: 'Event Types' },
//     { to: '/admin/meetings', label: 'Meetings' },
//     { to: '/admin/availability', label: 'Availability' },
//   ];

//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
//         <Link to="/admin" className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
//             <span className="text-white font-bold text-sm">S</span>
//           </div>
//           <span className="font-bold text-gray-900 text-lg">Scheduly</span>
//         </Link>

//         <nav className="flex items-center gap-1">
//           {links.map(link => {
//             const active = location.pathname === link.to;
//             return (
//               <Link
//                 key={link.to}
//                 to={link.to}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                   active
//                     ? 'bg-blue-50 text-primary'
//                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             );
//           })}
//         </nav>

//         <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
//           A
//         </div>
//       </div>
//     </header>
//   );
// }

import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/admin', label: 'Event Types' },
    { to: '/admin/meetings', label: 'Meetings' },
    { to: '/admin/availability', label: 'Availability' },
  ];

  return (
    <header style={{ colorScheme: 'light' }} className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0069ff] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">Scheduly</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          {links.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-50 text-[#0069ff]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile nav */}
        <div className="flex sm:hidden items-center gap-1">
          {links.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  active
                    ? 'bg-blue-50 text-[#0069ff]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 flex-shrink-0">
          A
        </div>
      </div>
    </header>
  );
}