import React from 'react'
import { 
  TruckIcon, 
  MapPinIcon, 
  CurrencyDollarIcon, 
  ShoppingCartIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

function Dashboard() {
  // Sample data - replace with actual API calls
  const stats = [
    {
      title: 'Total Camping Gear',
      value: '248',
      subtitle: 'Items available',
      icon: TruckIcon,
      bgColor: 'bg-blue-500',
      bgGradient: 'from-blue-500 to-blue-600',
      change: '+12% from last month'
    },
    {
      title: 'Camping Locations',
      value: '24',
      subtitle: 'Active locations',
      icon: MapPinIcon,
      bgColor: 'bg-green-500',
      bgGradient: 'from-green-500 to-green-600',
      change: '+3 new locations'
    },
    {
      title: 'Active Rentals',
      value: '86',
      subtitle: 'Currently rented',
      icon: ShoppingCartIcon,
      bgColor: 'bg-orange-500',
      bgGradient: 'from-orange-500 to-orange-600',
      change: '78% utilization rate'
    },
    {
      title: 'Monthly Income',
      value: 'LKR 12,450',
      subtitle: 'This month',
      icon: CurrencyDollarIcon,
      bgColor: 'bg-purple-500',
      bgGradient: 'from-purple-500 to-purple-600',
      change: '+18% from last month'
    },
    {
      title: 'Total Customers',
      value: '1,247',
      subtitle: 'Registered users',
      icon: UserGroupIcon,
      bgColor: 'bg-indigo-500',
      bgGradient: 'from-indigo-500 to-indigo-600',
      change: '+45 new this week'
    },
    {
      title: 'Bookings Today',
      value: '23',
      subtitle: 'New bookings',
      icon: CalendarDaysIcon,
      bgColor: 'bg-pink-500',
      bgGradient: 'from-pink-500 to-pink-600',
      change: '15 confirmed, 8 pending'
    },
    
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your camping gear rental business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.bgGradient}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.subtitle}</div>
                </div>
              </div>
              <div className="mb-2">
                <h3 className="text-sm font-medium text-gray-700">{stat.title}</h3>
              </div>
              <div className="text-xs text-gray-500">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <TruckIcon className="w-5 h-5 mr-2" />
              Add Gear
            </button>
            <button className="flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
              <MapPinIcon className="w-5 h-5 mr-2" />
              Add Location
            </button>
            <button className="flex items-center justify-center p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              View Rentals
            </button>
          </div>
        </div>

        
        
      </div>

      {/* Bottom Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        
        
      </div>
    </div>
  )
}

export default Dashboard