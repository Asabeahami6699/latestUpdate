const express = require('express');

const {SUserInput5Collection,SUserInput4Collection,SBTransaction} = require('../mongodb');

const app = express();

// Display Superuser Total Ecobank Deposits Entries for all  Tellers at all the branches


const SA1EC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "ecobank",
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

        const sa1e = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sa1e = sa1e;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SA2EC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "ecobank",
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

        const sa2e = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sa2e = sa2e;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB1EC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "ecobank",
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

        const sb1e = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sb1e = sb1e;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB2EC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "ecobank",
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

        const sb2e = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sb2e = sb2e;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP1EC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "ecobank",
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

        const sp1e = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sp1e = sp1e;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP2EC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "ecobank",
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

        const sp2e = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sp2e = sp2e;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Total Differences btn the Entries from the All Tellers and the Superuser

const SA1EDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sa1e) || 0; 
        const B = parseFloat(req.AT1EtransferredAmount) || 0; 

        const sa1edf = A - B;

        req.sa1edf = sa1edf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SA2EDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sa2e) || 0; 
        const B = parseFloat(req.AT2EtransferredAmount) || 0; 

        const sa2edf = A - B;

        req.sa2edf = sa2edf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB1EDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sb1e) || 0; 
        const B = parseFloat(req.BT1EtransferredAmount) || 0; 

        const sb1edf = A - B;

        req.sb1edf = sb1edf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB2EDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sb2e) || 0; 
        const B = parseFloat(req.BT2EtransferredAmount) || 0; 

        const sb2edf = A - B;

        req.sb2edf = sb2edf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP1EDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sp1e) || 0; 
        const B = parseFloat(req.PT1EtransferredAmount) || 0; 

        const sp1edf = A - B;

        req.sp1edf = sp1edf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP2EDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sp2e) || 0; 
        const B = parseFloat(req.PT2EtransferredAmount) || 0; 

        const sp2edf = A - B;

        req.sp2edf = sp2edf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {SA1EC,SA2EC,SB1EC,SB2EC,SP1EC,SP2EC,SA1EDFF,SA2EDFF,SB1EDFF,SB2EDFF,SP1EDFF,SP2EDFF};