const express = require('express');

const { COverallColt,OperationalColt} = require('../mongodb');

const app = express();

// Timestamp calculation logic
const calculateTimestampRange = () => {
    const now = new Date();

    const startOfRange = new Date(now);
    startOfRange.setHours(19, 30, 0, 0); 
    if (now < startOfRange) {
        
        startOfRange.setDate(startOfRange.getDate() - 1);
    }

    const endOfRange = new Date(startOfRange);
    endOfRange.setDate(endOfRange.getDate() + 1);

    return { startOfRange, endOfRange };
};


const operational2 = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); 

        const result = await OperationalColt.aggregate([
            {
                $match: {
                    UserType: "Operational",
                    DocumentType: "Ecash Document",
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

        req.optTotalEcash = result.length > 0 ? result[0].totalAmount : 0;

        const A = parseFloat(req.optTotalEcash) || 0; 
        const B = parseFloat(req.opt1TotalAmount) || 0; 

        const optBalancing = A - B ;

        req.optBalancing  = parseFloat(optBalancing.toFixed(2));


        next(); 
    } catch (err) {
        console.error("Error processing operational documents:", err);
        res.status(500).send('Internal Server Error');
    }
};


const calculateDailySusuVault = async (req, res, next) => {
    try {

        const { startOfRange, endOfRange } = calculateTimestampRange();

        // Retrieve the latest doc for "PCash Doc" in "SUSU VAULT PREVIOUS" branch
        const latestDocType1 = await COverallColt.findOne(
            {
                Document: "PCash Doc",
                Branch: "SUSU VAULT PREVIOUS",
                Timestamp: {
                    $gte: startOfRange,
                    $lt: endOfRange,
                },
            },
            { Amount: 1 }
        ).sort({ Timestamp: -1 }).lean();

        const docType1Amount = latestDocType1?.Amount || 0;
        req.previousSusu = docType1Amount;

        // Fetch all SUSU Transaction Docs within the date range
        const docType2Docs = await COverallColt.find({
            Document: "SUSU Transaction Doc",
            Timestamp: {
                $gte: startOfRange,
                $lt: endOfRange,
            }
        }).lean();

        // Calculate totals for CREDIT, WALKING, MOBILISERS, and WITHDRAWALS
        let creditTotal = 0;
        let walkingTotal = 0;
        let mobilisersTotal = 0;
        let withdrawalsTotal = 0;

        // Sum up the amounts based on the description of each transaction
        docType2Docs.forEach(transaction => {
            const amount = transaction.Amount || 0;
            switch (transaction.Description) {
                case "CREDIT":
                    creditTotal += amount;
                    break;
                case "WALKING":
                    walkingTotal += amount;
                    break;
                case "MOBILISERS":
                    mobilisersTotal += amount;
                    break;
                case "WITHDRAWALS":
                    withdrawalsTotal += amount;
                    break;
                default:
                    break;
            }
        });

        // Calculate adjustedAmount as the total of CREDIT, WALKING, MOBILISERS minus WITHDRAWALS
        const totalDocType2Amount = creditTotal + walkingTotal + mobilisersTotal - withdrawalsTotal;
        const adjustedAmount = totalDocType2Amount - docType1Amount;

        req.adjustedAmount = adjustedAmount;
        next();
    } catch (error) {
        console.error("Error calculating adjusted amount:", error);
        res.status(500).send("Internal Server Error");
    }
};

const finalComputation = async (req, res, next) => {
    try {
        const A = parseFloat(req.ecobankTotal) || 0; 
        const B = parseFloat(req.momoTotal) || 0; 
        const C = parseFloat(req.otherBanksTotal) || 0; 
        const D = parseFloat(req.unsettledTotal) || 0; 
        const E = parseFloat(req.pcashTotal) || 0; 
        const F = parseFloat(req.totalPendingTransactions) || 0; 
        const G = parseFloat(req.repaymentTotal) || 0; 
        const H = parseFloat(req.totalReversals) || 0; 
        const I = parseFloat(req.givenoutTotal) || 0;
        const J = parseFloat(req.PExpensesTotal) || 0;
        const K = parseFloat(req.monthlyExpensesTotal) || 0;
        const P = parseFloat(req.adjustedAmount) || 0;

        const total1 = A + B + C + D + E + F + G + H + I + J + K + P;
        req.total1 = total1;

        const L = parseFloat(req.total1) || 0;
        const M = parseFloat(req.monthlyCommissionTotal) || 0;

        const finalClosingBln= L - M;
        req.finalClosingBln = finalClosingBln;

        const N = parseFloat(req.finalClosingBln) || 0;
        const O = parseFloat(req.openingBalance) || 0;

        const overage= N - O;
        req.overage = overage;

        const shortage= O - N;
        req.shortage = shortage;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Pcash:", err);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {operational2,calculateDailySusuVault,finalComputation};