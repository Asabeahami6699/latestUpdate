const express = require('express');

const { SUserInput5Collection,SUserInput3Collection } = require('../mongodb');

const app = express();

// Display the MoMo Charges for A1
const MoChA1 = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput3Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Teller_Type: "Teller-1",
                    The_Branch: "Aiyinase",
                    The_Type : "Charges(momo)",
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

        const mcA1 = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.mcA1 = mcA1;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo Charges for A2
const MoChA2 = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput3Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Teller_Type: "Teller-2",
                    The_Branch: "Aiyinase",
                    The_Type : "Charges(momo)",
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

        const mcA2 = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.mcA2 = mcA2;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo Charges for B1
const MoChB1 = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput3Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Teller_Type: "Teller-1",
                    The_Branch: "Bogoso",
                    The_Type : "Charges(momo)",
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

        const mcB1 = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.mcB1 = mcB1;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo Charges for B2
const MoChB2 = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput3Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Teller_Type: "Teller-2",
                    The_Branch: "Bogoso",
                    The_Type : "Charges(momo)",
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

        const mcB2 = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.mcB2 = mcB2;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo Charges for P1
const MoChP1 = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput3Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Teller_Type: "Teller-1",
                    The_Branch: "Prestea",
                    The_Type : "Charges(momo)",
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

        const mcP1 = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.mcP1 = mcP1;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo Charges for P2
const MoChP2 = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput3Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Teller_Type: "Teller-2",
                    The_Branch: "Prestea",
                    The_Type : "Charges(momo)",
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

        const mcP2 = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.mcP2 = mcP2;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Total of all of them
const MoChT = async (req, res, next) => {
    try {
        const A = parseFloat(req.mcA1) || 0; 
        const B = parseFloat(req.mcA2) || 0; 
        const C = parseFloat(req.mcB1) || 0;
        const D = parseFloat(req.mcB2) || 0;
        const E = parseFloat(req.mcP1) || 0;
        const F = parseFloat(req.mcP2) || 0;

        const mct = A + B + C + D + E + F;

        req.mct = mct;

        next();
    } catch (err) {
        console.error("Error calculating Total MTN MoMo Charges:", err);
        res.status(500).send('Internal Server Error');
    }
};

const interBValues = async (req, res, next) => {
    try {
        const startOfRange = new Date();
        startOfRange.setHours(0, 0, 0, 0);
        const endOfRange = new Date(startOfRange.getTime() + 24 * 60 * 60 * 1000);

        const transactions = await SUserInput5Collection.find({
            DocumentType: "Interbanks Doc",
            Timestamp: { $gte: startOfRange, $lt: endOfRange },
        }).lean();

        const accountSummary = {
            54: { Amount: 0, Commission: 0 },
            20: { Amount: 0, Commission: 0 },
            10: { Amount: 0, Commission: 0 },
            80: { Amount: 0, Commission: 0 },
            Total: { Amount: 0, Commission: 0 },
        };

        transactions.forEach(transaction => {
            const accountNumber = parseInt(transaction.Account.split(" ")[1], 10); // Extract number from "ecobank X"
            if (accountSummary[accountNumber]) {
                accountSummary[accountNumber].Amount += transaction.Amount || 0;
                accountSummary[accountNumber].Commission += transaction.Commission || 0;
                accountSummary.Total.Amount += transaction.Amount || 0;
                accountSummary.Total.Commission += transaction.Commission || 0;
            }
        });

        req.accountSummary = accountSummary;

        // Attach only commission values to request object
        req.commissions = {
            ecobank54: accountSummary[54].Commission,
            ecobank20: accountSummary[20].Commission,
            ecobank10: accountSummary[10].Commission,
            ecobank80: accountSummary[80].Commission,
            totalCommission: accountSummary.Total.Commission,
        };

        next();
    } catch (error) {
        console.error("Error calculating table values:", error);
        res.status(500).send("Internal Server Error");
    }
};



module.exports = {MoChA1,MoChA2,MoChB1,MoChB2,MoChP1,MoChP2,MoChT,interBValues};