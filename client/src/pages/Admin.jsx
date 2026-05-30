import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, change, icon, color }) => (
  <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-900">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
        <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">{value}</p>
        {change && (
          <p className={`mt-2 text-xs font-semibold ${change > 0? 'text-green-500' : 'text-red-500'}`}>
            {change > 0? '↑' : '↓'} {Math.abs(change)}% vs last week
          </p>
        )}
      </div>
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const config = {
    pending: { color: 'bg-yellow-500', label: 'Pending' },
    paid: { color: 'bg-blue-500', label: 'Paid' },
    preparing: { color: 'bg-orange-500', label: 'Preparing' },
    ready: { color: 'bg-purple-500', label: 'Ready' },
    delivered: { color: 'bg-green-500', label: 'Delivered' },
    cancelled: { color: 'bg-red-500', label: 'Cancelled' },
    confirmed: { color: 'bg-green-500', label: 'Confirmed' },
    completed: { color: 'bg-blue-500', label: 'Completed' },
    'no-show': { color: 'bg-zinc-500', label: 'No Show' }
  };
  const c = config[status] || config.pending;
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold text-white ${c.color}`}>{c.label}</span>;
};

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Mock data - replace with axios calls
  useEffect(() => {
    // Simulate API calls
    setOrders([
      { _id: '1', itemName: 'Kelewele Bruschetta', customerName: 'Freddy Thompson', status: 'paid', total: 95, createdAt: '2026-05-30T09:55:35.695Z' },
      { _id: '2', itemName: 'Jollof Risotto', customerName: 'Ama Boateng', status: 'preparing', total: 180, createdAt: '2026-05-30T10:15:00.000Z' },
      { _id: '3', itemName: 'Waakye Bowl', customerName: 'Kwame Nkrumah', status: 'delivered', total: 65, createdAt: '2026-05-29T18:00:00.000Z' },
      { _id: '4', itemName: 'Banku & Tilapia', customerName: 'Akosua Mensah', status: 'cancelled', total: 120, createdAt: '2026-05-29T14:30:00.000Z' },
    ]);

    setReservations([
      { _id: 'r1', customerName: 'Kojo Asante', date: '2026-05-31', time: '19:00', guests: 4, status: 'confirmed' },
      { _id: 'r2', customerName: 'Efua Owusu', date: '2026-05-31', time: '20:30', guests: 2, status: 'pending' },
      { _id: 'r3', customerName: 'Yaw Mensah', date: '2026-05-30', time: '18:00', guests: 6, status: 'completed' },
    ]);

    setCustomers([
      { _id: 'c1', name: 'Freddy Thompson', email: 'poptonydm@gmail.com', orders: 3, totalSpent: 285, lastOrder: '2026-05-30' },
      { _id: 'c2', name: 'Ama Boateng', email: 'ama@gmail.com', orders: 1, totalSpent: 180, lastOrder: '2026-05-30' },
      { _id: 'c3', name: 'Kojo Asante', email: 'kojo@gmail.com', orders: 0, totalSpent: 0, lastOrder: null },
    ]);
  }, []);

  // Analytics
  const totalRevenue = orders.filter(o => o.status!== 'cancelled').reduce((sum, o) => sum + o.total, 0);
  const todayRevenue = orders
   .filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString())
   .reduce((sum, o) => sum + o.total, 0);

  const ordersByStatus = {
    active: orders.filter(o => ['paid', 'preparing', 'ready'].includes(o.status)).length,
    completed: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  const revenueData = [
    { day: 'Mon', revenue: 420 },
    { day: 'Tue', revenue: 680 },
    { day: 'Wed', revenue: 520 },
    { day: 'Thu', revenue: 890 },
    { day: 'Fri', revenue: 1200 },
    { day: 'Sat', revenue: 1600 },
    { day: 'Sun', revenue: 1400 }
  ];

  const orderStatusData = [
    { name: 'Active', value: ordersByStatus.active, color: '#f59e0b' },
    { name: 'Completed', value: ordersByStatus.completed, color: '#10b981' },
    { name: 'Cancelled', value: ordersByStatus.cancelled, color: '#ef4444' }
  ];

  const updateOrderStatus = async (orderId, newStatus) => {
    // await axios.patch(`${backendUrl}/order/${orderId}`, { status: newStatus });
    setOrders(prev => prev.map(o => o._id === orderId? {...o, status: newStatus } : o));
  };

  const updateReservationStatus = async (resId, newStatus) => {
    // await axios.patch(`${backendUrl}/reservation/${resId}`, { status: newStatus });
    setReservations(prev => prev.map(r => r._id === resId? {...r, status: newStatus } : r));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'reservations', label: 'Reservations', icon: '📅' },
    { id: 'customers', label: 'Customers', icon: '👥' }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Savi Foods Admin</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Manage orders, reservations & track revenue</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto border-b border-zinc-200 dark:border-zinc-800">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 font-semibold transition ${
                activeTab === tab.id
                ? 'border-amber-500 text-amber-500'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Total Revenue" value={`₵${totalRevenue}`} change={12.5} icon="💰" color="bg-green-100 dark:bg-green-900/30" />
              <StatCard title="Today's Revenue" value={`₵${todayRevenue}`} change={8.2} icon="📈" color="bg-blue-100 dark:bg-blue-900/30" />
              <StatCard title="Active Orders" value={ordersByStatus.active} icon="📦" color="bg-orange-100 dark:bg-orange-900/30" />
              <StatCard title="Total Customers" value={customers.length} change={5.1} icon="👥" color="bg-purple-100 dark:bg-purple-900/30" />
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                <h3 className="mb-4 text-lg font-bold">Revenue This Week</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none' }} />
                    <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                <h3 className="mb-4 text-lg font-bold">Orders by Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={orderStatusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">All Orders</h2>
              <div className="flex gap-2">
                <span className="rounded-lg bg-yellow-500/20 px-3 py-1 text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                  {ordersByStatus.active} Active
                </span>
                <span className="rounded-lg bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-600 dark:text-green-400">
                  {ordersByStatus.completed} Done
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-zinc-900">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-50 dark:bg-zinc-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Item</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Total</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {orders.map(order => (
                      <tr key={order._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                        <td className="px-6 py-4 font-mono text-sm">#{order._id.slice(-6).toUpperCase()}</td>
                        <td className="px-6 py-4 font-semibold">{order.customerName}</td>
                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{order.itemName}</td>
                        <td className="px-6 py-4 font-bold text-amber-500">₵{order.total}</td>
                        <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                        <td className="px-6 py-4 text-sm text-zinc-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="rounded-lg border border-zinc-300 bg-white px-3 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                          >
                            <option value="paid">Paid</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Reservations</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reservations.map(res => (
                <div key={res._id} className="rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold">{res.customerName}</h3>
                    <StatusBadge status={res.status} />
                  </div>
                  <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <p>📅 {new Date(res.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                    <p>🕐 {res.time}</p>
                    <p>👥 {res.guests} guests</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => updateReservationStatus(res._id, 'confirmed')}
                      className="flex-1 rounded-lg bg-green-500 py-2 text-xs font-bold text-white hover:bg-green-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateReservationStatus(res._id, 'cancelled')}
                      className="flex-1 rounded-lg bg-red-500 py-2 text-xs font-bold text-white hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Customers</h2>
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-zinc-900">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-50 dark:bg-zinc-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Orders</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Total Spent</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Last Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {customers.map(customer => (
                      <tr key={customer._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                        <td className="px-6 py-4 font-semibold">{customer.name}</td>
                        <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{customer.email}</td>
                        <td className="px-6 py-4">{customer.orders}</td>
                        <td className="px-6 py-4 font-bold text-amber-500">₵{customer.totalSpent}</td>
                        <td className="px-6 py-4 text-sm text-zinc-500">
                          {customer.lastOrder? new Date(customer.lastOrder).toLocaleDateString() : 'Never'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};