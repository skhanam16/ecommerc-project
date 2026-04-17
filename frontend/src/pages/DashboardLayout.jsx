import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from '../assets/wrappers/Dashboard.js';
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App.jsx";
// import customFetch from "../utils/CustomFetch.js";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.js";


export const loader = async () => {
  try {
   const {data} = await customFetch.get('/users/current-user');
   return data;
  } catch (error) {
    return redirect('/');
    
  }
}
const GlobalContext = createContext();

const DashboardLayout = ({isDarkThemeEnabled}) => {

  const {user} = useLoaderData();
  const navigate = useNavigate();
  // console.log(data);
  // const user = {name: 'John'};
  const [showSidebar, setShowSidebar] =useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);



  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
      document.body.classList.toggle('dark-theme', newDarkTheme);
      localStorage.setItem('darkTheme', newDarkTheme);

  };

  const toggleSidebar = () =>{
    setShowSidebar(!showSidebar);
    // console.log("you clicked sidebar toggle")
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
   toast.success("Logging out ...");
  };


  return (
    <GlobalContext.Provider value={{user, showSidebar, 
    isDarkTheme, 
    toggleDarkTheme, 
    toggleSidebar, 
    logoutUser }} >
   <Wrapper>
    <main className="dashboard">
   <SmallSidebar />
   <BigSidebar />
   <div>
    <Navbar />
    <div className="dashboard-page">
        <Outlet context={{user}}/>
    </div>
   </div>
  </main>
</Wrapper>   
</GlobalContext.Provider>
  )
}
export const useDashboardContext = () => useContext(GlobalContext);
export default DashboardLayout;

