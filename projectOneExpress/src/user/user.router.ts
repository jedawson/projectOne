import express from 'express';
import * as user from './user';
import logger from '../log';
import publicDir from '../constant';
import userService from './user.service';

const router = express.Router();

router.get('/login', function(req: any, res, next) {
  // redirect to login if already logged in
  if(req.session.user) {
    logger.log(req.session.user);
    res.redirect('/');
  }
  res.sendFile('login.html', {root: publicDir});
});

router.get('/', (req: any, res, next) => {
  let u = {...req.session.user};
  logger.debug(u);
  //delete u.password;
  res.send(JSON.stringify(u));
});

router.get('/:id', function(req, res, next) {
  userService.getUserByName(req.params.id).then((rest)=>{
      res.send(JSON.stringify(rest));
  });
})

// Legacy route, do not use.
router.get('/logout', (req, res, next) => {
  req.session.destroy((err)=> logger.error(err));
  res.redirect('/');
});

// Much more restful
router.delete('/', (req, res, next) => {
  req.session.destroy((err) => logger.error(err));
  res.sendStatus(204);
})

router.post('/', function(req: any, res, next) {
  logger.debug(req.body);
  user.login(req.body.name, req.body.password).then((user) => {
    if(user === null) {
      res.sendStatus(401);
    } else {
      req.session.user = user;
      res.send(JSON.stringify(user))
    }
  });
});

router.put('/', (req, res, next) => {
  logger.debug(req.body);
  userService.updateUser(req.body).then((data)=> {
      res.send(data);
  })
})
export default router;
