// Router
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllTickets from "./pages/AllTickets";
import CreateTicket from "./pages/CreateTicket";
import EditTicket from "./pages/EditTicket";
import { MainContext } from "./utils/MainContext";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRouter from "./router/ProtectedRouter";

const App = () => {
  return (
    <MainContext>
      <Header />
      <Routes>
        <Route element={<ProtectedRouter />}>
          <Route path="/" element={<Home />} />
          <Route path="/all-tickets" element={<AllTickets />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/edit-ticket/:ticketID" element={<EditTicket />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </MainContext>
  );
};

export default App;
