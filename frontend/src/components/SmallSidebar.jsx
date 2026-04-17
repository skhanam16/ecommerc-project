import Wrapper from '../assets/wrappers/SmallSidebar.js';
import { useDashboardContext } from '../pages/DashboardLayout.jsx';
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo.jsx';
import Navlinks from './Navlinks.jsx';

const SmallSidebar = () => {
      // const data = useDashboardContext();
      const {showSidebar, toggleSidebar} = useDashboardContext();
   
    //   console.log(data);
  return (
  
    <Wrapper>
        <div className={showSidebar? 'sidebar-container show-sidebar' : 'sidebar-container'}>
          <div className="content">
            <button type="button" className="close-btn" onClick={toggleSidebar}><FaTimes /></button>
            <header>
              <Logo />
            </header>
          <Navlinks />
          </div>
     
        </div>
    </Wrapper>
  )
}
export default SmallSidebar