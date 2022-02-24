const { table, formatRecords, findRecordsByID } = require("../../lib/airtable");

const createCoffeeStore = async (req, res) => {
  if (req.method == "POST") {
    const { id, name, address, neighbourhood, imgUrl } = req.body;

    try {
      if (id) {
        // Find a record
        const findRecord = await findRecordsByID(id);

        if (findRecord && findRecord.length !== 0) {
          return res.json(findRecord[0]);
        } else {
          if (name) {
            // Creating a record
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  votes: 0,
                  imgUrl,
                },
              },
            ]);
            return res.json(formatRecords(createRecords)[0]);
          }
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

export default createCoffeeStore;
