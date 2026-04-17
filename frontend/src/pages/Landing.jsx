
import Wrapper from '../assets/wrappers/LandingPage';
import JobHunt from '../assets/images/job-hunt.svg';
import { Link } from "react-router-dom";
import { Logo } from '../components';


const Landing = () => {
  return <Wrapper>
    <nav>
            {/* <img src={logo} alt="jobify" className="logo" /> */}
            <Logo />
    </nav>

  <div className="container page">
    <div className="info">
      <h1>Job <span>tracking</span> app</h1>
      <p>I'm baby master cleanse irony helvetica umami big mood. Shabby chic single-origin coffee dreamcatcher stumptown echo park jean shorts tousled vexillologist lyft kinfolk godard tbh. Fam 90's chia austin. Art party leggings yes plz, plaid tacos migas kogi gastropub hell of synth vegan fingerstache biodiesel. Listicle chia quinoa distillery.</p>
      <Link to={'/register'} className="btn register-link">Register</Link>
       <Link to={'/login'} className="btn ">Login / Demo user</Link>
    </div>
    <img src={JobHunt} alt="job hunt" className="img main-img"/>
  </div>
</Wrapper>
}


export default Landing