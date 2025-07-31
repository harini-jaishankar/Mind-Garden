import axios from 'axios';

function LogoutButton() {
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/logout', { withCredentials: true });
      localStorage.removeItem('isLoggedIn');
      window.location.href = "/login";
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: '20px' }}>
      🚪 Logout
    </button>
  );
}

export default LogoutButton;
