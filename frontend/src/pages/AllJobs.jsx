import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/CustomFetch.js';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';



export const loader = async ({ request }) => {
  // console.log(request.url);
   const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    // returning an object with search, position, company
  // console.log(params);
  try {
    const { data } = await customFetch.get('/jobs', {params: params});
    return {
      data,
      searchValues:{...params}
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobsContext =createContext();
const AllJobs = () => {
  const { data, searchValues } = useLoaderData();
  // console.log(data);

  return (
    <AllJobsContext.Provider value={{data, searchValues}}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;