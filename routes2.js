const express = require('express');
const xlsx = require('node-xlsx');
const { CSEcobankWithdls,CSExpressAcctCreation,AccountantCollection,OperationalColt,COverallColt,AllDocsUniqueIDs } = require('./mongodb');
const { checkUniqueId } = require('./utility2');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json()); 


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
};

function createDateRange(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T23:59:59.999Z`);

  return { start, end };
}

function docsToSheetData(docs) {
  if (docs.length === 0) return [];

  const headers = Object.keys(docs[0].toObject());
  const data = docs.map(doc => Object.values(doc.toObject()));
  return [headers, ...data];
}

// Route for CS download to Ecobank Withdls
app.post('/downloadcs2', async (req, res) => {
  try {
      const { 'start-date': startDate, 'end-date': endDate } = req.body;

      const Name = req.user.name;
      const Branch = req.user.branch;

      const { start, end } = createDateRange(startDate, endDate);


      const baseFilters2 = {
        CSBranch: Branch,
        CSName: Name,
        Timestamp: { $gte: start, $lte: end }
      };

      const WithdlsDocs = await CSEcobankWithdls.find({ ...baseFilters2 });

      // Prepare data for the workbook
      const sheets = [
        { name: 'Ecobank Withdls', data: docsToSheetData(WithdlsDocs) }
      ];

      // Generate Excel file
      const buffer = xlsx.build(sheets);
      const filePath = path.join(__dirname, 'download.xlsx');
      fs.writeFileSync(filePath, buffer);

      res.download(filePath, 'EcobWdls_data.xlsx', (err) => {
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

// Route to download a particular CS Ecobank Withdls
app.post('/csEcoWithwlsDl', async (req, res) => {
  try {
      const {branch, 'start-date': startDate, 'end-date': endDate } = req.body;

      const { start, end } = createDateRange(startDate, endDate);


      const baseFilters2 = {
        CSBranch: branch,
        Timestamp: { $gte: start, $lte: end }
      };

      const WithdlsDocs = await CSEcobankWithdls.find({ ...baseFilters2 });

      const sheets = [
        { name: 'Ecobank Withdls', data: docsToSheetData(WithdlsDocs) }
      ];

      const buffer = xlsx.build(sheets);
      const filePath = path.join(__dirname, 'download.xlsx');
      fs.writeFileSync(filePath, buffer);

      res.download(filePath, 'EcobWdls_data.xlsx', (err) => {
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

// Route for CS download Express Accounts Created Data
app.post('/downloadcs1', async (req, res) => {
  try {
      const { 'start-date': startDate, 'end-date': endDate } = req.body;

      const Name = req.user.name;
      const Branch = req.user.branch;

      const { start, end } = createDateRange(startDate, endDate);


      const baseFilters2 = {
        CSBranch: Branch,
        CSName: Name,
        Timestamp: { $gte: start, $lte: end }
      };

      const expressData = await CSExpressAcctCreation.find({ ...baseFilters2 });

      const sheets = [
        { name: 'Express Accounts', data: docsToSheetData(expressData) }
      ];

      const buffer = xlsx.build(sheets);
      const filePath = path.join(__dirname, 'download.xlsx');
      fs.writeFileSync(filePath, buffer);

      res.download(filePath, 'Express_Accts_data.xlsx', (err) => {
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

// Route to download a particular CS Express Accounts Created Data
app.post('/csExAcctDataDl', async (req, res) => {
  try {
      const {branch, 'start-date': startDate, 'end-date': endDate } = req.body;

      const { start, end } = createDateRange(startDate, endDate);


      const baseFilters2 = {
        CSBranch: branch,
        Timestamp: { $gte: start, $lte: end }
      };

      const expressData = await CSExpressAcctCreation.find({ ...baseFilters2 });

      const sheets = [
        { name: 'Express Accounts', data: docsToSheetData(expressData) }
      ];

      const buffer = xlsx.build(sheets);
      const filePath = path.join(__dirname, 'download.xlsx');
      fs.writeFileSync(filePath, buffer);

      res.download(filePath, 'Express_Accts_data.xlsx', (err) => {
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

// Route for CS Add Ecobank Withdrawals Data
app.post('/csEcobankWithdls', checkAuthenticated, checkUniqueId, async (req, res) => {
  const Type = req.user.usertype;
  const branch = req.user.branch;
  const Processor = req.user.name;
  const name = req.body.csname;
  const amount = req.body.csamount;

  const newWithdrawal = new CSEcobankWithdls({
    ID: req.generatedId,
    CSName: Processor,
    BeneficiaryName: name,
    Amount: amount,
    CSUserType: Type,
    CSBranch: branch
  });

  try {
    await newWithdrawal.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});
// Route for CS Add Express Accounts Created Data
app.post('/csExpressCreation', checkAuthenticated,checkUniqueId, async (req, res) => {
  const customerName = req.body.csname1;
  const customerContact = req.body.contact1;
  const accountNumber = req.body.account1;
  const email = req.body.email1;
  const initialDeposit = req.body.csamount1;
  const branch = req.user.branch;
  const Type = req.user.usertype;
  const Processor = req.user.name; 

  const newAccount = new CSExpressAcctCreation({
    CSName: Processor,
    CSUserType: Type,
    CSBranch: branch,
    CustomerName: customerName,
    CustomerContact: customerContact,
    AccountNumber: accountNumber,
    EmailAddress: email,
    ID: req.generatedId,
    InitialDeposit: initialDeposit
  });

  try {
      await newAccount.save();
      res.json({ success: true });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
  }
});

// Route to save data by the Accountant
app.post('/AccountantForm', checkAuthenticated, checkUniqueId,async (req, res) => {
  const { FormType, branch, tellerType, accounttype, amount } = req.body;

  const UserType = req.user.usertype;
  const Username = req.user.name;

  try {
      const newEntry = new AccountantCollection({
          UserType,
          Username,
          FormType,
          ID: req.generatedId,
          Amount: parseFloat(amount)
      });

      if (FormType === 'Closing Balance') {
          newEntry.Branch = branch;
          newEntry.TellerType = tellerType;
      }

      if (FormType === 'Downloaded Report') {
          newEntry.AccountType = accounttype;
      }

      await newEntry.save();
      res.json({ success: true });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
  }
});

// Route for Operations to Add Data
app.post('/operationalTransc', checkAuthenticated, checkUniqueId, async (req, res) => {
  const { document, amount, branch, beneficiary, banktype, slipnumber } = req.body;
  const Type = req.user.usertype;
  const Processor = req.user.name;

  const data = {
      ID: req.generatedId,
      Name: Processor,
      UserType: Type,
      Amount: amount
  };

  if (document === "Ecash Document") {
      data.DocumentType = "Ecash Document";  
  } else {
      data.Branch = branch;
      data.BeneficiaryName = beneficiary;
      data.BankType = banktype;
      data.SlipNumber = slipnumber;
  }

  const newOperationalColt = new OperationalColt(data);

  try {
      await newOperationalColt.save();
      res.json({ success: true });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
  }
});

// Route to Delete CS Data
app.post('/deleteCSInput', checkAuthenticated, async (req, res) => {
    const { csInput, transactionId } = req.body;

    try {
        let mainCollectionResult, allDocsResult;

        // Pre-check for existence in the main collection
        let existsInMainCollection = false;

        if (csInput === "Ecobank Withdrawal") {
            existsInMainCollection = await CSEcobankWithdls.findOne({ ID: transactionId });
        } else if (csInput === "Express Account Created") {
            existsInMainCollection = await CSExpressAcctCreation.findOne({ ID: transactionId });
        }

        // If the document doesn't exist in the main collection, return an error
        if (!existsInMainCollection) {
            return res.json({
                notFound: true,
            });
        }

        // Proceed with deletion if document exists in the main collection
        if (csInput === "Ecobank Withdrawal") {
            [mainCollectionResult, allDocsResult] = await Promise.all([
                CSEcobankWithdls.deleteOne({ ID: transactionId }),
                AllDocsUniqueIDs.deleteOne({ ID: transactionId }),
            ]);
        } else if (csInput === "Express Account Created") {
            [mainCollectionResult, allDocsResult] = await Promise.all([
                CSExpressAcctCreation.deleteOne({ ID: transactionId }),
                AllDocsUniqueIDs.deleteOne({ ID: transactionId }),
            ]);
        }

        // Check if deletion succeeded in both collections
        if (mainCollectionResult.deletedCount > 0 && allDocsResult?.deletedCount > 0) {
            return res.json({ deleted: true });
        } else {
            return res.json({ notFound: true });
        }
    } catch (err) {
        console.error('Error deleting CS document:', err);
        return res.json({ deleted: false});
    }
});
  


app.get('/optTransaction1', async (req, res) => {
  try {
      const { startDate, endDate } = req.query; // Get date range from query parameters

      let startOfDay, endOfDay;
      if (startDate && endDate) {
          startOfDay = new Date(`${startDate}T00:00:00.000Z`);
          endOfDay = new Date(`${endDate}T23:59:59.999Z`);
      } else {
          const today = new Date();
          startOfDay = new Date(today.setUTCHours(0, 0, 0, 0));
          endOfDay = new Date(today.setUTCHours(23, 59, 59, 999));
      }

      const transactions = await OperationalColt.find({
          Timestamp: {
              $gte: startOfDay,
              $lte: endOfDay
          }
      });

      res.json(transactions);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching transactions' });
  }
});

// Route for OperationalColt data download in Excel format
app.post('/download-operational1', async (req, res) => {
  try {
      const { startDatedl, endDatedl } = req.body;

      const { start, end } = createDateRange(startDatedl, endDatedl);

      const operationalDocs = await OperationalColt.find({
          Timestamp: {
              $gte: start,
              $lte: end
          }
      });

      const sheetData = [
          ['Id', 'Name', 'User type','Branch','Bank type','Beneficiary name','Slip number','Amount', 'Timestamp'],
          ...operationalDocs.map(doc => [
              doc.ID,
              doc.Name,
              doc.UserType,
              doc.Branch,
              doc.BankType,
              doc.BeneficiaryName,
              doc.SlipNumber,
              doc.Amount,
              doc.Timestamp
          ])
      ];

      const buffer = xlsx.build([{ name: 'Operational Data1', data: sheetData }]);
      const filePath = path.join(__dirname, 'OperationalColt_data.xlsx');
      fs.writeFileSync(filePath, buffer);

      res.download(filePath, 'OperationalColt_data.xlsx', (err) => {
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


app.post('/overllFormsRoutes', checkAuthenticated, checkUniqueId, async (req, res) => {
  const {branch, accountType, description, transactionType, amount, document,selecttype } = req.body;
  const UserType = req.user.usertype;
  const Username = req.user.name;

  try {
      const newEntry = new COverallColt({
          UserType,
          Username,
          Document: document,
          ID: req.generatedId,
          Amount: parseFloat(amount)
      });

      // Handle fields unique to each form type
      if (document === 'Account Balance Doc') {
          newEntry.AccountType = accountType;
          newEntry.Description = description;
      } else if (document === 'Unsettled Balances Doc') {
          newEntry.Branch = branch;
          newEntry.TransactionType = transactionType;
      } else if (document === 'PCash Doc') {
          newEntry.Branch = branch;
      } else if (document === 'Pending Transactions Doc') {
          newEntry.TransactionType = selecttype;
          newEntry.Description = description;
      } else if (document === 'Given-Out/Personal Expenses Doc') {
          newEntry.TransactionType = selecttype;
          newEntry.Description = description;
      } else if (document === 'Expenses & Commission Doc') {
          newEntry.TransactionType = selecttype;
          newEntry.Description = description;
      } else if (document === 'SUSU Transaction Doc') {
          newEntry.TransactionType = selecttype;
          newEntry.Description = description;
      }

      await newEntry.save();
      res.json({ success: true });

  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
  }
});


module.exports = app;