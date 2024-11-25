const express = require('express');

const app = express();

const AccTExpA = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountA1Exp) || 0; 
        const B = parseFloat(req.AmountA2Exp) || 0; 

        const actexpa = A + B ;

        req.actexpa = actexpa;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Pcash:", err);
        res.status(500).send('Internal Server Error');
    }
};

const AccTExpB = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountB1Exp) || 0; 
        const B = parseFloat(req.AmountB2Exp) || 0; 

        const actexpb = A + B ;

        req.actexpb = actexpb;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Pcash:", err);
        res.status(500).send('Internal Server Error');
    }
};

const AccTExpP = async (req, res, next) => {
    try {
        const A = parseFloat(req.AmountP1Exp) || 0; 
        const B = parseFloat(req.AmountP2Exp) || 0; 

        const actexpp = A + B ;

        req.actexpp = actexpp;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Pcash:", err);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {AccTExpA,AccTExpB,AccTExpP};