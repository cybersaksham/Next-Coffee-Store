import { formatRecords, table, findRecordsByID } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  if (req.method == "GET") {
    const { id } = req.query;

    try {
      if (id) {
        // Find a record
        const findRecord = await findRecordsByID(id);

        if (findRecord && findRecord.length !== 0) {
          return res.json(findRecord[0]);
        } else {
          return res.status(400).json({ message: "Coffee Store not found" });
        }
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

export default getCoffeeStoreById;
