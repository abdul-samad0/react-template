import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import ChatBot from "../Common/ChatBot/ChatBot";
import Footer from "../Common/Footer";


const MainLayout = ({ children }) => {


  return (
    
        <div className="d-flex vh-100">
          {/* Sidebar with fixed height */}
          <Sidebar />

          {/* Main Content */}
          <div className="d-flex flex-column flex-grow-1">
            {/* Navbar - Stays fixed at the top */}
            <Navbar
            />

            {/* Scrollable Content */}
            <div className="flex-grow-1 overflow-auto bg-F8F8F8 pxy-20-12">
              {/* <Outlet /> */}
              {children}
              <Footer/>
            </div>

          </div>
          <ChatBot/>
        </div>
    )
};

export default MainLayout;
