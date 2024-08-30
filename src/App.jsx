import { useState } from 'react';
import './App.css';
import  CryptoContext from './CryptoContext'
import { FavProvider } from './component/FavContext';
import { Route, Routes } from 'react-router-dom';
import Protected from "../src/component/ProtectedRoute/Protected";
// import { makeStyles } from '@mui/styles';
import HomePage from '../src/component/HomePage'
import Header from './component/Header';
import SignupForm from './component/SingUpForm';
import SignInForm from './component/SigninForm';
import Coin from './component/Coin';
import FavList from './component/FavList';
import UserProfile from './component/UserProfile';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh"
  }
}));

function App() {
  const [count, setCount] = useState(0);
  const classes = useStyles();

  return (
    <CryptoContext>
      <FavProvider>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signUp' element={<SignupForm />} />
            <Route path='/signIn' element={<SignInForm />} />
            <Route path='/coins/:id' element={<Protected><Coin /></Protected>} />
            <Route path='/addCart' element={
              <Protected>
                <FavList />
              </Protected>
            }/>
            <Route path='/userprofile' element={<UserProfile />} />
          </Routes>
        </div>
      </FavProvider>
    </CryptoContext>
  );
}

export default App;
