const express = require('express');
const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

const { COverallColt ,AllDocsUniqueIDs, OperationalColt,AccountantCollection } = require('./mongodb');

const app = express();
app.use(express.json());  

function createDateRange(startDate, endDate) {
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

app.post('/overallDeletion', async (req, res) => {
    const { transactionID } = req.body;

    try {
        const transactionExists = await COverallColt.findOne({ ID: transactionID });
        if (!transactionExists) {
            return res.json({ notFound: true});
        }

        const [overallDeletionResult, uniqueIDsDeletionResult] = await Promise.all([
            COverallColt.deleteOne({ ID: transactionID }),
            AllDocsUniqueIDs.deleteOne({ ID: transactionID })
        ]);

        // Verify both deletions were successful
        if (overallDeletionResult.deletedCount > 0 && uniqueIDsDeletionResult.deletedCount > 0) {
          
            res.json({ success: true });
        } else {
            
            res.json({ notFound: true });
        }
    } catch (error) {
        console.error('Error deleting transaction:', error);
        return res.json({ success: false});
    }
});


app.post('/overallDownload', async (req, res) => {
  try {
    const { 'ovrll-start-date': startDate, 'ovrll-end-date': endDate } = req.body;
    const { start, end } = createDateRange(startDate, endDate);

      const filters = {
          Timestamp: { $gte: start, $lte: end }
      };

      const docs = await COverallColt.find(filters);

      const sheetData = [];
      
      
      const headers = [
          'Username',
          'UserType',
          'Document',
          'Amount',
          'ID',
          'Timestamp',
          'Branch',
          'AccountType',
          'Description',
          'TransactionType'
      ];
      sheetData.push(headers);

      docs.forEach(doc => {
          const row = [
              doc.Username,
              doc.UserType,
              doc.Document,
              doc.Amount,
              doc.ID,
              doc.Timestamp,
              doc.Branch || '', // Include Branch if applicable
              doc.AccountType || '', // Include AccountType if applicable
              doc.Description || '', // Include Description if applicable
              doc.TransactionType || '' // Include TransactionType if applicable
          ];
          sheetData.push(row);
      });

      // Create the worksheet
      const buffer = xlsx.build([{ name: 'All Documents', data: sheetData }]);
      const filePath = path.join(__dirname, 'overall_data.xlsx');
      fs.writeFileSync(filePath, buffer);

      // Download the file
      res.download(filePath, 'overall_data.xlsx', (err) => {
          if (err) {
              console.error('Error sending file:', err);
              res.status(500).send('Error downloading the file');
          }
          // Optionally, remove the file after download
          fs.unlinkSync(filePath);
      });
  } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).send('Internal server error');
  }
});

app.post('/deleteByOperational', async (req, res) => {
    const { transactionID } = req.body;

    try {
        const existsInOperationalColt = await OperationalColt.findOne({ ID: transactionID });

        if (!existsInOperationalColt) {
            return res.json({
                notFound: true,
            });
        }

        const [deletedFromCOverallColt, deletedFromAllDocsUniqueIDs] = await Promise.all([
            OperationalColt.deleteOne({ ID: transactionID }),
            AllDocsUniqueIDs.deleteOne({ ID: transactionID }),
        ]);

        if (deletedFromCOverallColt.deletedCount > 0 && deletedFromAllDocsUniqueIDs.deletedCount > 0) {
          
            res.json({ success: true });
        } else {
            
            res.json({ notFound: true });
        }
    } catch (error) {
        console.error('Error while deleting transaction:', error);
        return res.status(500).json({ success: false });
    }
});

// Route for Accountant to handle transaction deletion
app.post('/accountantDel', async (req, res) => {
    const { Id } = req.body;

    try {
        // Check if transaction exists in AccountantCollection
        const transaction = await AccountantCollection.findOne({ ID: Id });
        if (!transaction) {
            return res.json({ notFound: true});
        }

        // Perform deletion in both collections
        const [accountantDeletionResult, allDocsDeletionResult] = await Promise.all([
            AccountantCollection.deleteOne({ ID: Id }),
            AllDocsUniqueIDs.deleteOne({ ID: Id })
        ]);

        // Verify both deletions were successful
        if (accountantDeletionResult.deletedCount > 0 && allDocsDeletionResult.deletedCount > 0) {
          
            res.json({ success: true });
        } else {
            
            res.json({ notFound: true });
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.json({ success: false});
    }
});


// Route for Accountant to handle transaction downloading
app.post('/downloadByAcct', async (req, res) => {
    try {
        const { 'start-date': startDate, 'end-date': endDate } = req.body;

        const { start, end } = createDateRange(startDate, endDate);

        const baseFilters2 = {
            FormType: "Closing Balance",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters1 = {
            FormType: "Downloaded Report",
            Timestamp: { $gte: start, $lte: end }
        };

        const DownloadReports = await AccountantCollection.find({ ...baseFilters1 });
        const ClosingBalances = await AccountantCollection.find({ ...baseFilters2 });

        const sheets = [
            { name: 'Dld Report', data: docsToSheetData(DownloadReports) },
            { name: 'Closing Blns', data: docsToSheetData(ClosingBalances) }
        ];

        const buffer = xlsx.build(sheets);
        const filePath = path.join(__dirname, 'download.xlsx');
        fs.writeFileSync(filePath, buffer);

        res.download(filePath, 'Acct_data.xlsx', (err) => {
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

module.exports = app;