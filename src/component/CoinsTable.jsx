import React, { useEffect, useState } from 'react';
import { CoinList } from '../config/api';
import {
    Container,
    createTheme,
    LinearProgress,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    ThemeProvider,
    Typography,
    IconButton
} from '@material-ui/core';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { Favorite } from '@mui/icons-material'; // Import Favorite icon
import { useFav } from './FavContext'; // Import useFav hook

function CoinsTable() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedFavorite, setSelectedFavorite] = useState(null); // State to track selected favorite

    const navigate = useNavigate();
    const { currency } = CryptoState();
    const { addToFavorites } = useFav();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const handleSearch = () => {
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase())
        );
    };

    const useStyle = makeStyles(() => ({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold",
            },
        },
    }));

    const classes = useStyle();

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant='h4'
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                    label='Search For a Crypto Currency'
                    variant='outlined'
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: "gold" }} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Market Cap", "Favorite"].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "left" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;

                                    return (
                                        <TableRow
                                            onClick={() => navigate(`/coins/${row.id}`)}
                                            className={classes.row}
                                            key={row.id}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                style={{ display: "flex", gap: 15 }}
                                            >
                                                <img
                                                    src={row?.image}
                                                    alt={row?.name}
                                                    height={50}
                                                    style={{ marginBottom: 10 }}
                                                />
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <span
                                                        style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22,
                                                        }}
                                                    >
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{ color: "darkgrey" }}>
                                                        {row.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                {currency === "INR" ? "RS" : "$"}{row.current_price.toLocaleString()}
                                            </TableCell>
                                            <TableCell align="right">
                                                {currency === "INR" ? "RS" : "$"}{row.market_cap.toLocaleString()}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                style={{
                                                    color: profit ? "green" : "red",
                                                }}
                                            >
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToFavorites(row);
                                                        setSelectedFavorite(row.id); // Set the selected favorite
                                                    }}
                                                >
                                                    <Favorite 
                                                        style={{ 
                                                            color: selectedFavorite === row.id ? 'gold' : 'white', // Conditionally style icon
                                                            fontSize: 40 
                                                        }} 
                                                    />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <Pagination
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 350);
                    }}
                />
            </Container>
        </ThemeProvider>
    );
}
export default CoinsTable;
