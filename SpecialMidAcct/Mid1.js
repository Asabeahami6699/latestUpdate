const express = require('express');

const app = express();

const AccTPcash1 = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT1InitialPCash) || 0; 
        const B = parseFloat(req.AT1totalColtdPcash) || 0; 

        const acpch1 = A + B ;

        req.acpch1 = acpch1;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Pcash:", err);
        res.status(500).send('Internal Server Error');
    }
};

const AccTPcash2 = async (req, res, next) => {
    try {
        const A = parseFloat(req.AT2InitialPCash) || 0; 
        const B = parseFloat(req.AT2totalColtdPcash) || 0; 

        const acpch2 = A + B ;

        req.acpch2 = acpch2;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Pcash:", err);
        res.status(500).send('Internal Server Error');
    }
};

const AccTPcash3 = async (req, res, next) => {
    try {
        const A = parseFloat(req.BT1InitialPCash) || 0; 
        const B = parseFloat(req.BT1totalColtdPcash) || 0; 

        const acpch3 = A + B ;

        req.acpch3 = acpch3;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Pcash:", err);
        res.status(500).send('Internal Server Error');
    }
};


const AccTPcash4 = async (req, res, next) => {
    try {
        const A = parseFloat(req.BT2InitialPCash) || 0; 
        const B = parseFloat(req.BT2totalColtdPcash) || 0; 

        const acpch4 = A + B ;

        req.acpch4 = acpch4;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Pcash:", err);
        res.status(500).send('Internal Server Error');
    }
};

const AccTPcash5 = async (req, res, next) => {
    try {
        const A = parseFloat(req.PT1InitialPCash) || 0; 
        const B = parseFloat(req.PT1totalColtdPcash ) || 0; 

        const acpch5 = A + B ;

        req.acpch5 = acpch5;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Pcash", err);
        res.status(500).send('Internal Server Error');
    }
};

const AccTPcash6 = async (req, res, next) => {
    try {
        const A = parseFloat(req.PT2InitialPCash) || 0; 
        const B = parseFloat(req.PT2totalColtdPcash) || 0; 

        const acpch6 = A + B ;

        req.acpch6 = acpch6;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Pcash", err);
        res.status(500).send('Internal Server Error');
    }
};

// Total of all of them
const AccPcashTl = async (req, res, next) => {
    try {
        const A = parseFloat(req.acpch1) || 0; 
        const B = parseFloat(req.acpch2) || 0; 
        const C = parseFloat(req.acpch3) || 0;
        const D = parseFloat(req.acpch4) || 0;
        const E = parseFloat(req.acpch5) || 0;
        const F = parseFloat(req.acpch6) || 0;

        const acpchtl = A + B + C + D + E + F;

        req.acpchtl = acpchtl;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Pcash:", err);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {AccTPcash1,AccTPcash2,AccTPcash3,AccTPcash4,AccTPcash5,AccTPcash6,AccPcashTl};