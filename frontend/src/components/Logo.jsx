import styled from "styled-components"

const Wrapper = styled.section`
    .logo{
          font-family: "Paprika", system-ui;
          font-size:clamp(1.5rem, 3vw, 3rem);
          color: var(--blue-green);
          font-weight: 700;
    }
    .logo a{
        color: var(--blue-green);
    }
`

const Logo = () => {
  return (
    <Wrapper>
         <div className="logo"><a href={'/'} >Jobify</a></div>
    </Wrapper>
   
  )
}
export default Logo