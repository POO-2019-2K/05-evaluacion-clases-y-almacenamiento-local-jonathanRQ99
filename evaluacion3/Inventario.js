import Employee from "./Employee.js";

export default class Inventario {
  constructor(tableInventario, tableInfo) {
    this._tableInventario = tableInventario;
    this._tableInfo = tableInfo;
    this._numEmployees = 0;
    this._sumAge = 0;
    this._employees = [];
    localStorage.removeItem("employees");

    this._initTables();
  }

  _initTables() {
    let lsEmployees = JSON.parse(localStorage.getItem("employees"));

    if (lsEmployees === null) {
      return;
    }
    lsEmployees.forEach( (e, index) => {
      e.birthday = new Date(e.birthday);
      this._addToTable(new Employee(e));
    });
  }

  _addToTable(employee) {
    let row = this._tableInventario.insertRow(-1);

    let cellName = row.insertCell(0);
    let cellcantidad = row.insertCell(1);
    let cellBirthday = row.insertCell(2);
    let cellAge = row.insertCell(3);
    let cellCosto = row.insertCell(4);

    cellName.innerHTML = employee.name;
    cellcantidad.innerHTML = employee.cantidad;
    cellCosto.innerHTML = employee.costo;
    cellBirthday.innerHTML = employee.getBirthdayAsString();
    cellAge.innerHTML = employee.getAge();

    this._numEmployees++; // this._numEmployees = this._numEmployees + 1
    this._sumAge += employee.getAge(); // this._sumAge = this._sumAge + employee.getAge()

    this._tableInfo.rows[0].cells[1].innerHTML = this._numEmployees;

    this._tableInfo.rows[1].cells[1].innerHTML =
      this._sumAge / this._numEmployees;

    let objEmployee = {
      name: employee.name,
      cantidad: employee.cantidad,
      birthday: employee.birthday
    };

    this._employees.push(objEmployee);
  }

  _findEmployee(cantidad) {
    let foundAt = -1;

    this._employees.forEach((e, index) => {
      if(e.cantidad === cantidad){
      foundAt = index;
      return;
      }
    });
    return foundAt;
  }

  addEmployee(employee) {
    let found = this._findEmployee(employee.cantidad);

    if (found >= 0) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: "el producto ya esta registrado"
      });
      return;
    }

    this._addToTable(employee);
    localStorage.setItem("employees", JSON.stringify(this._employees));
  }
}