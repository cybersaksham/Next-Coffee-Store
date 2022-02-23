const { table, formatRecords } = require("../../lib/airtable");

const createCoffeeStore = async (req, res) => {
  if (req.method == "POST") {
    const { id, name, address, neighbourhood, imgUrl } = req.body;

    try {
      if (id) {
        // Find a record
        const findRecord = await table
          .select({
            filterByFormula: `=id="${id}"`,
          })
          .firstPage();
        console.log(findRecord);

        if (findRecord && findRecord.length !== 0) {
          return res.json(formatRecords(findRecord)[0]);
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
};

export default createCoffeeStore;
