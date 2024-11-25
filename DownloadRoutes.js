const express = require('express');
const xlsx = require('node-xlsx');
const {Transaction,UserMoMoCollection ,UserInputsCollection,
 UserDInputsCollection,SBTransaction ,SUserInput3Collection ,SuperuserInputsCollection,
OthersWithdrawalCollection,SusuDocs,TellerInput3,SUserInput4Collection,SUserInput5Collection,
AllDocsUniqueIDs } = require('./mongodb');
const fs = require('fs');
const path = require('path');

const app = express();

function createDateRange(startDate, endDate) {
    // Parse dates in format YYYY-MM-DD
    const start = new Date(`${startDate}T00:00:00Z`);
    const end = new Date(`${endDate}T23:59:59.999Z`);

    return { start, end };
}


// Convert documents to a format suitable for node-xlsx
function docsToSheetData(docs) {
    if (docs.length === 0) return [];

    const headers = Object.keys(docs[0].toObject());
    const data = docs.map(doc => Object.values(doc.toObject()));
    return [headers, ...data];
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/')
};

// Route to download Tellers Deposit Transactions
app.post('/download1', async (req, res) => {
    try {
        const { branch, tellertype, 'start-date': startDate, 'end-date': endDate } = req.body;

        const { start, end } = createDateRange(startDate, endDate);

        const baseFilters = {
            TheBranch: branch,
            TellerType: tellertype,
            Description: "Deposit",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters1 = {
            The_Branch: branch,
            Teller_Type: tellertype,
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters2 = {
            The_Branch: branch,
            Teller_Type: tellertype,
            Description: "Deposit",
            Timestamp: { $gte: start, $lte: end }
        };

        const userMoMoDocs = await UserMoMoCollection.find({ ...baseFilters, MoMo: { $in: ["mtn", "Voda"] } });
        const transactionDocs = await Transaction.find({ ...baseFilters, Bank: { $in: ["fidelity", "ecobank", "Calbank","Other Banks"] } });
        const userInputsDocs = await UserInputsCollection.find({ ...baseFilters1, TheType: "Initial Physical Cash" });
        const userDInputsDocs = await UserDInputsCollection.find({ ...baseFilters1, TheType: "Physical Cash Collected" });
        const SuSuDocs = await SusuDocs.find({ ...baseFilters2 });

        // Prepare data for the workbook
        const sheets = [
            { name: 'MoMo(Deposit)', data: docsToSheetData(userMoMoDocs) },
            { name: 'Banks(Deposit)', data: docsToSheetData(transactionDocs) },
            { name: 'IntialPcash', data: docsToSheetData(userInputsDocs) },
            { name: 'PcashColted', data: docsToSheetData(userDInputsDocs) },
            { name: 'SuSuDocs(Deposit)', data: docsToSheetData(SuSuDocs) }
        ];

        // Generate Excel file
        const buffer = xlsx.build(sheets);
        const filePath = path.join(__dirname, 'download.xlsx');
        fs.writeFileSync(filePath, buffer);

        res.download(filePath, 'Deposits_data.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading the file');
            }
            // Delete the file after sending it
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal server error');
    }
});


// Route to download Tellers Withdrawal Transactions
app.post('/downloadW', async (req, res) => {
    try {
        const { branch, tellertype, 'start-date': startDate, 'end-date': endDate } = req.body;

        const { start, end } = createDateRange(startDate, endDate);

        const baseFilters = {
            TheBranch: branch,
            TellerType: tellertype,
            Description: "Withdrawal",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters2 = {
            The_Branch: branch,
            Teller_Type: tellertype,
            Description: "Withdrawal",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters1 = {
            The_Branch: branch,
            Teller_Type: tellertype,
            Timestamp: { $gte: start, $lte: end }
        };

        const userMoMoDocs = await UserMoMoCollection.find({ ...baseFilters, MoMo: { $in: ["mtn", "Voda"] } });
        const transactionDocs = await Transaction.find({ ...baseFilters, Bank: "ecobank" });
        const OtherWithdrawalDocs = await OthersWithdrawalCollection.find({ ...baseFilters1 });
        const userWInputsDocs = await TellerInput3.find({ ...baseFilters1, Type: "Cash To Bank" });
        const userWInputsDocs2 = await TellerInput3.find({ ...baseFilters1, Type: "Expenses" });
        const userWInputsDocs3 = await TellerInput3.find({ ...baseFilters1, Type: "Physical Cash Remaining" });
        const SuSuDocs = await SusuDocs.find({ ...baseFilters2 });

        const sheets = [
            { name: 'MoMo(Withdrawals)', data: docsToSheetData(userMoMoDocs) },
            { name: 'Banks(Withdrawals)', data: docsToSheetData(transactionDocs) },
            { name: 'OtherWithdrawals', data: docsToSheetData(OtherWithdrawalDocs) },
            { name: 'Cash to Bank', data: docsToSheetData(userWInputsDocs) },
            { name: 'Expenses', data: docsToSheetData(userWInputsDocs2) },
            { name: 'PCash Remng.', data: docsToSheetData(userWInputsDocs3) },
            { name: 'SuSuDocs', data: docsToSheetData(SuSuDocs) }
        ];

        const buffer = xlsx.build(sheets);
        const filePath = path.join(__dirname, 'download.xlsx');
        fs.writeFileSync(filePath, buffer);

        res.download(filePath, 'Withdrawals_data.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading the file');
            }
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal server error');
    }
});


// Route to download Superuser Transactions
app.post('/downloadS', async (req, res) => {
    try {
        const { 'start-date': startDate, 'end-date': endDate } = req.body;

        const { start, end } = createDateRange(startDate, endDate);

        const baseFilters = {
            Processor: "Superuser",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters1 = {
            Name: "Superuser",
            Timestamp: { $gte: start, $lte: end }
        };

        const TellerEntries = await SBTransaction.find({ ...baseFilters });
        const Commissions = await SUserInput3Collection.find({ ...baseFilters });
        const EcashAndOBalance = await SuperuserInputsCollection.find({ ...baseFilters1 });
        const AllEntries = await SUserInput4Collection.find({ ...baseFilters, The_Type: "Total Entries" });
        const EcobankCashOut = await SUserInput4Collection.find({ ...baseFilters, The_Type: "Ecobank Cash out" });
        const FidelityWithdwl = await SUserInput5Collection.find({ ...baseFilters, Account: "Fidelity Bank" });
        const OtherDeposits = await SUserInput5Collection.find({ ...baseFilters, The_Type: { $in: ["Other MTN MoMo Deposits",
        "Other Ecobank Deposits"] } });

        const sheets = [
            { name: 'Tellers Entry', data: docsToSheetData(TellerEntries) },
            { name: 'Tellers Comm', data: docsToSheetData(Commissions) },
            { name: 'Ecash & OBal', data: docsToSheetData(EcashAndOBalance) },
            { name: 'Total Entries', data: docsToSheetData(AllEntries) },
            { name: 'Ecobank COut', data: docsToSheetData(EcobankCashOut) },
            { name: 'Fidelity WD', data: docsToSheetData(FidelityWithdwl) },
            { name: 'Other Deposits', data: docsToSheetData(OtherDeposits) }
        ];

        const buffer = xlsx.build(sheets);
        const filePath = path.join(__dirname, 'download.xlsx');
        fs.writeFileSync(filePath, buffer);

        res.download(filePath, 'Superuser_data.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading the file');
            }
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal server error');
    }
});


// Route for Tellers to download their Deposit Transactions
app.post('/downloadUserDep', async (req, res) => {
    try {
        const { 'start-date': startDate, 'end-date': endDate } = req.body;

        const teller = req.user.tellertype;
        const Branch = req.user.branch;

        const { start, end } = createDateRange(startDate, endDate);

        const baseFilters = {
            TheBranch: Branch,
            TellerType: teller,
            Description: "Deposit",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters1 = {
            The_Branch: Branch,
            Teller_Type: teller,
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters2 = {
            The_Branch: Branch,
            Teller_Type: teller,
            Description: "Deposit",
            Timestamp: { $gte: start, $lte: end }
        };

        const userMoMoDocs = await UserMoMoCollection.find({ ...baseFilters, MoMo: { $in: ["mtn", "Voda"] } });
        const transactionDocs = await Transaction.find({ ...baseFilters, Bank: { $in: ["fidelity", "ecobank", "Calbank","Other Banks"] } });
        const userInputsDocs = await UserInputsCollection.find({ ...baseFilters1, TheType: "Initial Physical Cash" });
        const userDInputsDocs = await UserDInputsCollection.find({ ...baseFilters1, TheType: "Physical Cash Collected" });
        const SuSuDocs = await SusuDocs.find({ ...baseFilters2 });

        const sheets = [
            { name: 'MoMo(Deposit)', data: docsToSheetData(userMoMoDocs) },
            { name: 'Banks(Deposit)', data: docsToSheetData(transactionDocs) },
            { name: 'IntialPcash', data: docsToSheetData(userInputsDocs) },
            { name: 'PcashColted', data: docsToSheetData(userDInputsDocs) },
            { name: 'SuSuDocs(Deposit)', data: docsToSheetData(SuSuDocs) }
        ];

        const buffer = xlsx.build(sheets);
        const filePath = path.join(__dirname, 'download.xlsx');
        fs.writeFileSync(filePath, buffer);

        res.download(filePath, 'Deposits_data.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading the file');
            }
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal server error');
    }
});


// Route for Tellers to download their Withdls Transactions
app.post('/downloadUserWdwl', async (req, res) => {
    try {
        const { 'start-date': startDate, 'end-date': endDate } = req.body;

        const teller = req.user.tellertype;
        const Branch = req.user.branch;

        const { start, end } = createDateRange(startDate, endDate);

        const baseFilters = {
            TheBranch: Branch,
            TellerType: teller,
            Description: "Withdrawal",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters2 = {
            The_Branch: Branch,
            Teller_Type: teller,
            Description: "Withdrawal",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters1 = {
            The_Branch: Branch,
            Teller_Type: teller,
            Timestamp: { $gte: start, $lte: end }
        };

        const userMoMoDocs = await UserMoMoCollection.find({ ...baseFilters, MoMo: { $in: ["mtn", "Voda"] } });
        const transactionDocs = await Transaction.find({ ...baseFilters, Bank: "ecobank" });
        const OtherWithdrawalDocs = await OthersWithdrawalCollection.find({ ...baseFilters1 });
        const userWInputsDocs = await TellerInput3.find({ ...baseFilters1 });
        const SuSuDocs = await SusuDocs.find({ ...baseFilters2 });

        const sheets = [
            { name: 'MoMo(Withdrawals)', data: docsToSheetData(userMoMoDocs) },
            { name: 'Banks(Withdrawals)', data: docsToSheetData(transactionDocs) },
            { name: 'OtherWithdrawals', data: docsToSheetData(OtherWithdrawalDocs) },
            { name: 'UserInputs', data: docsToSheetData(userWInputsDocs) },
            { name: 'SuSuDocs', data: docsToSheetData(SuSuDocs) }
        ];

        const buffer = xlsx.build(sheets);
        const filePath = path.join(__dirname, 'download.xlsx');
        fs.writeFileSync(filePath, buffer);

        res.download(filePath, 'Withdrawals_data.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading the file');
            }
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal server error');
    }
});


// Route to delete Tellers Deposit Transaction
app.post('/DeleteDoc1', checkAuthenticated, async (req, res) => {
    const { transactionType, transID } = req.body;
  
    try {
      let mainCollectionResult, allDocsResult;

      
      let existsInMainCollection = false;

      if (
        transactionType === "ecobank" ||
        transactionType === "fidelity" ||
        transactionType === "Calbank" ||
        transactionType === "Other Banks"
      ) {
        existsInMainCollection = await Transaction.findOne({
          Bank: transactionType,
          Description: "Deposit",
          ID: transID,
        });
      } else if (transactionType === "mtn" || transactionType === "Voda") {
        existsInMainCollection = await UserMoMoCollection.findOne({
          MoMo: transactionType,
          Description: "Deposit",
          ID: transID,
        });
      } else {
        existsInMainCollection = await SusuDocs.findOne({
          ID: transID,
          Description: "Deposit",
        });
      }

      if (!existsInMainCollection) {
        return res.json({
          notFound: true,
        });
      }

      
      if (
        transactionType === "ecobank" ||
        transactionType === "fidelity" ||
        transactionType === "Calbank" ||
        transactionType === "Other Banks"
      ) {
        [mainCollectionResult, allDocsResult] = await Promise.all([
          Transaction.deleteOne({
            Bank: transactionType,
            Description: "Deposit",
            ID: transID,
          }),
          AllDocsUniqueIDs.deleteOne({ ID: transID }),
        ]);
      } else if (transactionType === "mtn" || transactionType === "Voda") {
        [mainCollectionResult, allDocsResult] = await Promise.all([
          UserMoMoCollection.deleteOne({
            MoMo: transactionType,
            Description: "Deposit",
            ID: transID,
          }),
          AllDocsUniqueIDs.deleteOne({ ID: transID }),
        ]);
      } else {
        [mainCollectionResult, allDocsResult] = await Promise.all([
          SusuDocs.deleteOne({
            ID: transID,
            Description: "Deposit",
          }),
          AllDocsUniqueIDs.deleteOne({ ID: transID }),
        ]);
      }

      
      if (mainCollectionResult.deletedCount > 0 && allDocsResult?.deletedCount > 0) {
        return res.json({ deleted: true });
      } else {
        return res.json({ notFound: true });
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      return res.json({ deleted: false });
    }
});


app.post('/deleteOtherWithdrawal', checkAuthenticated, async (req, res) => {
    const { withdrawalType, transID2 } = req.body;
  
    try {
        let mainCollectionResult, allDocsResult;

        // Pre-check for existence in the main collection
        let existsInMainCollection = false;

        if (
            withdrawalType === "G-Money" ||
            withdrawalType === "ATM" ||
            withdrawalType === "Ezwich" ||
            withdrawalType === "Remittances"
        ) {
            existsInMainCollection = await OthersWithdrawalCollection.findOne({
                Type: withdrawalType,
                ID: transID2,
            });
        } else if (withdrawalType === "mtn" || withdrawalType === "Voda") {
            existsInMainCollection = await UserMoMoCollection.findOne({
                MoMo: withdrawalType,
                Description: "Withdrawal",
                ID: transID2,
            });
        } else if (withdrawalType === "ecobank") {
            existsInMainCollection = await Transaction.findOne({
                Bank: withdrawalType,
                Description: "Withdrawal",
                ID: transID2,
            });
        } else {
            existsInMainCollection = await SusuDocs.findOne({
                ID: transID2,
                Description: "Withdrawal",
            });
        }

        // If not found in the main collection, return an error
        if (!existsInMainCollection) {
            return res.json({
                notFound: true,
              });
        }

        // Proceed with deletion if document exists in the main collection
        if (
            withdrawalType === "G-Money" ||
            withdrawalType === "ATM" ||
            withdrawalType === "Ezwich" ||
            withdrawalType === "Remittances"
        ) {
            [mainCollectionResult, allDocsResult] = await Promise.all([
                OthersWithdrawalCollection.deleteOne({
                    Type: withdrawalType,
                    ID: transID2,
                }),
                AllDocsUniqueIDs.deleteOne({ ID: transID2 }),
            ]);
        } else if (withdrawalType === "mtn" || withdrawalType === "Voda") {
            [mainCollectionResult, allDocsResult] = await Promise.all([
                UserMoMoCollection.deleteOne({
                    MoMo: withdrawalType,
                    Description: "Withdrawal",
                    ID: transID2,
                }),
                AllDocsUniqueIDs.deleteOne({ ID: transID2 }),
            ]);
        } else if (withdrawalType === "ecobank") {
            [mainCollectionResult, allDocsResult] = await Promise.all([
                Transaction.deleteOne({
                    Bank: withdrawalType,
                    Description: "Withdrawal",
                    ID: transID2,
                }),
                AllDocsUniqueIDs.deleteOne({ ID: transID2 }),
            ]);
        } else {
            [mainCollectionResult, allDocsResult] = await Promise.all([
                SusuDocs.deleteOne({
                    ID: transID2,
                    Description: "Withdrawal",
                }),
                AllDocsUniqueIDs.deleteOne({ ID: transID2 }),
            ]);
        }

      // Check if deletion succeeded in both collections
      if (mainCollectionResult.deletedCount > 0 && allDocsResult?.deletedCount > 0) {
        return res.json({ deleted: true });
      } else {
        // If either deletion failed, return an error
        return res.json({ notFound: true });
      }
    } catch (error) {
        console.error('Error deleting withdrawal document:', error);
        return res.json({ deleted: false});
    }
});
  

// Route to delete UserInput Transactions
app.post('/deleteUserInput', checkAuthenticated, async (req, res) => {
    const { userInput, transactionId } = req.body;

    try {
        let mainCollectionResult, allDocsResult;

        let existsInMainCollection = false;

        if (userInput === "Initial Physical Cash") {
            existsInMainCollection = await UserInputsCollection.findOne({
                ID: transactionId,
            });
        } else if (userInput === "Physical Cash Collected") {
            existsInMainCollection = await UserDInputsCollection.findOne({
                ID: transactionId,
            });
        } else if (
            userInput === "Expenses" ||
            userInput === "Cash To Bank" ||
            userInput === "Physical Cash Remaining"
        ) {
            existsInMainCollection = await TellerInput3.findOne({
                Type: userInput,
                ID: transactionId,
            });
        }

        
        if (!existsInMainCollection) {
            return res.json({
                notFound: true,
            });
        }

        
        if (userInput === "Initial Physical Cash") {
            [mainCollectionResult, allDocsResult] = await Promise.all([
                UserInputsCollection.deleteOne({ ID: transactionId }),
                AllDocsUniqueIDs.deleteOne({ ID: transactionId }),
            ]);
        } else if (userInput === "Physical Cash Collected") {
            [mainCollectionResult, allDocsResult] = await Promise.all([
                UserDInputsCollection.deleteOne({ ID: transactionId }),
                AllDocsUniqueIDs.deleteOne({ ID: transactionId }),
            ]);
        } else if (
            userInput === "Expenses" ||
            userInput === "Cash To Bank" ||
            userInput === "Physical Cash Remaining"
        ) {
            [mainCollectionResult, allDocsResult] = await Promise.all([
                TellerInput3.deleteOne({ Type: userInput, ID: transactionId }),
                AllDocsUniqueIDs.deleteOne({ ID: transactionId }),
            ]);
        }

        if (mainCollectionResult.deletedCount > 0 && allDocsResult?.deletedCount > 0) {
            return res.json({ deleted: true });
        } else {
            return res.json({ notFound: true });
        }
    } catch (error) {
        console.error('Error deleting teller input document:', error);
        return res.json({ deleted: false});
    }
});

  
module.exports = app;