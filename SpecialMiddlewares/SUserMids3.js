const express = require('express');

const {SUserInput4Collection,SBTransaction} = require('../mongodb');

const app = express();

// Display Superuser Total Fidelity Deposits Entries for all  Tellers at all the branches


const SA1FC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "fidelity",
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

        const sa1f = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sa1f = sa1f;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SA2FC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "fidelity",
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

        const sa2f = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sa2f = sa2f;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB1FC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "fidelity",
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

        const sb1f = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sb1f = sb1f;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB2FC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "fidelity",
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

        const sb2f = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sb2f = sb2f;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP1FC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "fidelity",
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

        const sp1f = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sp1f = sp1f;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP2FC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "fidelity",
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

        const sp2f = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sp2f = sp2f;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Total Differences btn the Entries from the All Tellers and the Superuser

const SA1FDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sa1f) || 0; 
        const B = parseFloat(req.AT1FtransferredAmount) || 0; 

        const sa1fdf = A - B;

        req.sa1fdf = sa1fdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SA2FDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sa2f) || 0; 
        const B = parseFloat(req.AT2FtransferredAmount) || 0; 

        const sa2fdf = A - B;

        req.sa2fdf = sa2fdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB1FDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sb1f) || 0; 
        const B = parseFloat(req.BT1FtransferredAmount) || 0; 

        const sb1fdf = A - B;

        req.sb1fdf = sb1fdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SB2FDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sb2f) || 0; 
        const B = parseFloat(req.BT2FtransferredAmount) || 0; 

        const sb2fdf = A - B;

        req.sb2fdf = sb2fdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP1FDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sp1f) || 0; 
        const B = parseFloat(req.PT1FtransferredAmount) || 0; 

        const sp1fdf = A - B;

        req.sp1fdf = sp1fdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};

const SP2FDFF = async (req, res, next) => {
    try {
        const A = parseFloat(req.sp2f) || 0; 
        const B = parseFloat(req.PT2FtransferredAmount) || 0; 

        const sp2fdf = A - B;

        req.sp2fdf = sp2fdf;

        next();
    } catch (err) {
        console.error("Error calculating the balancing btn the teller and the superuser:", err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {SA1FC,SA2FC,SB1FC,SB2FC,SP1FC,SP2FC,SA1FDFF,SA2FDFF,SB1FDFF,SB2FDFF,SP1FDFF,SP2FDFF};