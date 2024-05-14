// server.js

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const CVE = require('./models/cve-model'); // Import the data schema
const cvelist_url = "https://services.nvd.nist.gov/rest/json/cves/2.0"
const batchSize = 2000; // Set your batch size
// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/NVD_CVE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Fetch data from API and store in MongoDB
app.get('/fetch-data', async (req, res) => {
  try {
    const response = await axios.get(`${cvelist_url}?resultsPerPage=1&startIndex=0`);
    const totalResults = response.data.totalResults;
    for (let i = 0; i < totalResults; i += batchSize) {
      const startIndex = i;
      const res = await axios.get(`${cvelist_url}?resultsPerPage=${batchSize}&startIndex=${startIndex}`, {
        method: "GET",
        redirect: "follow"
      });
      const cves = res.data.vulnerabilities.map(cveData => cveData.cve); // Extract CVE data
      // await CVE.insertMany(cves, { ordered: false }); // Insert batch of CVEs into MongoDB
      for (const cve of cves) {
        await CVE.findOneAndUpdate({ id: cve.id }, cve, { upsert: true }); // Update existing document or insert new document
      }
      console.log(`Completed: ${cves.length} records inserted, Batch: ${startIndex / batchSize + 1}`);
       // Add delay between batches
    }
    res.send("Success");
  } catch (error) {
    console.error('Error fetching and storing data:', error);
    res.status(500).send('An error occurred while fetching and storing data');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/fetch-data`);
});
