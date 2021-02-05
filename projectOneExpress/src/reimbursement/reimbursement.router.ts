import Express from 'express';
import logger from '../log';
import reimbursementService from '../reimbursement/reimbursement.service'

const router = Express.Router();


/* GET users listing. */
router.get('/', function(req:any, res, next) {
    if (req.session.user) {
        reimbursementService.getReimbursements(req.session.user).then((reimbursements) => {
            res.send(JSON.stringify(reimbursements));
        });
    } else {
        res.sendStatus(401);
    }
    
});

router.get('/:id', function(req, res, next) {
    reimbursementService.getReimbursement(req.params.id).then((rest)=>{
        res.send(JSON.stringify(rest));
    });
})

router.post('/', (req, res, next) => {
    logger.debug(req.body);
    reimbursementService.addReimbursement(req.body).then((data)=> {
        logger.debug(data);
        res.sendStatus(201); // Created
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});

router.delete('/:id', function (req, res, next) {
    logger.debug(req.body);
    reimbursementService.deleteReimbursement(req.params.id).then((data)=> {
        logger.debug(data);
        res.sendStatus(200); // Created
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});
router.put('/', (req, res, next) => {
    logger.debug(req.body);
    reimbursementService.updateReimbursement(req.body).then((data)=> {
        res.send(data);
    })
})
export default router;