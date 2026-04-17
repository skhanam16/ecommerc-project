import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';


const PageBtnContainer = () => {
    const {data:{ totalJobs, numOfPages, currentPage}} = useAllJobsContext();

    // console.log(data);
    // data contains jobs and totalJobs, numOfPages, currentPage in 
    const pages =  Array.from({length: numOfPages}, (_, index) => index + 1); 
    // console.log(pages);
    // const {search, pathname} = useLoction();
const location = useLocation();
// console.log(location);
const {search, pathname} = location;
console.log(search, pathname);
    const navigate = useNavigate();
    // console.log(navigate);
    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', pageNumber);
        // console.log(pageNumber);
        //pathname =/dashboard/all-jobs
        //searchParams =?search=&jobStatus=pending&jobType=full-time&sort=z-a
        navigate(`${pathname}?${searchParams}`); 
    };

    const addPageButton = ({pageNumber, activeClass}) => {
           return (
        <button 
            className={`btn btn-page ${activeClass && 'active'}`} 
            key={pageNumber} 
            onClick={() =>handlePageChange(pageNumber)}>{pageNumber}
        </button>
            )
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        pageButtons.push(
            addPageButton({
                pageNumber:1, 
                activeClass:currentPage ===1}));

        // Current page
        if(currentPage !==1 && currentPage !== numOfPages){
              pageButtons.push(
            addPageButton({
                pageNumber:currentPage, 
                activeClass:true}));
        };

         pageButtons.push(
            addPageButton({
                pageNumber:numOfPages, 
                activeClass:currentPage ===numOfPages}));
        return pageButtons;
    };

  return <Wrapper>
    <button className='btn prev-btn' onClick={() =>{
        let prevPage =currentPage -1;
        if(prevPage <0) prevPage = numOfPages;
        handlePageChange(prevPage)}}><HiChevronDoubleLeft/>prev</button>
    <div className="btn-container">
      {renderPageButtons()}
    </div>
    <button className="btn next-btn" onClick={() =>{
        let nextPage =currentPage +1;
        if(nextPage > numOfPages) nextPage = 1;
        handlePageChange(nextPage)}}><HiChevronDoubleRight />next</button>
  </Wrapper>

}
export default PageBtnContainer