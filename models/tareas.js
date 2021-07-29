const Tarea = require("./tarea");
class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }
  constructor() {
    this._listado = {};
  }
  deleteTask( id=""){
    if(this._listado[id]){
        delete this._listado[id]
    }
  }
  loadTAsks(tareas = []) {
    tareas.forEach((item) => {
      this._listado[item.id] = item;
    });
  }
  crearTarea(des = "") {
    const tarea = new Tarea(des);
    this._listado[tarea.id] = tarea;
  }
  listadoCompleto() {
    //1 en verede
    //completada en verde y pendiente en rojo
    //1.alma:: completada o pendiente
    // console.log(this._listado)
    // console.log(this.listadoArr[0]['desc'])
    this.listadoArr.forEach((tarea, index) => {
      const idx = `${index + 1}`.green;
      const estado =
        tarea.completedaoEn === null ? "pendiente".red : "completado".green;
      console.log(`${idx}. ${tarea.desc}:: ${estado}`);
    });
  }
  listarTareasCompletadasPendientes(complete) {
    let count = 0;

    this.listadoArr.forEach((tarea) => {
      const { desc, completedaoEn } = tarea;
      const estado = completedaoEn ? "completado".green : "Pendiente".red;

      if (complete) {
        if (completedaoEn) {
          count++;
          console.log(
            `${(count + ".").green} ${desc} =>  ${completedaoEn.green} :) `
          );
        }
      } else {
        if (!completedaoEn) {
          count++;
          console.log(`${(count + ".").green} ${desc} =>  ${estado} :( `);
        }
      }
    });
  }
  toggleCompletadas(ids=[]){
      ids.forEach(id=>{
          const tarea = this._listado[id];
          if(!tarea.completedaoEn){
            tarea.completedaoEn = new Date().toISOString()
          }
      })
      this.listadoArr.forEach(tarea=>{
          if(!ids.includes(tarea.id)){
             this._listado[tarea.id].completedaoEn = null
            
          }
      })
  }
}

module.exports = Tareas;
