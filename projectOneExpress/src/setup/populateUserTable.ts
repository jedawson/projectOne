import userService from "../user/user.service";
import { Amount } from "../user/user";

let amount = new Amount();
function populateUserTable() {
  userService
    .addUser({
      name: "jamesbond",
      password: "pass",
      role: "Employee",
      availableAmount: amount,
      boss: "Q",
      bosses: ["Q", "M", "GCHQ"],
    })
    .then(() => {});
  userService
    .addUser({
      name: "Q",
      password: "pass",
      role: "Supervisor",
      boss: "M",
      bosses: ["M", "GCHQ"],
    })
    .then(() => {});
  userService
    .addUser({
      name: "M",
      password: "pass",
      role: "Head",
      boss: "GCHQ",
      bosses: ["GCHQ"],
    })
    .then(() => {});
  userService
    .addUser({
      name: "GCHQ",
      password: "pass",
      role: "BenCo",
      boss: "Gov",
      bosses: ["Gov"],
    })
    .then(() => {});
}
populateUserTable();
