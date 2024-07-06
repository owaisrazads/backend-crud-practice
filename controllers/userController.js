import Todos from "../models/userModel.js"


export const addTodos = async(req, res) => {
  try {
   const {name, title} = req.body;
   const todo = new Todos({name, title})
   await todo.save()
   res.status(201).send(todo)
  } catch (error) {
    res.status(404).send(error)
  }
}


export const getTodos = async(req, res) => {
  try {
    const todos = await Todos.find();
   res.status(201).send(todos)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}



export const deleteTodo = async(req, res) => {

const {id} = req.params;

try {
  const todo = await Todos.findByIdAndDelete(id)
  if(!todo) {
    return res.status(404).json({message: "Todo not found"})
  }
  
   res.status(200).json({message: "Todo delete successfullu"})

  
} catch (error) {
  return res.status(404).json({message: "Server error", error})
  
}
}



// export const updateTodo = async(req, res) => {
//   const { id } = req.params;
//   const { name, title } = req.body
// }
// try {
//   const todo = await Todos.findById(id)
//   if(!todo) {
//     return res.status(404).json({message: "Todo not Found for update"})
//   }
// todo.name = name || todo.name;
// todo.title = title || todo.title
// await Todos.save()
// res.status(200).json(todo)
// } catch (error) {
//   return res.status(404).json({message: "Server error", error})
// }



export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { name, title } = req.body;

  try {
    const todo = await Todos.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found for update" });
    }
    todo.name = name || todo.name;
    todo.title = title || todo.title;
    await Todos.save(); // Save the updated instance
    res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};