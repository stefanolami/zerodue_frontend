import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Search from './components/Search';
import SearchByPlace from './components/SearchByPlace';
import AddShop from './components/AddShop';
import Shop from './components/Shop';
import OrdersHistory from './components/OrdersHistory';
import AddOrder from './components/AddOrder';
import AdvancedSearch from './components/AdvancedSearch';
import LastAddedShops from './components/LastAddedShops';
import ClientsList from './components/ClientsList';
import UpdateShop from './components/UpdateShop';
import NotFound from './components/NotFound';
import Error from './components/Error';
import PrivateRoute from './components/PrivateRoute';
import LogIn from './components/LogIn';
import WelcomeToDemo from './components/WelcomeToDemo';

import withContext from './Context';

const HeaderWithContext = withContext(Header);
const HomeWithContext = withContext(Home);
const SearchWithContext = withContext(Search);
const SearchByPlaceWithContext = withContext(SearchByPlace)
const AddShopWithContext = withContext(AddShop);
const ShopWithContext = withContext(Shop);
const OrdersHistoryWithContext = withContext(OrdersHistory);
const AddOrderWithContext = withContext(AddOrder)
const AdvancedSearchWithContext = withContext(AdvancedSearch);
const LastAddedShopsWithContext = withContext(LastAddedShops);
const ClientsListWithContext = withContext(ClientsList);
const UpdateShopWithContext = withContext(UpdateShop);
const PrivateRouteWithContext = withContext(PrivateRoute);
const LogInWithContext = withContext(LogIn);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderWithContext />
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" /> } />
          <Route element={<PrivateRouteWithContext />}>
            <Route path="/home" element={<HomeWithContext />} />
            <Route path="/add-shop" element={<AddShopWithContext />} />
            <Route path="/shop/:id" element={<ShopWithContext />} />
            <Route path="/orders-history/:id" element={<OrdersHistoryWithContext />} />
            <Route path="/add-order/:id" element={<AddOrderWithContext />} />
            <Route path="/search" element={<SearchWithContext />} />
            <Route path="/search-by-place" element={<SearchByPlaceWithContext />} />
            <Route path="/advanced-search" element={<AdvancedSearchWithContext />} />
            <Route path="clients-list" element={<ClientsListWithContext />} />
            <Route path="/last-added" element={<LastAddedShopsWithContext />} />
            <Route path="/update/:id" element={<UpdateShopWithContext />} />
          </Route>
          <Route path="/log-in" element={<LogInWithContext />} /> 
          <Route path="/welcome" element={<WelcomeToDemo />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
