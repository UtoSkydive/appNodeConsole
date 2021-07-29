const { green } = require("colors");
const inquire = require("inquirer");
require("colors");

//function call menu with inquire
const menuInquire = async () => {
  console.clear();
  console.log("================".green);
  console.log("Select a option".white);
  console.log("================\n".green);
  const { option } = await inquire.prompt({
    type: "list",
    name: "option",
    message: `${"What do you doing?".red}`,
    choices: [
      {
        value: "1",
        name: `${"1".red}.Create Task`,
      },
      {
        value: "2",
        name: `${"2".red}.List Task`,
      },
      {
        value: "3",
        name: `${"3".red}.Lista Tareas Completadas`,
      },
      {
        value: "4",
        name: `${"4".red}.Lista Tarea Pendientes`,
      },
      {
        value: "5",
        name: `${"5".red}.Completar Tarea`,
      },
      {
        value: "6",
        name: `${"6".red}.Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0".red}.Salir`,
      },
    ],
  });
  return option;
};

const pausa = async () => {
  const pausa = await inquire.prompt({
    type: "input",
    name: "enter",
    message: `Presione ${"Enter".red} para continuar`,
  });
  return pausa;
};
const leerInput = async (message) => {
  const questions = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquire.prompt(questions);
  return desc;
};
const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "delete",
      choices,
    },
  ];
  const { id } = await inquire.prompt(preguntas);
  return id;
};
const mostrarlistadocheck = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked:(tarea.completedaoEn) ? true : false
    };
  });
 
  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];
  const { ids } = await inquire.prompt(pregunta);
  return ids;
};

const confirmar = async (msg) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      msg,
    },
  ];
  const { ok } = await inquire.prompt(question);
  return ok;
};

module.exports = {
  menuInquire,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarlistadocheck
};
