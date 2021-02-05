import React , { useEffect }  from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './routing.component';
import './App.css';
import userService from './user/user.service';
import { useDispatch } from 'react-redux';
import { getUser } from './actions';

function App() {

  const dispatch = useDispatch();
    useEffect(() => {
      userService.getLogin().then((user) => {
        console.log(user);
        dispatch(getUser(user));
      });
    }, [dispatch]);
  
  return (
    <div className='container'>
      <BrowserRouter>
        <RouterComponent></RouterComponent>
      </BrowserRouter>
    </div>
  );
}

export default App;
