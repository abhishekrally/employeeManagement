 import express from "express";
import { updateTask, create, login, fetchAllTasks, deleteTask, fetchTaskUser} from "../controller/userController.js";

const Router = express.Router();

Router.post("/create", create);
Router.post("/login", login);
Router.post("/addTaskToUser", updateTask);
Router.get("/fetchAllTasks", fetchAllTasks);
Router.post("/fetchTaskUser",fetchTaskUser);
Router.delete("/deleteTask/:userID/:taskID",deleteTask)
export default Router;