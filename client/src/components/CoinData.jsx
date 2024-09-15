import { useState, useEffect } from "react";
import '../static/css/CoinData.css'

const CoinData = ({ lightMode }) => {
    const [coins, setCoins] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/coins");
            const data = await response.json();
            setCoins(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="platform-price">
            <table className="platform-price-table">
                <thead>
                    <tr>
                        <th>
                            <h4><span className="pointer">#</span></h4>
                        </th>
                        <th>
                            <h4><span className="pointer">Name</span></h4>
                        </th>
                        <th>
                            <h4><span className="pointer">Base unit</span></h4>
                        </th>
                        <th>
                            <h4><span className="pointer">Last Price</span></h4>
                        </th>
                        <th>
                            <h4><span className="pointer">Buy / Sell Price</span></h4>
                        </th>
                        <th>
                            <h4><span className="pointer">Volume</span></h4>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin, index) => (
                        <tr
                            key={index}
                            style={{
                                backgroundColor: lightMode ? "#f8f9fa" : "#2e3241",
                                color: lightMode ? "#0c0f48" : "#fff",
                                transition: "all .5s"
                            }}
                        >
                            <td><h4>{index + 1}</h4></td>
                            <td className="platform">
                                <h4>{coin.name}</h4>
                            </td>
                            <td>
                                <h4>{coin.base_unit}</h4>
                            </td>
                            <td>
                                <h4>₹ {coin.last.toLocaleString('en-IN')}</h4>
                            </td>
                            <td>
                                <h4>
                                    <span>₹ {coin.buy.toLocaleString('en-IN')}</span> /
                                    <span> ₹ {coin.sell.toLocaleString('en-IN')}</span>
                                </h4>
                            </td>
                            <td>
                                <h4>{coin.volume}</h4>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CoinData;
