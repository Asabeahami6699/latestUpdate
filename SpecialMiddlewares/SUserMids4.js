const express = require('express');

const {SUserInput5Collection,SUserInput4Collection,SBTransaction} = require('../mongodb');

const app = express();

// Display Superuser Total Ecobank Deposits Entries for all  Tellers at all the branches


const SA1CC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "calbank",
                    Teller_Type: "Teller-1",
                    The_Branch: "Aiyinase",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Amount" }
                }
            }
        ]);

        const sa1c = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sa1c = sa1c;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SA2CC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "calbank",
                    Teller_Type: "Teller-2",
                    The_Branch: "Aiyinase",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Amount" }
                }
            }
        ]);

        const sa2c = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sa2c = sa2c;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB1CC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "calbank",
                    Teller_Type: "Teller-1",
                    The_Branch: "Bogoso",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Amount" }
                }
            }
        ]);

        const sb1c = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sb1c = sb1c;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB2CC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "calbank",
                    Teller_Type: "Teller-2",
                    The_Branch: "Bogoso",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Amount" }
                }
            }
        ]);

        const sb2c = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sb2c = sb2c;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP1CC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "calbank",
                    Teller_Type: "Teller-1",
                    The_Branch: "Prestea",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Amount" }
                }
            }
        ]);

        const sp1c = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sp1c = sp1c;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP2CC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "calbank",
                    Teller_Type: "Teller-2",
                    The_Branch: "Prestea",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Amount" }
                }
            }
        ]);

        const sp2c = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sp2c = sp2c;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Total Differences btn the Entries from the All Tellers and the Superuser

const SA1CDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sa1c) || 0; 
        const B = parseFloat(req.AT1CtransferredAmount) || 0; 

        const sa1cdf = A - B;

        req.sa1cdff = sa1cdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SA2CDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sa2c) || 0; 
        const B = parseFloat(req.AT2CtransferredAmount) || 0; 

        const sa2cdf = A - B;

        req.sa2cdf = sa2cdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB1CDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sb1c) || 0; 
        const B = parseFloat(req.BT1CtransferredAmount) || 0; 

        const sb1cdf = A - B;

        req.sb1cdf = sb1cdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB2CDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sb2c) || 0; 
        const B = parseFloat(req.BT2CtransferredAmount) || 0; 

        const sb2cdf = A - B;

        req.sb2cdf = sb2cdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP1CDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sp1c) || 0; 
        const B = parseFloat(req.PT1CtransferredAmount) || 0; 

        const sp1cdf = A - B;

        req.sp1cdf = sp1cdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP2CDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sp2c) || 0; 
        const B = parseFloat(req.PT2CtransferredAmount) || 0; 

        const sp2cdf = A - B;

        req.sp2cdf = sp2cdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {SA1CC,SA2CC,SB1CC,SB2CC,SP1CC,SP2CC,SA1CDFF,SA2CDFF,SB1CDFF,SB2CDFF,SP1CDFF,SP2CDFF};