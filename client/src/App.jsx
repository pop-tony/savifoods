// src/App.jsx
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import Footer from './components/Footer'
import NavBar from './components/Navbar'
import DishesPage from './pages/DishesPage'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import { Orders } from './pages/Orders'
import { OrderProvider } from './context/OrderContext'
import { Admin } from './pages/Admin'
import OrderDetails from './pages/OrderDetails'

function AppContent() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dishes' element={<DishesPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/order/:id' element={<OrderDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <OrderProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </OrderProvider>
    </ThemeProvider>
  )
}

export default App