const {v4:uuidv4} = require('uuid');
class Tarea{
    id = '';
    desc = '';
    completedaoEn = null;

    constructor(desc){
        this.id =uuidv4();
        this.desc = desc;
        this.completedaoEn = null
    }

}

module.exports = Tarea