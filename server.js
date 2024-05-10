const axios = require('axios');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/NVD1', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define a schema for CVE documents
const cveSchema = new mongoose.Schema({
    id: String,
    published: Date,
    lastModified: Date,
    vulnStatus: String,
    baseScore: Number,

    // Add more fields as needed
});

const CVE = mongoose.model('CVE', cveSchema);

// Fetch JSON data from the API
axios.get('https://services.nvd.nist.gov/rest/json/cves/2.0')
    .then(response => {
        const data = response.data.vulnerabilities;

        // Store each CVE document in MongoDB
        data.forEach(cveData => {
            const cve = new CVE({
                id: cveData.cve.id,
                sourceIdentifier:cveData.cve.sourceIdentifier,
                published: new Date(cveData.cve.published),
                lastModified: new Date(cveData.cve.lastModified),
                vulnStatus: cveData.cve.vulnStatus,
                baseScore:cveData.cve.metrics?.cvssMetricV2?.[0]?.cvssData?.baseScore
                // Map other fields accordingly
            });
            cve.save()
                .then()
                .catch(error => console.error(`Error saving CVE ${cve.id} to MongoDB:`, error));
        });
    })
    .catch(error => console.error('Error fetching data from API:', error));

// Close MongoDB connection when the script exits
db.once('close', () => {
    console.log('MongoDB connection closed');
});
