import express from 'express';
import {addTodos, deleteTodo, getTodos, updateTodo} from "../controllers/userController.js";
// import  router  from 'express.Router()';

const router = express.Router()


router.post('/', addTodos)
router.get('/', getTodos)
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);


export default  router;