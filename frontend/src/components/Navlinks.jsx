import { useDashboardContext } from "../pages/DashboardLayout"
import { NavLink } from "react-router-dom";
import links from "../utils/Links";


const Navlinks = ({isBigSidebar}) => {

    const {toggleSidebar, user} = useDashboardContext();

  return (
       <div className="nav-links">
              { links.map((link) => {
                const {text, path, icon} = link;
            const {role} = user;
            if(path === 'admin' && role !== 'admin'){
              return;
            }
                return <NavLink 
                key={path}
                to={path} 
                alt={text} 
                className="nav-link" 
                onClick={isBigSidebar? null : toggleSidebar}
                end ><span className='icon'>{icon}</span>{text}</NavLink>
              })}
            </div>
  )
}
export default Navlinks