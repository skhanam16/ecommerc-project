import JobModel from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customError.js';
import mongoose from 'mongoose';
import dayjs from 'dayjs';

// import { nanoid } from 'nanoid';

// let jobs = [
//     {id: nanoid(), company: 'apple', position: 'fronend'},
//     {id: nanoid(), company: 'google', position: 'backend'},
//     {id: nanoid(), company: 'firefox', position: 'full stack'}
// ];

export const getAllJobs = async (req, res) => {
  // console.log(req.query);
  // console.log(req.user);
  const {search, jobStatus, jobType, sort} = req.query;
  const queryObject = {
    createdBy: req.user.userId, 
  }

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }
  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  const sortOptions ={
    newest:'-createdAt',
    oldest:'createdAt',
    'a-z': 'position',
    'z-a':'-position'
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  //Setup pagination
  
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip =(page -1) * limit;


   const jobs = await JobModel.find(queryObject).sort(sortKey).skip(skip).limit(limit);
   const totalJobs = await JobModel.countDocuments(queryObject);
   const numOfPages = Math.ceil(totalJobs/ limit);
    res.status(StatusCodes.OK).json({totalJobs, numOfPages, currentPage:page, jobs});
};


export const createJob = async (req, res) => {
  req.body.createdBy =req.user.userId;
    const job =await JobModel.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
};

export const getJob = async (req, res) => {
    const { id } = req.params;
      const job = await JobModel.findById(id);
    //   console.log(job);
    // const job = jobs.find(job =>job.id ===id);
    if(!job) throw new NotFoundError(`no job with this id ${id}`);
    res.status(StatusCodes.OK).json({job});
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {new:true});
  if (!updatedJob)  throw new NotFoundError(`no job with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
    const {id} = req.params;
   const removedJob =await JobModel.findByIdAndDelete(id);
     if(!removedJob) throw new NotFoundError(`no job with this id ${id}`);

    res.status(StatusCodes.OK).json({msg: "Job deleted", job:removedJob});
};

export const showStats = async (req, res) => {
  let stats = await JobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId)
      }
    },
    {
      $group: {
        _id: '$jobStatus', 
        count:{$sum: 1}
      }
    },
  ]);

stats = stats.reduce((acc, curr) =>{
const {_id:title, count} = curr;
acc[title] = count;
return acc;
},{});
console.log(stats);

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.inteview || 0,
    declined: stats.declined || 0,
  }

  let monthlyApplications = await JobModel.aggregate([
     {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId)
      }
    },
    {
      $group: {
        _id:{ year:{$year:'$createdAt'}, month:{$month:'$createdAt'} },
         count:{$sum: 1}
      },
    },
    {
      $sort: {
        '_id.year': -1,
        '_id.month': -1
      }
    },
    {$limit:6},
  ]);

  monthlyApplications = monthlyApplications.map((item) =>{
    const {_id:{year, month}, count} = item;
    const date = dayjs().month(month -1).year(year).format('MMM YY');
    return {date, count};
    // console.log(_id.year);
    // console.log(_id.month);
    // console.log(count);
  }).reverse();
  // let monthlyApplications = [
  //   {date: 'May 23', count:12},
  //   {date: 'June 23', count:12},
  //   {date: 'July 23', count:12},
  // ];
 res.status(StatusCodes.OK).json({defaultStats, monthlyApplications});
}
