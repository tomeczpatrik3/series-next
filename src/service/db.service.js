const Datastore = require('nedb')



class DbService {

  findOnePromise(query) {
    return new Promise((resolve) => {
      this.db.findOne(query, (err, result) => {
        resolve(result);
      });
    });
  }

  insertPromise(doc) {
    return new Promise((resolve) => {
      this.db.update(
        { name: doc.name },
        doc,
        { upsert: true },
        () => resolve()
      );
    });
  }

  constructor() {
    this.db = new Datastore({ filename: './userdb', autoload: true });
  }

  getInformationByName(name) {
    return this.findOnePromise({ name });
  }

  saveInfo(info) {
    return this.insertPromise(info);
  }

}

module.exports = new DbService();
