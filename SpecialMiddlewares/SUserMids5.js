const express = require('express');

const {SUserInput4Collection,SBTransaction} = require('../mongodb');

const app = express();

// Display Superuser Total Ecobank Deposits Entries for all  Tellers at all the branches


const SA1OC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "other banks",
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

        const sa1o = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sa1o = sa1o;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SA2OC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "other banks",
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

        const sa2o = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sa2o = sa2o;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB1OC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "other banks",
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

        const sb1o = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sb1c = sb1o;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB2OC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "other banks",
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

        const sb2o = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sb2o = sb2o;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP1OC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "other banks",
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

        const sp1o = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sp1o = sp1o;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP2OC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "other banks",
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

        const sp2o = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sp2o = sp2o;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Total Differences btn the Entries from the All Tellers and the Superuser

const SA1ODFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sa1o) || 0; 
        const B = parseFloat(req.AT1ObtransferredAmount) || 0; 

        const sa1odf = A - B;

        req.sa1odf = sa1odf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SA2ODFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sa2o) || 0; 
        const B = parseFloat(req.AT2ObtransferredAmount) || 0; 

        const sa2odf = A - B;

        req.sa2odf = sa2odf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB1ODFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sb1c) || 0; 
        const B = parseFloat(req.BT1ObtransferredAmount) || 0; 

        const sb1odf = A - B;

        req.sb1odf = sb1odf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB2ODFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sb2o) || 0; 
        const B = parseFloat(req.BT2ObtransferredAmount) || 0; 

        const sb2odf = A - B;

        req.sb2odf = sb2odf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP1ODFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sp1o) || 0; 
        const B = parseFloat(req.PT1ObtransferredAmount) || 0; 

        const sp1odf = A - B;

        req.sp1odf = sp1odf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP2ODFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sp2o) || 0; 
        const B = parseFloat(req.PT2ObtransferredAmount) || 0; 

        const sp2odf = A - B;

        req.sp2odf = sp2odf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {SA1OC,SA2OC,SB1OC,SB2OC,SP1OC,SP2OC,SA1ODFF,SA2ODFF,SB1ODFF,SB2ODFF,SP1ODFF,SP2ODFF};