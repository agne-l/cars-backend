import express from "express";
const router = express.Router();
import {
  ADD_CAR,
  GET_ALL_CARS,
  GET_CAR_BY_ID,
  UPDATE_CAR,
  DELETE_CAR,
} from "../controller/car.js";

router.post("/cars", ADD_CAR);

router.get("/cars", GET_ALL_CARS);

router.get("/cars/:id", GET_CAR_BY_ID);

router.put("/cars/:id", UPDATE_CAR);

router.delete("/cars/:id", DELETE_CAR);

export default router;
