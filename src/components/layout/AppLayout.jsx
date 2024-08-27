import { Outlet } from "react-router-dom";
import Sidebar from "components/sidebar/Sidebar";
import './AppLayout.css';


const AppLayout = () => {
    return <div  style={{
        padding: '50px 0px 0px 350px',
        
    }}>
         <div className="container">
           hello world
        </div>
        <Sidebar/>
        <Outlet/>
    </div>;

   


};

export default AppLayout;