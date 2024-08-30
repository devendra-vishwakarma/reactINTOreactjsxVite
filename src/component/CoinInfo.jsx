import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { createTheme, LinearProgress, makeStyles, ThemeProvider } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Important for Chart.js v3+
import { chartDays } from '../config/data';

function CoinInfo({ coin }) {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices); // Assuming data.prices contains the price history
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);   // dependency = currency,days

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: 'dark',
    },
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
      },
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData.length ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time = date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price (Past ${days} Days) in ${currency}`,
                  borderColor: "#EEBC1D",
                  fill: true,
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}
        <div
        style={
            {display:"flex", justifyContent:"space-around", marginTop:20,width:"100%"}}>
            {chartDays.map((day) => (
                <button
                style={{
                    padding :"0.5rem 2rem",
                    borderRadius: 5,
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    background:'gold',
                }}
                    onClick={() => setDays(day.value)}
                    key={day.value}
                >
                    {day.label}
                </button>
            ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;
