import Inventario from "./Inventario.js";
import Employee from "./Employee.js";

class Main {
  constructor() {
    let inventario = new Inventario(
      document.querySelector("#inventario"),
      document.querySelector("#info")
    );

    document.querySelector("#btnAdd").addEventListener("click", () => {
      let form = document.querySelector("#form");

      if (form.checkValidity() === true) {
        let name = document.querySelector("#name").value;
        let cantidad = document.querySelector("#cantidad").value;
        let sBirthday = document.querySelector("#birthday").value;
        sBirthday = sBirthday.split("-");

        let birthday = new Date(sBirthday[0], sBirthday[1] - 1, sBirthday[2]);

        let objEmployee = {
          name: name,
          cantidad: cantidad,
          birthday: birthday
        };

        let employee = new Employee(objEmployee);

        inventario.addEmployee(employee);
      }

      form.classList.add("was-validated");
    });
  }
}

let m = new Main();
