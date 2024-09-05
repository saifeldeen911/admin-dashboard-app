import "./App.css";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import SignUpForm from "./components/SignUpForm";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/users" element={<Dashboard />} />
                    <Route path="/profile/:userID" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
