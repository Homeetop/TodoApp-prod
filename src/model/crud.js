import sendAsync from "./renderer";

export const save = (value) => {
  const query = `INSERT INTO tasks (topic,content,isDone) VALUES (${value})`;
  console.log(query);
  return sendAsync(query);
};

export const saveChanges = (value, condition) => {
  const query = `UPDATE tasks SET ${value} WHERE id = ${condition}`;
  console.log(query);
  return sendAsync(query);
};

export const erase = (conditions = "") => {
  const condition = conditions !== "" ? `WHERE id = ${conditions}` : "";
  const query = `DELETE FROM tasks ${condition}`;
  console.log(query);
  return sendAsync(query);
};

export const lookUP = (conditions = "", column = "") => {
  const condition = conditions !== "" ? `WHERE id = ${conditions}` : "";
  const query = `SELECT * FROM tasks ${condition}`;
  console.log(query);
  const result = sendAsync(query);
  //result.then((res) => console.log(res));

  if (column !== "") {
    return result.then((res) => (res ? res[0][column] : ""));
  } else {
    return result.then((res) => (res ? res : []));
  }
};
