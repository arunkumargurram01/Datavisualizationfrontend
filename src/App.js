import React from "react";
import './App.css';
import { Route, Routes, NavLink } from 'react-router-dom';
import SalesOverTime from "./Charts/SalesOverTime";
import SalesGrowthOverTime from "./Charts/SalesGrowth";
import RepeatedCustomers from "./Charts/RepeatedCustomers";
import NewCustomersOverTime from "./Charts/NewCustomers";
import CustomerCohorts from "./Charts/CustomerCohorts";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomersOnMap from "./Charts/CustomersMap";

const CommanUI = () => {
    const [salesOverTime, setSalesOverTime] = useState([]);
    const [salesGrowthOverTime, setSalesGrowthOverTime] = useState([]);
    const [newCustomersOverTime, setNewCustomersOverTime] = useState([]);
    const [repeatedCustomersOverTime, setRepeatedCustomersOverTime] = useState([]);
    const [customersCohorts, setCustomersCohorts] = useState([]);
    const [customersonmap, setCustomersonmap] = useState([])

    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
  
    useEffect(() => {
      fetchSalesOverTimeData();
      fetchSalesGrowthOverTime();
      fetchNewCustomersOverTime();
      fetchRepeatedCustomersOverTime();
      fetchCustomersCohorts();
      fetchCustomersLoacation()
    }, []);
  
    const fetchSalesOverTimeData = async () => {
      axios.get(`https://datavisualizationbackend.onrender.com/salesovertime`)
        .then((res) => {
          setSalesOverTime(res.data);
        })
        .catch((err) => {
          console.log(`ERROR : ${err}`);
        });
    };
  
    const fetchSalesGrowthOverTime = async () => {
      axios.get(`https://datavisualizationbackend.onrender.com/salesgrowthovertime`)
        .then((res) => {
          setSalesGrowthOverTime(res.data);
        })
        .catch((err) => {
          console.log(`ERROR : ${err}`);
        });
    };
  
    const fetchNewCustomersOverTime = async () => {
      axios.get(`https://datavisualizationbackend.onrender.com/newcustomersovertime`)
        .then((res) => {
          setNewCustomersOverTime(res.data);
        })
        .catch((err) => {
          console.log(`ERROR : ${err}`);
        });
    };
  
    const fetchRepeatedCustomersOverTime = async () => {
      axios.get(`https://datavisualizationbackend.onrender.com/repetedcustomers`)
        .then((res) => {
          setRepeatedCustomersOverTime(res.data);
        })
        .catch((err) => {
          console.log(`ERROR : ${err}`);
        });
    };
  
    const fetchCustomersCohorts = async () => {
      axios.get(`https://datavisualizationbackend.onrender.com/customerscohorts`)
        .then((res) => {
          setCustomersCohorts(res.data);
        })
        .catch((err) => {
          console.log(`ERROR : ${err}`);
        });
    };
    

    const fetchCustomersLoacation = async () => {
      axios.get(`https://datavisualizationbackend.onrender.com/customerslocations`)
        .then((res) => {
          setCustomersonmap(res.data);
        })
        .catch((err) => {
          console.log(`ERROR : ${err}`);
        });
    }

    return (
        <>
            <div className="navDiv">
                <NavLink to="/" className={({ isActive }) => isActive ? "linkCompo activeRoute" : "linkCompo"}>
                    <div>Sales</div>
                </NavLink>
                <NavLink to="/salesgrowth" className={({ isActive }) => isActive ? "linkCompo activeRoute" : "linkCompo"}>
                    <div>Sales Growth</div>
                </NavLink>
                <NavLink to="/newcustomers" className={({ isActive }) => isActive ? "linkCompo activeRoute" : "linkCompo"}>
                    <div>New Customers</div>
                </NavLink>
                <NavLink to="/repeatedcustomer" className={({ isActive }) => isActive ? "linkCompo activeRoute" : "linkCompo"}>
                    <div>Repeated Customers</div>
                </NavLink>
                <NavLink to="/customerscohorts" className={({ isActive }) => isActive ? "linkCompo activeRoute" : "linkCompo"}>
                    <div>Customers Cohorts</div>
                </NavLink>
                <NavLink to="/customersonmap" className={({ isActive }) => isActive ? "linkCompo activeRoute" : "linkCompo"}>
                    <div>Customers On Map</div>
                </NavLink>
            </div>

            <Routes>
                <Route path="/" element={<SalesOverTime salesOverTime={salesOverTime} />} />
                <Route path="/salesgrowth" element={<SalesGrowthOverTime salesOverTime={salesGrowthOverTime} />} />
                <Route path="/newcustomers" element={<NewCustomersOverTime newCustomers={newCustomersOverTime} />} />
                <Route path="/repeatedcustomer" element={<RepeatedCustomers repeatedCustomers={repeatedCustomersOverTime} />} />
                <Route path="/customerscohorts" element={<CustomerCohorts customersCohorts={customersCohorts} />} />
                <Route path="/customersonmap" element={<CustomersOnMap locations={customersonmap} />} />
            </Routes>
        </>
    );
};

export default CommanUI;
