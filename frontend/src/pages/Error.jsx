import { Link, useRouteError } from "react-router-dom";
import img from '../assets/images/page-not-found.svg'
import styled from "styled-components";

const Wrapper = styled.main`
/* width: var(--fluid-width);
max-width: var(--max-width);
margin: 0 auto;
margin-top: 6rem;
display: flex;
justify-content: center;
img{
  max-width: 40vw;
  margin-bottom: 2rem;
}
h3{
  margin:1.5rem 0;
}

.link{
  margin-top: 6rem;
  background: green;
} */

  min-height: 100vh;
  text-align:center;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }

  h3{
    margin-bottom: 0.5rem;
  }

  p{
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
  }

  a{
    color: var(--blue-green);
    text-transform: capitalize;
  
  }

  a:hover{
    color: var(--text-secondary-color);
    /* transition: 3s ease-in-out; */
  }
  
`

const Error = () => {
  const error = useRouteError();
  if(error.status ===404){
    return <Wrapper>
      <div>
        <img src={img} alt="page not found" className="img" />
        <h3>Opps! Page not found</h3>
        <p>We can't seem to find the page you are looking for</p>
        <Link to="/dashboard">back home</Link>
      </div>
    </Wrapper>
  }
  return <Wrapper>
     <div>
      <h1>Something went wrong</h1>
     
  </div>
  </Wrapper>
 
  
}
export default Error