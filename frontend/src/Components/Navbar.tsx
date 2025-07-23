import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
    const navigate = useNavigate();
    return(
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">FitSocial</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/home')}
            className="text-gray-600 hover:text-black"
          >
            Feed
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="text-gray-600 hover:text-black"
          >
            My Profile
          </button>
          <button
            onClick={() => navigate('/findfriends')}
            className="text-gray-600 hover:text-black"
          >
            Find Friends
          </button>
          <button
            onClick={() => navigate('/heatmap')}
            className="text-gray-400 cursor-not-allowed"
            disabled
          >
            Heatmap (Coming Soon)
          </button>
        </div>
      </nav>
    )
}