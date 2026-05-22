import React from 'react';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import { ProductDetails } from './components/ProductDetails';
import { Blog } from './components/Blog';
import { InfoPage } from './components/InfoPage';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { Preloader } from './components/Preloader';
import { Landing } from './components/Landing';
import { PageTransition } from './components/PageTransition';
import { ToastNotification } from './components/ToastNotification';
import { useShop } from './context/ShopContext';
import { AnimatePresence } from 'framer-motion';

function App() {
  const { currentPage } = useShop();
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="relative w-full min-h-screen overflow-hidden selection:bg-black selection:text-white bg-[#f4f4f4]">
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      
      <TopNav />
      {/* Hide Sidebar on specific pages including landing */}
      {currentPage !== 'landing' && currentPage !== 'blog' && currentPage !== 'info' && currentPage !== 'product' && (
        <Sidebar />
      )}
      
      <AnimatePresence mode="wait">
        <PageTransition key={currentPage} pageKey={currentPage}>
          {currentPage === 'landing' ? <Landing /> :
           currentPage === 'home' ? <Home /> : 
           currentPage === 'blog' ? <Blog /> : 
           currentPage === 'info' ? <InfoPage /> : 
           <ProductDetails />}
        </PageTransition>
      </AnimatePresence>

      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <ToastNotification />
    </div>
  );
}

export default App;
