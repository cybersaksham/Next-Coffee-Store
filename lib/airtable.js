// The Table
const Airtable = require("airtable");
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const base = new Airtable({ apiKey }).base(baseId);
const table = base("coffee-stores");

// Formatting the record
const formatRecords = (record) => {
  const records = record.map((rec) => {
    return {
      ...rec.fields,
    };
  });

  return records;
};

module.exports = { table, formatRecords };
