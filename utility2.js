const express = require('express');

const app = express();
app.use(express.json()); 

const { generateUniqueId } = require('./utility1');
const { AllDocsUniqueIDs} = require('./mongodb');

const checkUniqueId = async (req, res, next) => {
    let isUnique = false;
    let generatedId;
  
    // Loop to generate ID until it is unique
    while (!isUnique) {
      generatedId = generateUniqueId();
      const existingId = await AllDocsUniqueIDs.findOne({ ID: generatedId });
  
      if (!existingId) {
        // If ID is unique, store it in the centralized collection
        await AllDocsUniqueIDs.create({ ID: generatedId });
        isUnique = true;
      }
    }
  
    req.generatedId = generatedId;
    next();
};

module.exports = { checkUniqueId };
