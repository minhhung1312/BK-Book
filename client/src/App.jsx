import { Navigate, Route, Routes } from "react-router-dom"
import HomeLayout from "./layout/HomeLayout/HomeLayout"
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import MemberLayout from './layout/MemberLayout/MemberLayout';
import BooksList from './pages/BooksList/BooksList';
import HomeLayoutFooter from './layout/HomeLayoutFooter/HomeLayoutFooter';
import Error from './pages/Error/Error';
import AdminLayout from './layout/AdminLayout/AdminLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NewsDetail from "./pages/NewsDetail/NewsDetail";
import Checkout from "./pages/Checkout/Checkout";
import AuthLayout from './layout/AuthLayout/AuthLayout';
import News from './pages/Admin/News/News';
import AdminDashboard from './pages/Admin/Dashboard/Dashboard';
import BookDetail from './pages/Admin/BookDetail/BookDetail';
import ProductsDetail from './pages/ProductsDetail/ProductsDetail';
import NewsUser from './pages/NewsUser/NewsUser';
import ContactUs from "./pages/ContactUs/ContactUs";
import FAQ from "./pages/FAQ/FAQ";
import Mailbox from './pages/Admin/Mailbox/Mailbox';
import Mailboxdetail from './pages/Admin/MailDetail/MailDetail';
import Manageuser from './pages/Admin/Manageuser/Manageuser';
import ManageBook from './pages/Admin/Managebook/Managebook';
import ManageResource from './pages/Admin/Manageresource/Manageresource';
import Profile from './pages/Member/Profile/Profile';
import ProfileEdit from "./pages/Member/ProfileEdit/ProfileEdit";
import Address from "./pages/Member/Address/Address";
import AddressEdit from "./pages/Member/AddressEdit/AddressEdit";
import AddressAdd from "./pages/Member/AddressAdd/AddressAdd";
import Wishlist from "./pages/Member/Wishlist/Wishlist";
import Order from "./pages/Member/Order/Order";
import ManageNews from "./pages/Admin/Managenews/Managenews";
import { useContext } from "react";
import GlobalContext from "./context/GlobalContext";

function App() {

  const {user} = useContext(GlobalContext)

  return (
    <Routes>

      <Route path="/" element={<HomeLayoutFooter />}>
        <Route index element={<Home />} />
        <Route path="news-detail" element={<NewsDetail />} />
        <Route path="books-list" element={<BooksList />} />
        <Route path="news-user" element={<NewsUser />} />
        <Route path="ProductsDetail" element={<ProductsDetail />} />
        <Route path="NewsUser" element={<NewsUser />} />
        <Route path="ContactUs" element={<ContactUs />} />
        <Route path="FAQ" element={<FAQ />} />
      </Route>

      <Route path="/p" element={user ? <HomeLayout /> : <AuthLayout />}>
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      <Route path="/member" element={user ? <MemberLayout /> : <AuthLayout />}>
        <Route index element={<Profile />} />
        <Route path="profile-edit" element={<ProfileEdit />} />
        <Route path="address" element={<Address />} />
        <Route path="address-edit" element={<AddressEdit />} />
        <Route path="address-add" element={<AddressAdd />} />
        <Route path="Wishlist" element={<Wishlist />} />
        <Route path="Order" element={<Order />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/admin" element={user && user.isAdmin === "True" ? <AdminLayout /> : <Error />}>
        <Route index element={<AdminDashboard />} />
        <Route path="news" element={<News />} />
        <Route path="book-detail" element={<BookDetail />} />
        <Route path="mailbox" element={<Mailbox />} />
        <Route path="mail-detail" element={<Mailboxdetail />} />
        <Route path="manage-user" element={<Manageuser />} />
        <Route path="manage-book" element={<ManageBook />} />
        <Route path="manage-resource" element={<ManageResource />} />
        <Route path="manage-news" element={<ManageNews />} />
      </Route>

      <Route path="/*" element={<Error />} />

    </Routes>
  )
}

export default App
