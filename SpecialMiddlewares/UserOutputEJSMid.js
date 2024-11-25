const express = require('express');

const app = express();

// Display the Total All Transactions Costumers
const TotalTranscCostumers = async (req, res, next) => {
    try {
        
        const TotalWithdrawals = parseFloat(req.TotalWCostumers) || 0; 
        const TotalDeposits = parseFloat(req.TotalCostumers) || 0;

        const TotalTCostumers = TotalWithdrawals + TotalDeposits;

        req.TotalTCostumers = TotalTCostumers;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Balancing
const TotalBalancing = async (req, res, next) => {
    try {
        const TotalWithdrawals = parseFloat(req.ActualWAmount) || 0; 
        const TotalDeposits = parseFloat(req.TTotalcPcash) || 0; 

        const TotalTBalance = TotalDeposits - TotalWithdrawals;

        // Round to 2 decimal places after the calculation
        req.TotalTBalance = parseFloat(TotalTBalance.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display  All Tellers Total All Transactions and Costumers

const A1ACOST = async (req, res, next) => {
    try {
        

        const TotalDeposits = parseFloat(req.AT1TotalCostumers) || 0;
        const TotalWithdrawals = parseFloat(req.TotalA1Cost) || 0; 

        const a1acos = TotalWithdrawals + TotalDeposits;

        req.a1acos = a1acos;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

const A1BLC = async (req, res, next) => {
    try {
        const TotalDeposits = parseFloat(req.AT1TTotalcPcash) || 0; 
        const TotalWithdrawals = parseFloat(req.A1AWAmount) || 0; 

        const a1bl = TotalDeposits - TotalWithdrawals;

        req.a1bl = parseFloat(a1bl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


const A2ACOST = async (req, res, next) => {
    try {
        
        const TotalWithdrawals = parseFloat(req.TotalA2Cost) || 0; 
        const TotalDeposits = parseFloat(req.AT2TotalCostumers) || 0;

        const a2acos = TotalWithdrawals + TotalDeposits;

        req.a2acos = a2acos;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

const A2BLC = async (req, res, next) => {
    try {
        const TotalDeposits = parseFloat(req.AT2TTotalcPcash) || 0; 
        const TotalWithdrawals = parseFloat(req.A2AWAmount) || 0; 

        const a2bl = TotalDeposits - TotalWithdrawals;

        req.a2bl = parseFloat(a2bl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


const B1ACOST = async (req, res, next) => {
    try {
        
        const TotalDeposits = parseFloat(req.BT1TotalCostumers) || 0;
        const TotalWithdrawals = parseFloat(req.TotalB1Cost) || 0; 

        const b1acos = TotalWithdrawals + TotalDeposits;

        req.b1acos = b1acos;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

const B1BLC = async (req, res, next) => {
    try {
        const TotalDeposits = parseFloat(req.BT1TTotalcPcash) || 0;
        const TotalWithdrawals = parseFloat(req.B1AWAmount) || 0;  

        const b1bl = TotalDeposits - TotalWithdrawals;

        req.b1bl = parseFloat(b1bl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


const B2ACOST = async (req, res, next) => {
    try {
        
        const TotalDeposits = parseFloat(req.BT2TotalCostumers) || 0;
        const TotalWithdrawals = parseFloat(req.TotalB2Cost) || 0; 

        const b2acos = TotalWithdrawals + TotalDeposits;

        req.b2acos = b2acos;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

const B2BLC = async (req, res, next) => {
    try {
        const TotalDeposits = parseFloat(req.BT2TTotalcPcash) || 0;
        const TotalWithdrawals = parseFloat(req.B2AWAmount) || 0;  

        const b2bl = TotalDeposits - TotalWithdrawals;

        req.b2bl = parseFloat(b2bl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


const P1ACOST = async (req, res, next) => {
    try {
        
        const TotalDeposits = parseFloat(req.PT1TotalCostumers) || 0;
        const TotalWithdrawals = parseFloat(req.TotalP1Cost) || 0; 

        const p1acos = TotalWithdrawals + TotalDeposits;

        req.p1acos = p1acos;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

const P1BLC = async (req, res, next) => {
    try {
        const TotalDeposits = parseFloat(req.PT1TTotalcPcash) || 0; 
        const TotalWithdrawals = parseFloat(req.P1AWAmount) || 0; 

        const p1bl = TotalDeposits - TotalWithdrawals;

        req.p1bl = parseFloat(p1bl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


const P2ACOST = async (req, res, next) => {
    try {
        
        const TotalWithdrawals = parseFloat(req.TotalP2Cost) || 0; 
        const TotalDeposits = parseFloat(req.PT2TotalCostumers) || 0;

        const p2acos = TotalWithdrawals + TotalDeposits;

        req.p2acos = p2acos;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

const P2BLC = async (req, res, next) => {
    try {
        const TotalWithdrawals = parseFloat(req.P2AWAmount) || 0; 
        const TotalDeposits = parseFloat(req.PT2TTotalcPcash) || 0; 

        const p2bl = TotalDeposits - TotalWithdrawals;

        req.p2bl = parseFloat(p2bl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {TotalTranscCostumers,TotalBalancing,A1ACOST,A1BLC,A2ACOST,A2BLC,B1ACOST,B1BLC,B2ACOST,B2BLC,P1ACOST,P1BLC,P2ACOST,P2BLC};
    