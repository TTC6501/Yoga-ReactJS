import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Dashboard page</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Link to="/user">User</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/staff">Staff</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/classList">Class</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/courseList">Course</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/room">Room</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/bookingManagement">Booking</Link>
                </li>
              </ul>
              <div className="text-center mt-4">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
