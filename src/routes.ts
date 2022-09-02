import { Router } from "express";
import { DentistController } from "./controllers/DentistController";

const router = Router();

const dentistController = new DentistController();

router.post('/', dentistController.create)

export { router };
