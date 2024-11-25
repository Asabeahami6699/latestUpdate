const express = require('express');

const app = express();

// Display the Total Withdrawals for all the Entries from the All Tellers

const TTMWD = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountA1MTN) || 0; 
        const B = parseFloat(req.AmountA2MTN) || 0; 
        const C = parseFloat(req.AmountB1MTN) || 0; 
        const D = parseFloat(req.AmountB2MTN) || 0;
        const E = parseFloat(req.AmountP1MTN) || 0; 
        const F = parseFloat(req.AmountP2MTN) || 0;  

        const ttmw = A + B + C + D + E + F;

        req.ttmw = ttmw;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTVWD = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountA1VW) || 0; 
        const B = parseFloat(req.AmountA2VW) || 0; 
        const C = parseFloat(req.AmountB1VW) || 0; 
        const D = parseFloat(req.AmountB2VW) || 0;
        const E = parseFloat(req.AmountP1VW) || 0; 
        const F = parseFloat(req.AmountP2VW) || 0;  

        const ttvw = A + B + C + D + E + F;

        req.ttvw = ttvw;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTSWD = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountA1susu) || 0; 
        const B = parseFloat(req.AmountA2susu) || 0; 
        const C = parseFloat(req.AmountB1susu) || 0; 
        const D = parseFloat(req.AmountB2susu) || 0;
        const E = parseFloat(req.AmountP1susu) || 0; 
        const F = parseFloat(req.AmountP2susu) || 0;  

        const ttsw = A + B + C + D + E + F;

        req.ttsw = ttsw;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTEWD = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountA1E) || 0; 
        const B = parseFloat(req.AmountA2E) || 0; 
        const C = parseFloat(req.AmountB1E) || 0; 
        const D = parseFloat(req.AmountB2E) || 0;
        const E = parseFloat(req.AmountP1E) || 0; 
        const F = parseFloat(req.AmountP2E) || 0;  

        const ttew = A + B + C + D + E + F;

        req.ttew = ttew;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTGWD = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountA1Gm) || 0; 
        const B = parseFloat(req.AmountA2Gm) || 0; 
        const C = parseFloat(req.AmountB1Gm) || 0; 
        const D = parseFloat(req.AmountB2Gm) || 0;
        const E = parseFloat(req.AmountP1Gm) || 0; 
        const F = parseFloat(req.AmountP2Gm) || 0;  

        const ttgw = A + B + C + D + E + F;

        req.ttgw = ttgw;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTAWD = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountA1Atm) || 0; 
        const B = parseFloat(req.AmountA2Atm) || 0; 
        const C = parseFloat(req.AmountB1Atm) || 0; 
        const D = parseFloat(req.AmountB2Atm) || 0;
        const E = parseFloat(req.AmountP1Atm) || 0; 
        const F = parseFloat(req.AmountP2Atm) || 0;  

        const ttaw = A + B + C + D + E + F;

        req.ttaw = ttaw;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTEZWD = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountA1Ezmm) || 0; 
        const B = parseFloat(req.AmountA2Ezmm) || 0; 
        const C = parseFloat(req.AmountB1Ezmm) || 0; 
        const D = parseFloat(req.AmountB2Ezmm) || 0;
        const E = parseFloat(req.AmountP1Ezmm) || 0; 
        const F = parseFloat(req.AmountP2Ezmm) || 0;  

        const ttezw = A + B + C + D + E + F;

        req.ttezw = ttezw;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTRWD = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountA1Remm) || 0; 
        const B = parseFloat(req.AmountA2Remm) || 0; 
        const C = parseFloat(req.AmountB1Remm) || 0; 
        const D = parseFloat(req.AmountB2Remm) || 0;
        const E = parseFloat(req.AmountP1Remm) || 0; 
        const F = parseFloat(req.AmountP2Remm) || 0;  

        const ttrw = A + B + C + D + E + F;

        req.ttrw = ttrw;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTCBK = async (req, res, next) => {
    try {
        const A = parseFloat(req.LoadingA1) || 0; 
        const B = parseFloat(req.LoadingA2) || 0; 
        const C = parseFloat(req.LoadingB1) || 0; 
        const D = parseFloat(req.LoadingB2) || 0;
        const E = parseFloat(req.LoadingP1) || 0; 
        const F = parseFloat(req.LoadingP2) || 0;  

        const ttcb = A + B + C + D + E + F;

        req.ttcb = ttcb;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTWCO = async (req, res, next) => {
    try {
        const A = parseFloat(req.TotalA1Cost) || 0; 
        const B = parseFloat(req.TotalA2Cost) || 0; 
        const C = parseFloat(req.TotalB1Cost) || 0; 
        const D = parseFloat(req.TotalB2Cost) || 0;
        const E = parseFloat(req.TotalP1Cost) || 0; 
        const F = parseFloat(req.TotalP2Cost) || 0;  

        const ttwc = A + B + C + D + E + F;

        req.ttwc = ttwc;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTPCR = async (req, res, next) => {
    try {
        const A = parseFloat(req.A1cashRm) || 0; 
        const B = parseFloat(req.A2cashRm) || 0; 
        const C = parseFloat(req.B1cashRm) || 0; 
        const D = parseFloat(req.B2cashRm) || 0;
        const E = parseFloat(req.P1cashRm) || 0; 
        const F = parseFloat(req.P2cashRm) || 0;  

        const ttcr = A + B + C + D + E + F;

        req.ttcr = ttcr;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTAMTW = async (req, res, next) => {
    try {
        const A = parseFloat(req.A1WAmount) || 0; 
        const B = parseFloat(req.A2WAmount) || 0; 
        const C = parseFloat(req.B1WAmount) || 0; 
        const D = parseFloat(req.B2WAmount) || 0;
        const E = parseFloat(req.P1WAmount) || 0; 
        const F = parseFloat(req.P2WAmount) || 0;  

        const ttatw = A + B + C + D + E + F;

        req.ttatw = ttatw;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTEXP = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountA1Exp) || 0; 
        const B = parseFloat(req.AmountA2Exp) || 0; 
        const C = parseFloat(req.AmountB1Exp) || 0; 
        const D = parseFloat(req.AmountB2Exp) || 0;
        const E = parseFloat(req.AmountP1Exp) || 0; 
        const F = parseFloat(req.AmountP2Exp) || 0;  

        const texp = A + B + C + D + E + F;

        req.texp = texp;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTCOM = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountA1Comm) || 0; 
        const B = parseFloat(req.AmountA2Comm) || 0; 
        const C = parseFloat(req.AmountB1Comm) || 0; 
        const D = parseFloat(req.AmountB2Comm) || 0;
        const E = parseFloat(req.AmountP1Comm) || 0; 
        const F = parseFloat(req.AmountP2Comm) || 0;  

        const tcom = A + B + C + D + E + F;

        req.tcom = tcom;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTACTW = async (req, res, next) => {
    try {
        const A = parseFloat(req.A1AWAmount) || 0; 
        const B = parseFloat(req.A2AWAmount) || 0; 
        const C = parseFloat(req.B1AWAmount) || 0; 
        const D = parseFloat(req.B2AWAmount) || 0;
        const E = parseFloat(req.P1AWAmount) || 0; 
        const F = parseFloat(req.P2AWAmount) || 0;  

        const ttact = A + B + C + D + E + F;

        req.ttact = ttact;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {TTMWD,TTVWD,TTSWD,TTEWD,TTGWD,TTAWD,TTEZWD,TTRWD,TTCBK,TTWCO,TTPCR,TTAMTW,TTEXP,TTCOM,TTACTW};