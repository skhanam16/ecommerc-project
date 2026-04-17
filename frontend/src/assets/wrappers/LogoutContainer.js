import styled from 'styled-components';

const Wrapper = styled.div`
position:relative;
.logout-btn{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:0 0.5rem;
}
.img{
  width:25px;
  height:25px;
  border-radius:25%;

}

.dropdown{
  
  position:absolute;
  top: 45px;
  left: 0;
  width: 100%;
  box-shadow:var(--shadow-2);
  text-align:center;
  visibility:hidden;
  border-radius:var(--border-radius);
  background: var(--blue-green);
}
.show-dropdown{
   visibility:visible;
   
}

.dropdown-btn{
  border-radius:var(--border-radius);
  padding:0.2rem;
  background:transparent;
  border-color: transparent;
  color:white;
  letter-spacing:var(--letter-spacing);
  text-transform:capitalize;
  cursor:pointer;
}

`;

export default Wrapper;
