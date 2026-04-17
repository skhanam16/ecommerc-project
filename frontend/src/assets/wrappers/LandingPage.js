import styled from "styled-components";

const Wrapper = styled.section`
nav{
  width: 90vw;
  max-width: 1120px;
  margin: 0 auto;
  height: var(--nav-height);
  display: flex;
 align-items: center;

}

.page{
  min-height:calc(100vh - var(--nav-height));
  display: grid;
  /* grid-template-columns: 2fr 1fr; */
  align-items: center;
  margin-top: -3rem;
  /* background: powderblue; */

}

h1{
  font-weight: 700;
  span{
    color: var(--blue-green);
  }
  margin-bottom: 1.5rem;
}

p{
  line-height: 2;
  color: var(--text-secondary-color);
  margin-bottom: 1.5rem;
  /* max-width: 70rem; */
}

.register-link{
  margin-right: 1rem;
}

.main-img{
  display:none;
}

.btn{
  padding: 0.75rem 1rem;
}

@media (min-width: 992px){
  .page{
    grid-template-columns: 1fr 400px;
    column-gap: 3rem;
  }
 .main-img{
  display:block;
}
}

`

export default Wrapper;