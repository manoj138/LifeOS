import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, ShoppingCart, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Customers', path: '/customers', icon: <Users size={24} />, color: 'bg-blue-500', count: '1,284' },
    { label: 'Products Gallery', path: '/products', icon: <Package size={24} />, color: 'bg-emerald-500', count: '452' },
    { label: 'Sales Overview', path: '/salemasters', icon: <ShoppingCart size={24} />, color: 'bg-orange-500', count: '₹84,200' },
  ];

  return (
    <div className="p-6 space-y-8 min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Overview <span className="text-blue-600 dark:text-blue-400">Analytics</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Welcome back to your admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className="group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 
                       bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 
                       shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl ${item.color} text-white shadow-lg`}>
                {item.icon}
              </div>
              <ArrowUpRight className="text-gray-300 dark:text-gray-500 group-hover:text-blue-500" size={20} />
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{item.count}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;