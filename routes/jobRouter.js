import { Router } from "express";
const router = Router();

checkForTestUser    
import { 
    getAllJobs, 
    createJob, 
    getJob, 
    updateJob, 
    deleteJob,
    showStats
 } from "../controllers/jobController.js";

    import { validateJobInput, validateIdParam } from "../middleware/validationMiddleware.js";
    import { checkForTestUser } from "../middleware/authMiddleware.js";
  

    // one way to get the route

    router.get('/', getAllJobs);
    router.post('/', checkForTestUser, validateJobInput, createJob);
        //     We want to place stats before the ID because otherwise if you place it after Express is just going to
        //     think that stats is the ID that we're passing in.
    // router.route('/stats').get(showStats);
        router.get('/stats', showStats);

    router.get('/:id', validateIdParam, getJob);
    router.patch('/:id', validateJobInput, validateIdParam, checkForTestUser, updateJob);
    router.delete('/:id', validateIdParam, checkForTestUser, deleteJob);

  
    // another way to get the routes

    // router.route('/').get(getAllJobs).post(createJob);
    // router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

    export default router;