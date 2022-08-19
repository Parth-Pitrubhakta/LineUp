import { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Singup from "./components/Signup/Singup";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Slots from "./components/Slots/Slots";
import Notification from "./components/Notifications/Notification";
import { fetchToken, onMessageListener } from "./firebase-config";
import { useCookies } from "react-cookie";
import Status from "./components/Status/Status";
function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [getFcmToken, setFcmToken] = useState("");
  const [started, setStarted] = useState(false);
  const [cookies, setCookies] = useCookies([]);
  const [isAppointmentBooked, setIsAppointmentBooked] = useState();
  useEffect(() => {
    setIsAppointmentBooked(cookies.Booked);
    console.log(isAppointmentBooked);
    const data = window.localStorage.getItem("timeIsset");
    if (data !== null) {
      console.log("inside");
      setStarted(true);
    }
    fetchToken(setTokenFound, setFcmToken);
    // onMessageListener().then((payload) => {
    //   setNotification({
    //     title: payload.notification.title,
    //     body: payload.notification.body,
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // });
  }, []);
  // window.localStorage.setItem('timeIsset',false);
  return (
    <BrowserRouter>
      <div>{getFcmToken}</div>
      <br />
      <div>{cookies.isBooked ? "true" : "false"}</div>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route
          exact
          path="/slots"
          element={
            isAppointmentBooked ? (
              <Slots />
            ) : (
              <Navigate replace to={"/status"} />
            )
          }
        />
        <Route
          exact
          path="/status"
          element={
            !isAppointmentBooked ? (
              <Status />
            ) : (
              <Navigate replace to={"/slots"} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
