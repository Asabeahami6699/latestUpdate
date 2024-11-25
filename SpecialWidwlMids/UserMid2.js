const express = require('express');

const app = express();

// Display the Total Deposits for all the Entries from the All Tellers

const TTMDP = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1transferredAmount) || 0; 
        const B = parseFloat(req.AT2transferredAmount) || 0; 
        const C = parseFloat(req.BT1transferredAmount) || 0; 
        const D = parseFloat(req.BT2transferredAmount) || 0;
        const E = parseFloat(req.PT1transferredAmount) || 0; 
        const F = parseFloat(req.PT2transferredAmount) || 0;  

        const ttmd = A + B + C + D + E + F;

        req.ttmd = ttmd;

        next();
    } catch (err) {
        console.error("Error calculating all tellers total deposits transactions:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTVDP = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1VodatransferredAmount) || 0; 
        const B = parseFloat(req.AT2VodatransferredAmount) || 0; 
        const C = parseFloat(req.BT1VodatransferredAmount) || 0; 
        const D = parseFloat(req.BT2VodatransferredAmount) || 0;
        const E = parseFloat(req.PT1VodatransferredAmount) || 0; 
        const F = parseFloat(req.PT2VodatransferredAmount) || 0;  

        const ttvd = A + B + C + D + E + F;

        req.ttvd = ttvd;

        next();
    } catch (err) {
        console.error("Error calculating all tellers total deposits transactions:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTSDP = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1SutransferredAmount) || 0; 
        const B = parseFloat(req.AT2SutransferredAmount) || 0; 
        const C = parseFloat(req.BT1SutransferredAmount) || 0; 
        const D = parseFloat(req.BT2SutransferredAmount) || 0;
        const E = parseFloat(req.PT1SutransferredAmount) || 0; 
        const F = parseFloat(req.PT2SutransferredAmount) || 0;  

        const ttsd = A + B + C + D + E + F;

        req.ttsd = ttsd;

        next();
    } catch (err) {
        console.error("Error calculating all tellers total deposits transactions:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTEDP = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1EtransferredAmount) || 0; 
        const B = parseFloat(req.AT2EtransferredAmount) || 0; 
        const C = parseFloat(req.BT1EtransferredAmount) || 0; 
        const D = parseFloat(req.BT2EtransferredAmount) || 0;
        const E = parseFloat(req.PT1EtransferredAmount) || 0; 
        const F = parseFloat(req.PT2EtransferredAmount) || 0;  

        const tted = A + B + C + D + E + F;

        req.tted = tted;

        next();
    } catch (err) {
        console.error("Error calculating all tellers total deposits transactions:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTFDP = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1FtransferredAmount) || 0; 
        const B = parseFloat(req.AT2FtransferredAmount) || 0; 
        const C = parseFloat(req.BT1FtransferredAmount) || 0; 
        const D = parseFloat(req.BT2FtransferredAmount) || 0;
        const E = parseFloat(req.PT1FtransferredAmount) || 0; 
        const F = parseFloat(req.PT2FtransferredAmount) || 0;  

        const ttfd = A + B + C + D + E + F;

        req.ttfd = ttfd;

        next();
    } catch (err) {
        console.error("Error calculating all tellers total deposits transactions:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTCDP = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1CtransferredAmount) || 0; 
        const B = parseFloat(req.AT2CtransferredAmount) || 0; 
        const C = parseFloat(req.BT1CtransferredAmount) || 0; 
        const D = parseFloat(req.BT2CtransferredAmount) || 0;
        const E = parseFloat(req.PT1CtransferredAmount) || 0; 
        const F = parseFloat(req.PT2CtransferredAmount) || 0;  

        const ttcd = A + B + C + D + E + F;

        req.ttcd = ttcd;

        next();
    } catch (err) {
        console.error("Error calculating all tellers total deposits transactions:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTODP = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1ObtransferredAmount) || 0; 
        const B = parseFloat(req.AT2ObtransferredAmount) || 0; 
        const C = parseFloat(req.BT1ObtransferredAmount) || 0; 
        const D = parseFloat(req.BT2ObtransferredAmount) || 0;
        const E = parseFloat(req.PT1ObtransferredAmount) || 0; 
        const F = parseFloat(req.PT2ObtransferredAmount) || 0;  

        const ttod = A + B + C + D + E + F;

        req.ttod = ttod;

        next();
    } catch (err) {
        console.error("Error calculating all tellers total deposits transactions:", err);
        res.status(500).send('Internal Server Error');
    }
};


const TTDCO = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1TotalCostumers) || 0; 
        const B = parseFloat(req.AT2TotalCostumers) || 0; 
        const C = parseFloat(req.BT1TotalCostumers) || 0; 
        const D = parseFloat(req.BT2TotalCostumers) || 0;
        const E = parseFloat(req.PT1TotalCostumers) || 0; 
        const F = parseFloat(req.PT2TotalCostumers) || 0;  

        const ttdc = A + B + C + D + E + F;

        req.ttdc = ttdc;

        next();
    } catch (err) {
        console.error("Error calculating all tellers total deposits transactions:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTAFR = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1TotalAmoutTrans) || 0; 
        const B = parseFloat(req.AT2TotalAmoutTrans) || 0; 
        const C = parseFloat(req.BT1TotalAmoutTrans) || 0; 
        const D = parseFloat(req.BT2TotalAmoutTrans) || 0;
        const E = parseFloat(req.PT1TotalAmoutTrans) || 0; 
        const F = parseFloat(req.PT2TotalAmoutTrans) || 0;  

        const ttaf = A + B + C + D + E + F;

        req.ttaf = ttaf;

        next();
    } catch (err) {
        console.error("Error calculating all tellers total deposits transactions:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTPCC = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1totalColtdPcash) || 0; 
        const B = parseFloat(req.AT2totalColtdPcash) || 0; 
        const C = parseFloat(req.BT1totalColtdPcash) || 0; 
        const D = parseFloat(req.BT2totalColtdPcash) || 0;
        const E = parseFloat(req.PT1totalColtdPcash) || 0; 
        const F = parseFloat(req.PT2totalColtdPcash) || 0;  

        const ttcc = A + B + C + D + E + F;

        req.ttcc = ttcc;

        next();
    } catch (err) {
        console.error("Error calculating all tellers total deposits transactions:", err);
        res.status(500).send('Internal Server Error');
    }
};

const TTINT = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1InitialPCash) || 0; 
        const B = parseFloat(req.AT2InitialPCash) || 0; 
        const C = parseFloat(req.BT1InitialPCash) || 0; 
        const D = parseFloat(req.BT2InitialPCash) || 0;
        const E = parseFloat(req.PT1InitialPCash) || 0; 
        const F = parseFloat(req.PT2InitialPCash) || 0;  

        const ttin = A + B + C + D + E + F;

        req.ttin = ttin;

        next();
    } catch (err) {
        console.error("Error calculating all tellers total deposits transactions:", err);
        res.status(500).send('Internal Server Error');
    }
};


const TTDPT = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1TTotalcPcash) || 0; 
        const B = parseFloat(req.AT2TTotalcPcash) || 0; 
        const C = parseFloat(req.BT1TTotalcPcash) || 0; 
        const D = parseFloat(req.BT2TTotalcPcash) || 0;
        const E = parseFloat(req.PT1TTotalcPcash) || 0; 
        const F = parseFloat(req.PT2TTotalcPcash) || 0;  

        const ttdp = A + B + C + D + E + F;

        req.ttdp = ttdp;

        next();
    } catch (err) {
        console.error("Error calculating all tellers total deposits transactions:", err);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {TTMDP,TTVDP,TTSDP,TTEDP,TTFDP,TTCDP,TTODP,TTDCO,TTAFR,TTPCC,TTINT,TTDPT};