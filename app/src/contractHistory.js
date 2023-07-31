import React, { useEffect, useState } from "react";
import axios from "axios";
import Escrow from "./Escrow";
const server = axios.create({
  baseURL: "http://localhost:3042",
});

const ContractHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
      const fetchHistory = async () => {
        try {
          const response = await server.get("/history");
          const res = response.data;
          setHistory(res);
        } catch (error) {
          console.error("Error fetching history:", error);
        }
      };
  
      fetchHistory();
    }, []);
  
    return (
        <>
        {history.map((hist) => {
          return <Escrow key={hist.address} {...hist} />;
        })}
      </>
    );
  };
  
  export default ContractHistory;
  