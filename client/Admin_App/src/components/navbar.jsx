import React, { useState } from 'react'
import { 
  ChartBarIcon, 
  MapPinIcon, 
  CubeIcon, 
  CalendarIcon, 
  BuildingOfficeIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { name: 'Dashboard', icon: ChartBarIcon, href: '/' },
    { name: 'Camp Locations', icon: MapPinIcon, href: '/camplocation' },
    { name: 'Gears', icon: CubeIcon, href: '/gears' },
    { name: 'Bookings', icon: CalendarIcon, href: '/bookings' },
    { name: 'Branch', icon: BuildingOfficeIcon, href: '/branch' }
  ]

  return (
    <div className={`
      bg-gradient-to-b from-blue-600 to-blue-800 
      text-white shadow-xl transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-64'} 
      min-h-screen flex flex-col
      lg:relative fixed z-50
    `}>
      {/* Header */}
      <div className="p-4 border-b border-blue-500/30">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              CampMate
            </h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-blue-500/30 transition-colors duration-200"
          >
            {isCollapsed ? (
              <Bars3Icon className="w-5 h-5" />
            ) : (
              //add left arrow icon
              <ArrowLeftIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <li key={index}>
                <a
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg 
                  hover:bg-blue-500/30 hover:shadow-lg
                  transition-all duration-200 group cursor-pointer
                  active:scale-95 ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <IconComponent className="w-6 h-6 text-blue-200 group-hover:text-white transition-colors flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Admin Section */}
      <div className="p-4 border-t border-blue-500/30">
        <div className={`flex items-center p-3 rounded-lg bg-blue-500/20 ${isCollapsed ? 'justify-center' : ''}`}>
        <a href='/admin' className="flex items-center">
          <UserCircleIcon className="w-6 h-6 text-blue-200 flex-shrink-0" />
        </a>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-blue-200">admin@campmate.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t border-blue-500/30">
        <button 
          className={`w-full flex items-center p-3 rounded-lg 
          hover:bg-red-500/30 hover:shadow-lg
          transition-all duration-200 group cursor-pointer
          active:scale-95 ${isCollapsed ? 'justify-center' : ''}`}
          onClick={() => {
            // Add logout logic here
            console.log('Logout clicked')
          }}
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-300 group-hover:text-red-200 transition-colors flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 font-medium text-red-300 group-hover:text-red-200 transition-colors">
              Logout
            </span>
          )}
        </button>

        {!isCollapsed && (
          <div className="text-center mt-4">
            <p className="text-blue-200 text-sm">CampMate Admin</p>
            <p className="text-blue-300 text-xs">v1.0.0</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar