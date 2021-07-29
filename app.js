const {
  menuInquire,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarlistadocheck
} = require("./helpers/menuInquire");
const Tareas = require("./models/tareas");
const { saveDb, readDb } = require("./helpers/saveFile");
const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDb = readDb();
  if (tareasDb) {
    //establecer tareas llmando cargar tareas
    tareas.loadTAsks(tareasDb);
  }
  // await pausa()

  do {
    // print menu
    opt = await menuInquire();
    console.log({ opt });
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion: ");
        console.log(desc);
        tareas.crearTarea(desc);
        break;
      case "2":
        // console.log(tareas.listadoArr)
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarTareasCompletadasPendientes(true);
        break;
      case "4":
        tareas.listarTareasCompletadasPendientes(false);
        break;
      case "5":
        const ids = await mostrarlistadocheck(tareas.listadoArr)
        tareas.toggleCompletadas(ids)
        // console.log(ids)
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== '0') {
          //TODO: preguntar si esta seguro
          const ok = await confirmar("Estas seguro");
          console.log({ ok });
          if (ok) {
            tareas.deleteTask(id);
            console.log("TAREA BORRADA");
          }
        }
        break;
    }
    // //guardar db
    saveDb(tareas.listadoArr);
    await pausa();
  } while (opt !== "0");
};
main();
