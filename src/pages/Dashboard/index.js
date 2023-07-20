import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import './index.css';

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    }

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Dashboard page</h2>
            <div className="dashboard-container">
                <Link className="dashboard-links" to="/user">User</Link>
            </div>
            <div className="dashboard-container">
                <Link className="dashboard-links" to="/staff">Staff</Link>
            </div>
            <div className="dashboard-container">
                <Link className="dashboard-links" to="/classList">Class</Link>
            </div>
            <div className="dashboard-container">
                <Link className="dashboard-links" to="/courseList">Course</Link>
            </div>
            <div className="dashboard-container">
                <Link className="dashboard-links" to="/room">Room</Link>
            </div>
            <div className="dashboard-container">
                <Link className="dashboard-links" to="/bookingManagement">Booking</Link>
            </div>
            <div className="dashboard-container">
                <button className="dashboard-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
