import db from "../db.js";

const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

const ADD_CAR = async (req, res) => {
  if (!urlPattern.test(req.body.image)) {
    return res.status(400).json({ response: "Invalid image URL" });
  }
  try {
    const car =
      await db.query(`INSERT INTO Cars(manufacturer, model, image, price, number_plate)
    VALUES ('${req.body.manufacturer}', '${req.body.model}', '${req.body.image}', '${req.body.price}', '${req.body.number_plate}')`);
    return res.status(201).json({ response: car });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ response: "Something went wrong." });
  }
};

const GET_ALL_CARS = async (req, res) => {
  try {
    const cars = await db.query("SELECT * FROM Cars");
    return res.json({ cars: cars.rows });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ response: "Something went wrong." });
  }
};

const GET_CAR_BY_ID = async (req, res) => {
  try {
    const car = await db.query(`SELECT * FROM Cars WHERE id=${req.params.id}`);
    return res.json({ car: car.rows[0] });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ response: "Something went wrong." });
  }
};

const UPDATE_CAR = async (req, res) => {
  try {
    const car = await db.query(`
      UPDATE public.cars
      SET manufacturer = '${req.body.manufacturer}', model = '${req.body.model}', image = '${req.body.image}', price = '${req.body.price}', number_plate = '${req.body.number_plate}'
      WHERE id = ${req.params.id}`);

    return res
      .status(200)
      .json({ response: car, status: "The car was updated." });
  } catch (err) {
    console.log("ERROR:", err);
    return res.json({ response: "Something went wrong." });
  }
};

const DELETE_CAR = async (req, res) => {
  try {
    const car = await db.query(`DELETE FROM Cars WHERE id=${req.params.id}`);

    if (car === null) {
      return res.status(404).json({
        response: "The car you're trying to delete cannot be found.",
      });
    }

    return res.json({ car, status: "The car was deleted." });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ response: "Something went wrong." });
  }
};

export { ADD_CAR, GET_ALL_CARS, GET_CAR_BY_ID, UPDATE_CAR, DELETE_CAR };
