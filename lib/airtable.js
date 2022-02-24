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
      recordId: rec.id,
      ...rec.fields,
    };
  });

  return records;
};

// Finding Records by id
const findRecordsByID = async (id) => {
  if (id) {
    // Find a record
    const findRecord = await table
      .select({
        filterByFormula: `=id="${id}"`,
      })
      .firstPage();

    if (findRecord && findRecord.length !== 0) {
      return formatRecords(findRecord);
    }
  }

  return [];
};

module.exports = { table, formatRecords, findRecordsByID };
