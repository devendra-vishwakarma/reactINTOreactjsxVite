import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import axios from 'axios';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import CoinInfo from './CoinInfo';
import ReactHtmlParser from 'react-html-parser';


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    }
  }
}));

function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null); // Initialize with null
console.log(id);

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []); 
  const classes = useStyles(); // Call useStyles()

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />; // Fix color and remove unnecessary curly brace

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          style={{ marginBottom: 20 }}
        />
        <Typography variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' className={classes.description}>
          {(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography
              variant='h5' className={classes.heading}
            >
              Rank:
              &nbsp;&nbsp;
            </Typography>
            <Typography
              variant='h5'
              style={{ fontFamily: "Montserrat" }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant='h5' className={classes.heading}
            >
              Current Price:
              &nbsp;&nbsp;
            </Typography>
            <Typography
              variant='h5'
              style={{ fontFamily: "Montserrat" }}
            >
              {symbol}{" "}
              {(coin?.market_data.current_price[currency.toLowerCase()]).toLocaleString()}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant='h5' className={classes.heading}
            >
              MarketCap:
              &nbsp;&nbsp;
            </Typography>
            <Typography
              variant='h5'
              style={{ fontFamily: "Montserrat" }}
            >
              {symbol}{" "}
              {(coin?.market_data.market_cap[currency.toLowerCase()]).toLocaleString().slice(0, -6)}
              {" "}M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
}

export default Coin;
