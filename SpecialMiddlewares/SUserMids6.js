const express = require('express');

const {SUserInput4Collection,SUserInput3Collection} = require('../mongodb');

const app = express();
// Display Superuser Total Other Banks Entries.

const STTOB = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput4Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Medium: "other banks",
                    The_Type: "Total Entries",
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

        const sttb = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sttb = sttb;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display Superuser Commission Entries for all  Tellers at all the branches

const SA1CMM = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput3Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    The_Type: "Commission",
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

        const sa1cm = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sa1cm = sa1cm;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SA2CMM = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput3Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    The_Type: "Commission",
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

        const sa2cm = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sa2cm = sa2cm;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB1CMM = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput3Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    The_Type: "Commission",
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

        const sb1cm = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sb1cm = sb1cm;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB2CMM = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput3Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    The_Type: "Commission",
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

        const sb2cm = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sb2cm = sb2cm;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP1CMM = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput3Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    The_Type: "Commission",
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

        const sp1cm = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sp1cm = sp1cm;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP2CMM = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput3Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    The_Type: "Commission",
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

        const sp2cm = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sp2cm = sp2cm;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Total Differences btn the Entries from the All Tellers and the Superuser

const SA1CMMDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sa1cm) || 0; 
        const B = parseFloat(req.AmountA1Comm) || 0; 

        const sa1cmdf = A - B;

        req.sa1cmdf = sa1cmdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SA2CMMDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sa2cm) || 0; 
        const B = parseFloat(req.AmountA2Comm) || 0; 

        const sa2cmdf = A - B;

        req.sa2cmdf = sa2cmdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB1CMMDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sb1cm) || 0; 
        const B = parseFloat(req.AmountB1Comm) || 0; 

        const sb1cmdf = A - B;

        req.sb1cmdf = sb1cmdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB2CMMDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sb2cm) || 0; 
        const B = parseFloat(req.AmountB2Comm) || 0; 

        const sb2cmdf = A - B;

        req.sb2cmdf = sb2cmdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP1CMMDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sp1cm) || 0; 
        const B = parseFloat(req.AmountP1Comm) || 0; 

        const sp1cmdf = A - B;

        req.sp1cmdf = sp1cmdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP2CMMDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sp2cm) || 0; 
        const B = parseFloat(req.AmountP2Comm) || 0; 

        const sp2cmdf = A - B;

        req.sp2cmdf = sp2cmdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {STTOB,SA1CMM,SA2CMM,SB1CMM,SB2CMM,SP1CMM,SP2CMM,SA1CMMDFF,SA2CMMDFF,SB1CMMDFF,SB2CMMDFF,SP1CMMDFF,SP2CMMDFF};