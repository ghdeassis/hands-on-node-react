import express from "express";
import { promises as fs } from "fs";
import cors from "cors";

const { readFile, writeFile } = fs;
const fileName = "todos.json";
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async (req, res) => {  
  try {
    if (req.body.description) {
      const data = JSON.parse(await readFile(fileName));
      const todo = {
        id: data.nextId++,
        description: req.body.description
      }
      data.todos.push(todo);
      await writeFile(fileName, JSON.stringify(data));
      res.send(data);
    } else {
      res.status(400).send({ error: "Descrição não informada." });    
    }
  } catch (err) {
    res.status(400).send({ error: err.message });    
  }
});

app.get("/todo", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(fileName));
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });    
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    if (req.params.id) {
      const data = JSON.parse(await readFile(fileName));    
      data.todos = data.todos.filter(
        todos => todos.id !== parseInt(req.params.id));        
      await writeFile(fileName, JSON.stringify(data));        
      res.send(data);
    } else {
      res.status(400).send({ error: "Id não informado." });    
    }
  } catch (err) {
    res.status(400).send({ error: err.message });    
  }
});

app.listen(8080, () => console.log("API Started!"));

/*app.listen(8080, async () => {
  try {
    await readFile(fileName);
    console.log("API Started!");
  } catch (err) {
    const initialJson = {
      nextId: 1,
      todos: []
    }

    writeFile(fileName, JSON.stringify(initialJson)).then(() => { 
      console.log("API Started and File Created!"); 
    }).catch(err => {
      console.log(err);
    });
  }
});*/