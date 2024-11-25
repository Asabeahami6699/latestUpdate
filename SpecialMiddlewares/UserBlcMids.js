const express = require('express');

const app = express();


const AT1TotalCost = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.AT1documentsCount) || 0; 
        const TotalFidelity = parseFloat(req.AT1documentsCountF) || 0; 
        const TotalEcobank = parseFloat(req.AT1documentsCountE) || 0;
        const TotalCalbank = parseFloat(req.AT1documentsCountC) || 0;
        const TotalOtherB = parseFloat( req.AT1documentsodCount) || 0;
        const TotalSusudocs= parseFloat(req.AT1documentsCountsusu) || 0;
        const TotalVoda= parseFloat(req.AT1documentsVCount) || 0;


        const AT1TotalCos = TotalCalbank + TotalEcobank + TotalFidelity + TotalMoMo + TotalOtherB + TotalSusudocs + TotalVoda;

        req.AT1TotalCos = AT1TotalCos;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


const AT1TotalDp = async (req, res, next) => {
    try {
        
        const InitPcash = parseFloat(req.AT1InitialPCash) || 0; 
        const PcashColtd = parseFloat(req.AT1totalColtdPcash) || 0; 
        const TotalTAmt = parseFloat(req.AT1TotalAmoutTrans) || 0; 

        const AT1TotalD = InitPcash + PcashColtd + TotalTAmt ;

        req.AT1TotalD = AT1TotalD;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

const AT2TotalCost = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.AT2documentsCount) || 0; 
        const TotalFidelity = parseFloat(req.AT2documentsCountF) || 0; 
        const TotalEcobank = parseFloat(req.AT2documentsCountE) || 0;
        const TotalCalbank = parseFloat(req.AT2documentsCountC) || 0;
        const TotalOtherB = parseFloat( req.AT2documentsodCount) || 0;
        const TotalSusudocs= parseFloat(req.AT2documentsCountsusu) || 0;
        const TotalVoda= parseFloat(req.AT2documentsVCount) || 0;


        const AT2TotalCos = TotalCalbank + TotalEcobank + TotalFidelity + TotalMoMo + TotalOtherB + TotalSusudocs + TotalVoda;

        req.AT2TotalCos = AT2TotalCos;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

const AT2TotalDp = async (req, res, next) => {
    try {
        
        const InitPcash = parseFloat(req.AT2InitialPCash) || 0; 
        const PcashColtd = parseFloat(req.AT2totalColtdPcash) || 0; 
        const TotalTAmt = parseFloat(req.AT2TotalAmoutTrans) || 0; 

        const AT2TotalD = InitPcash + PcashColtd + TotalTAmt ;

        req.AT2TotalD = AT2TotalD;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {AT1TotalCost,AT1TotalDp,AT2TotalCost,AT2TotalDp};