let btn = document.querySelector(".btn");
let inpName = document.querySelector(".input-name");
let inpEmail = document.querySelector(".input-email");
let inpImg = document.querySelector(".input-img");
let inpPhone = document.querySelector(".input-phone");
let list = document.querySelector(".task-list");

btn.addEventListener("click", () => {
  if (
    !inpName.value.trim() &&
    !inpEmail.value.trim() &&
    !inpImg.value.trim() &&
    !inpPhone.value.trim()
  ) {
    alert("заполните поле пожалуйста!!!");
    return;
  }

  let obj = {
    name: inpName.value,
    email: inpEmail.value,
    img: inpImg.value,
    phone: inpPhone.value,
  };

  setItemToStorage(obj);
  createElement();
  inpName.value = ""; // очищаем инпут
  inpEmail.value = ""; // очищаем инпут
  inpImg.value = ""; // очищаем инпут
  inpPhone.value = ""; // очищаем инпут
});

function setItemToStorage(task) {
  if (!localStorage.getItem("task-data")) {
    localStorage.setItem("task-data", "[]");
  }

  let data = JSON.parse(localStorage.getItem("task-data"));

  data.push(task);

  localStorage.setItem("task-data", JSON.stringify(data));
}

createElement();

function createElement() {
  let newData = JSON.parse(localStorage.getItem("task-data"));
  list.innerHTML = "";
  if (newData !== null) {
    newData.forEach((item, index) => {
      let li = document.createElement("li");

      li.innerHTML += `<div>
      <h2>${item.name}</h2>
      <h5>${item.email}</h5>
      <h6>${item.phone}</h6>
      <img src=${item.img} width='300px' alt='picture'/>
      <hr/>
      <button id=${index} class='btn-edit'>Edit</button>
      <button id=${index} class='btn-delete'>Delete</button>
      </div>`;

      list.append(li);
    });
  }
  btnDelete = document.querySelectorAll(".btn-delete");
  btnDelete.forEach((deleteTask) => {
    deleteTask.addEventListener("click", (e) => {
      let index = e.target.id;
      deleteElement(index);
    });
  });

  btnEdit = document.querySelectorAll(".btn-edit");
  btnEdit.forEach((deleteTask) => {
    deleteTask.addEventListener("click", (e) => {
      let index = e.target.id;
      editElement(index);
    });
  });
}

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("task-data"));

  data.splice(index, 1);
  localStorage.setItem("task-data", JSON.stringify(data));
  createElement();
}

// ? edit

let mainModal = document.querySelector(".main-modal");
let inpNameEdit = document.querySelector(".inp-name");
let inpEmailEdit = document.querySelector(".inp-email");
let inpImgEdit = document.querySelector(".inp-img");
let inpPhonEdit = document.querySelector(".inp-phone");

let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");

function editElement(index) {
  mainModal.style.display = "block";

  let data = JSON.parse(localStorage.getItem("task-data"));

  inpNameEdit.value = data[index].name;
  inpEmailEdit.value = data[index].email;
  inpImgEdit.value = data[index].img;
  inpPhonEdit.value = data[index].phone;

  inpNameEdit.setAttribute("id", index);
}

btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});

btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("task-data"));

  let index = inpEdit.id;

  if (!inpEdit.value.trim()) {
    alert("запольните поле!");
    return;
  }

  let editedTask = {
    name: inpEdit.value,
    email: inpEdit.value,
    img: inpEdit.value,
    phone: inpEdit.value,
  };

  data.splice(index, 1, editedTask);

  localStorage.setItem("task-data", JSON.stringify(data));

  mainModal.style.display = "none";

  createElement();
});
