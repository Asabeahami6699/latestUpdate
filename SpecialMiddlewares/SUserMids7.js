const express = require('express');

const app = express();

// Display the Total MTN MOMO Differences btn the Entries from the All Tellers and the Superuser

const SA1MDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sa1mo) || 0; 
        const B = parseFloat(req.AT1transferredAmount) || 0; 

        const sa1mdf = A - B;

        req.sa1mdf = sa1mdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SA2MDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sa2mo) || 0; 
        const B = parseFloat(req.AT2transferredAmount) || 0; 

        const sa2mdf = A - B;

        req.sa2mdf = sa2mdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB1MDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sb1mo) || 0; 
        const B = parseFloat(req.BT1transferredAmount) || 0; 

        const sb1mdf = A - B;

        req.sb1mdf = sb1mdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB2MDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sb2mo) || 0; 
        const B = parseFloat(req.BT2transferredAmount) || 0; 

        const sb2mdf = A - B;

        req.sb2mdf = sb2mdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP1MDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sp1mo) || 0; 
        const B = parseFloat(req.PT1transferredAmount) || 0; 

        const sp1mdf = A - B;

        req.sp1mdf = sp1mdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP2MDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sp2mo) || 0; 
        const B = parseFloat(req.PT2transferredAmount) || 0; 

        const sp2mdf = A - B;

        req.sp2mdf = sp2mdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Final Balancing for the Superuser

const SCBLC = async (req, res, next) => {
    try {
        const A = parseFloat(req.Cobl) || 0; 
        const B = parseFloat(req.Cecas) || 0;
        const C = parseFloat(req.Ctfa) || 0; 

        const spcbl = A + B - C;

        req.spcbl  = parseFloat(spcbl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating the balancing for the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SMBLC = async (req, res, next) => {
    try {
        const A = parseFloat(req.Mobcl) || 0; 
        const B = parseFloat(req.Ecash) || 0;
        const C = parseFloat(req.Mtfa) || 0; 
        const D = parseFloat(req.mct) || 0;

        const spmbl = A + B -C - D;

        req.spmbl  = parseFloat(spmbl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating the balancing for the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SFBLC = async (req, res, next) => {
    try {
        const A = parseFloat(req.Fobl) || 0; 
        const B = parseFloat(req.Fecas) || 0;
        const C = parseFloat(req.Ftfa) || 0; 

        const spfbl = A + B -C;

        req.spfbl  = parseFloat(spfbl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating the balancing for the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SE1BLC = async (req, res, next) => {
    try {
        const A = parseFloat(req.E1obl) || 0; 
        const B = parseFloat(req.E1cas) || 0;
        const C = parseFloat(req.E1ot) || 0; 
        const D = parseFloat(req.E1tfa) || 0; 
        const E= parseFloat(req.commissions.ecobank54) || 0; 

        const se1bl = A + B + C - D - E;

        req.se1bl  = parseFloat(se1bl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating the balancing for the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SE2BLC = async (req, res, next) => {
    try {
        const A = parseFloat(req.E2obl) || 0; 
        const B = parseFloat(req.E2cas) || 0;
        const C = parseFloat(req.E2ot) || 0; 
        const D = parseFloat(req.E2tfa) || 0;
        const E= parseFloat(req.commissions.ecobank20) || 0; 

        const se2bl = A + B + C - D - E;

        req.se2bl  = parseFloat(se2bl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating the balancing for the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SE3BLC = async (req, res, next) => {
    try {
        const A = parseFloat(req.E3obl) || 0; 
        const B = parseFloat(req.E3cas) || 0;
        const C = parseFloat(req.E3ot) || 0; 
        const D = parseFloat(req.E3tfa) || 0;
        const E= parseFloat(req.commissions.ecobank10) || 0; 

        const se3bl = A + B + C - D - E;

        req.se3bl  = parseFloat(se3bl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating the balancing for the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SE4BLC = async (req, res, next) => {
    try {
        const A = parseFloat(req.E4obl) || 0; 
        const B = parseFloat(req.E4cas) || 0;
        const C = parseFloat(req.E4ot) || 0; 
        const D = parseFloat(req.E4tfa) || 0;
        const E= parseFloat(req.commissions.ecobank80) || 0; 

        const se4bl = A + B + C - D - E;

        req.se4bl  = parseFloat(se4bl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating the balancing for the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {SA1MDFF,SA2MDFF,SB1MDFF,SB2MDFF,SP1MDFF,SP2MDFF,SCBLC,SMBLC,SFBLC,SE1BLC,SE2BLC,SE3BLC,SE4BLC};