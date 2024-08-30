import React, { useState } from 'react';
import {
  AppBar,
  Container,
  createTheme,
  makeStyles,
  MenuItem,
  Select,
  SvgIcon,
  ThemeProvider,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  TextField
} from '@material-ui/core';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CryptoState } from '../CryptoContext';
import LogOut from './LogOut';
import { useNavigate } from 'react-router-dom';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  cartIcon: {
    marginLeft: 20
  },
  search: {
    marginRight: 20,
    width: 300,
    backgroundColor: '#333',
    borderRadius: 5,
  }
}));

function Header() {
  const classes = useStyles();
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // State for search input

  // State for Cart Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleCartClick = (event) => {
    navigate("/addCart");
  };

  const handleCloseCartMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate("/signin");
  }

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff'
      },
      type: 'dark'
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar className='d-flex align-items-center justify-content-between'>
            <Typography
              className={classes.title}
              variant='h6'
            >
              Crypto <span>Hunter</span>
            </Typography>


            <Typography style={{
              height: 40,
              aspectRatio: 1,
              marginRight: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: 'center'
            }}>
              <div onClick={() => { navigate("/") }}>
                <HomeIcon color="action" />
              </div>
              <IconButton
                style={{
                  height: 40,
                  aspectRatio: 1,
                  marginRight: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: 'center'
                }}
                className={classes.cartIcon}
                color="inherit"
                onClick={handleCartClick}
              >
                <div onClick={() => { navigate("/addCart") }}>
                  <Badge color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </div>
              </IconButton>
            </Typography>

            <Select
              variant='outlined'
              style={{
                width: 100,
                height: 40,
                marginRight: 15
              }}
              value={currency}
              onChange={(e) => { setCurrency(e.target.value) }}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseCartMenu}
            >
              {/* Add cart items or placeholder */}
              <MenuItem>
                <Typography variant="body2">Your cart is empty</Typography>
              </MenuItem>
            </Menu>

            <div className='btn btn-outline-secondary' onClick={() => { navigate("/signUp");
              handleLogout()
             }}>
              <LogOut/>
              {sessionStorage.getItem("token") ? "logout" : "login"}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
