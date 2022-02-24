import { findRecordsByID, table, formatRecords } from "../../lib/airtable";

const increaseVotes = async (req, res) => {
  if (req.method == "PUT") {
    const { id } = req.query;

    try {
      if (id) {
        // Find a record
        const findRecord = await findRecordsByID(id);

        if (findRecord && findRecord.length !== 0) {
          // Updating a record
          const updateRecords = await table.update([
            {
              id: findRecord[0].recordId,
              fields: {
                votes: parseInt(findRecord[0].votes) + 1,
              },
            },
          ]);
          return res.json(formatRecords(updateRecords)[0]);
        }
        return res.status(400).json({ message: "Coffee Store not found" });
      }
      return res.status(400).json({ message: "Invalid params" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: err });
    }
  }
  return res.status(404).send("Method not allowed");
};

export default increaseVotes;
