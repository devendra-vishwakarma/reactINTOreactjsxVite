import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, IconButton, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useFav } from './FavContext';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    row:{
         backgroundImage: 'url(./banner2.jpg)',
         minHeight:"100vh"
    },
    boxShadows:{
        boxShadow:"rgba(0, 0, 0, 0) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"
    },
    card: {
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
        },
    },
    media: {
        height: 200,
        width: 'auto',
        margin: '20px auto 10px',
        display: 'block',
        padding: '1rem',
        borderRadius: '10px',
    },
    cardContent: {
        padding: theme.spacing(3),
    },
    price: {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    highLowContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 0',
    },
    high: {
        color: 'green',
        fontWeight: 'bold',
        borderBottom: '2px solid green',
        paddingBottom: '5px',
    },
    low: {
        color: 'red',
        fontWeight: 'bold',
        borderBottom: '2px solid red',
        paddingBottom: '5px',
    },
    actionButtons: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 20px',
    },
}));

const FavList = () => {
    const { favorites, removeFromFavorites } = useFav();
    const navigate = useNavigate();
    const classes = useStyles();

    return (
        <Container className={classes.row}>
            <Typography variant="h4" gutterBottom>
                Favorite Cryptocurrencies
            </Typography>
            <Grid container spacing={4} className={classes.boxShadows}>
                {favorites.map((coin) => (
                    <Grid item xs={12} md={6} lg={4} key={coin.id}>
                        <Card className={classes.card}>
                        <CardMedia
                                component="img"
                                image={coin.image}
                                alt={coin.name}
                                title={coin.name}
                                sx={{
                                    height: 200,
                                    width: 'auto',
                                    margin: '0 auto',
                                    display: 'block',
                                    padding: "2rem",
                                }}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography variant="h6" gutterBottom>{coin.name}</Typography>
                                <Typography variant="body2" className={classes.price}>Price: ${coin.current_price.toLocaleString()}</Typography>
                                <Typography variant="body2">Market Cap: ${coin.market_cap.toLocaleString()}</Typography>
                                <div className={classes.highLowContainer}>
                                    <Typography variant="body2" className={classes.high}>24h High: ${coin.high_24h.toLocaleString()}</Typography>
                                    <Typography variant="body2" className={classes.low}>24h Low: ${coin.low_24h.toLocaleString()}</Typography>
                                </div>
                            </CardContent>
                            <div className={classes.actionButtons}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => { navigate("/buysellstock") }}
                                >
                                    Buy
                                </Button>
                                <IconButton onClick={() => removeFromFavorites(coin.id)}>
                                    <Delete style={{ color: 'red' }} />
                                </IconButton>
                                <Button variant="contained" color="error" onClick={() => { navigate("/buysellstock") }}>Sell</Button>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FavList;
