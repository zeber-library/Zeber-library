// BuySellRoutes.jsx
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import BookLayout from "./BookSection/BookLayout";
import Sell from "./sell/sell";
import Cart from "./CartSection/Cart";
import Header from "./Header/Header";
import { useLocation } from "react-router-dom";

// Function to conditionally render the header
function ConditionalHeader() {
    const location = useLocation(); // Get the current location
    const showHeaderPaths = ["/buy-sell", "/sell", "/cart"];
    
    // Regex for dynamic book route (e.g., /:apiType/book/:id)
    const dynamicBookPath = /^\/[^\/]+\/book\/[^\/]+$/; // Adjusted regex for dynamic path
  
    // Check if the current path matches one of the desired paths
    const shouldShowHeader =
      showHeaderPaths.includes(location.pathname) || dynamicBookPath.test(location.pathname);
  
    return shouldShowHeader ? <Header /> : null;
  }

  
function BuySellRoutes() {
  return (
    <>
      <ConditionalHeader /> {/* Conditionally render the header */}
      <Routes>
        {/* Buy-Sell Routes */}
        <Route path="/buy-sell" element={<HomeScreen />} />
        <Route path="/:apiType/book/:id" element={<BookLayout />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default BuySellRoutes;
