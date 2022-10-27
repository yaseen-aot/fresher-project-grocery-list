const section = document.querySelector(".sectionone");
const msg = document.querySelector(".msg");
const inputgro = document.getElementById("gro-input");
const submitBtn = document.getElementById("btnid");
const clearbtn = document.getElementById("clrbtn");
const itemdiv = document.querySelector(".gro-div");
const itemlist = document.querySelector(".gro-list");
const groform = document.querySelector(".gro-form");


let editElement;
let editFlag = false;
let editID = "";


// event listeners for submit form
groform.addEventListener("submit", addItem);
clearbtn.addEventListener("click",clearitems)
window.addEventListener("DOMContentLoaded", setupItems);


function addItem(e) {
    e.preventDefault();
    const value = inputgro.value;
    const id = new Date().getTime().toString();
  
    if (value !== "" && editFlag == false) {
      const element = document.createElement("article");
      element.classList.add("gro-item");
      let attr = document.createAttribute("data-id");
      attr.value = id;
      element.setAttributeNode(attr);
      element.innerHTML = `<p id="gro-title">${value}</p>
      <div class="btns">
        <button type="button" class="editbutton" id="editbtn"style="border: none;">
          <i class="bi bi-pencil-square " ></i>
        </button>
        <button type="button" class="deletebutton" id="dltbtn"style="border: none;" >
          <i class="bi bi-trash-fill" ></i>
        </button>
      </div>
            `;
        itemlist.appendChild(element);
        popMsg("item added to the list", "success");
        itemdiv.classList.add("showgrocery");
        toInitial()
        addLocalStorage(id , value)



      // add event listeners to edit button;
      const editBtn = element.querySelector(".editbutton");
      editBtn.addEventListener("click", editItem);
      // add event listeners to delete button;
      const deleteBtn = element.querySelector(".deletebutton");
      deleteBtn.addEventListener("click", deleteItem);

      


    } else if (value !== "" && editFlag == true) {
      editElement.innerHTML = value;
      popMsg("Item edited successfully", "success");
      editLocalStorage(editID, value)
      toInitial()
  
     
    } else {
      popMsg("enter any input", "danger");
    }
  }

  function popMsg(text, action) {
    msg.textContent = text;
    msg.classList.add(`msg-${action}`);
    // remove alert
    setTimeout(function () {
      msg.textContent = "";
      msg.classList.remove(`msg-${action}`);
    }, 2000);
  }

 

  function clearitems(){
    const itemgroceries = document.querySelectorAll(".gro-item")
    if (itemgroceries.length > 0) {
        itemgroceries.forEach(function (item) {
          itemlist.removeChild(item);
        });
      }
      itemdiv.classList.remove("showgrocery");
      popMsg("Items removed", "danger");
      toInitial()
      localStorage.removeItem("itemlist");
  }

  function editItem(e){
    
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    inputgro.value = editElement.innerHTML
    editFlag = true
    editID = element.dataset.id
    submitBtn.textContent = "edit";
    console.log("edititem working")
  }



  function deleteItem(e){
    console.log("edititem working")
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    itemlist.removeChild(element)

    if (itemlist.children.length === 0) {
    itemdiv.classList.remove("showgrocery");
  }
  popMsg("item deleted successfully","danger")
  toInitial()
  removeFromLocalStorage(id)
}

function toInitial() {
    editFlag = false;
    editID = "";
    inputgro.value = "";
    submitBtn.textContent = "submit";
  }

  function addLocalStorage(id , value){
    const inputgro = {id , value}
    let itemgroceries = getLocalStorage()
    itemgroceries.push(inputgro)
    localStorage.setItem("itemlist",JSON.stringify(itemgroceries))
  }

  function getLocalStorage(){
    return localStorage.getItem("itemlist") ? JSON.parse(localStorage.getItem("itemlist")) : []

  }

  function removeFromLocalStorage(id) {
    let items = getLocalStorage()
  
    items = items.filter(function (item) {
      if (item.id !== id) {
        console.log("dg")
        return item;
      }
    });
  
    localStorage.setItem("itemlist", JSON.stringify(items));
  }

  function editLocalStorage(id, value) {
    let items = getLocalStorage();
  
    items = items.map(function (item) {
      if (item.id === id) {
        item.value = value;
      }
      return item;
    });
    localStorage.setItem("itemlist", JSON.stringify(items));
  }

  function setupItems() {
    let items = getLocalStorage();
  
    if (items.length > 0) {
      items.forEach(function (item) {
        createList(item.id, item.value);
      });
      itemdiv.classList.add("showgrocery");
    }
  }

  function createList(id,value){
    const element = document.createElement("article");
    element.classList.add("gro-item");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p id="gro-title">${value}</p>
    <div class="btns">
      <button type="button" class="editbutton" id="editbtn"style="border: none;">
        <i class="bi bi-pencil-square " ></i>
      </button>
      <button type="button" class="deletebutton" id="dltbtn"style="border: none;" >
        <i class="bi bi-trash-fill" ></i>
      </button>
    </div>
          `;

          
      // add event listeners to edit button;
      const editBtn = element.querySelector(".editbutton");
      editBtn.addEventListener("click", editItem);
      // add event listeners to delete button;
      const deleteBtn = element.querySelector(".deletebutton");
      deleteBtn.addEventListener("click", deleteItem);

      itemlist.appendChild(element);
  }




