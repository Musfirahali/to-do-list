const wrapper = document.querySelector(".wrapper");
const backBtn = document.querySelector(".back-btn");
const menuBtn = document.querySelector(".menu-btn");

const toggleScreen = () => {
    wrapper.classList.toggle("show-category");
};

menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);


const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blankBackdrop = document.querySelector(".blank-backdrop");


const toggleAddTaskForm = () => {
    addTaskBtn.classList.toggle("active");
    addTaskForm.classList.toggle("active");
    blankBackdrop.classList.toggle("active");
    
};

addTaskBtn.addEventListener("click", toggleAddTaskForm);
blankBackdrop.addEventListener("click", toggleAddTaskForm);

// categories & tasks

let categories = [
    {
        title:"Personal",
        img:"accountant.png",
    },
    {
        title:"Work",
        img:"work.png",
    },
    {
        title:"Health",
        img:"health.png",
    },
    {
        title:"Coding",
        img:"coding.png",
    },
    {
        title:"shopping",
        img:"shopping.jpg",
    },
    {
        title:"Education",
        img:"study.png",
    },
    {
        title:"Fitness",
        img:"wellness.png",
    },
    {
        title:"Finance",
        img:"finance.png",
    },

];

let tasks = [

];

let selectedCategory = categories[0];

const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategoryTasks = document.querySelector(".category-tasks");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");



const calculateTotal = () => {
    const categoryTasks = tasks.filter(
        (task) => task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );
    totalCategoryTasks.innerHTML = `${categoryTasks.length} Tasks`;
    totalTasks.innerHTML = tasks.length;
};

const renderCategories = () => {
    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
   //  get all the tasks of current category
           const categoryTasks = tasks.filter(
               (task) => task.category.toLowerCase() === category.title.toLowerCase()

    );
        //  div for rendercategories
        const div = document.createElement("div");
        div.classList.add("category");
        div.addEventListener("click", ()=>{
            wrapper.classList.add("show-category");
            selectedCategory = category;
            categoryTitle.innerHTML = category.title;
            categoryImg.src = `${category.img}`;
            calculateTotal();

            // render tasks whrn category change
            renderTasks();
        });
        div.innerHTML = `
        <div class="left">
                <img src="${category.img}" alt="${category.title}">
                <div class="content">
                    <h1>${category.title}</h1>
                    <p>${categoryTasks.length}</p>
                </div>
            </div>
            <div class="options">
                <div class="toggle-btn">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
        `;
        categoriesContainer.appendChild(div);
  });
};

const tasksContainer = document.querySelector(".tasks");

const renderTasks = () =>{
      tasksContainer.innerHTML="";
      const categoryTasks = tasks.filter(
        (task) => task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );

    // if no task for selected category
    if (categoryTasks.length === 0) {
        tasksContainer.innerHTML = `
        <p class="no-task">No tasks for this category</p>`;
    } else{
        // if there are tasks
        categoryTasks.forEach((task) => {
          const div = document.createElement("div");
          div.classList.add("task-wrapper");
          const label = document.createElement("label");
          label.classList.add("task");
          label.setAttribute("for", task.id);
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id =task.id;
          checkbox.checked=task.completed;

        //    add completion functionality on click checkbox

        checkbox.addEventListener("change",() =>{
            const index = tasks.findIndex((t) => t.id ===task.id);
            // change the true to false or vicee versa
            tasks[index].completed=!tasks[index].completed;
            // save inlocal
            saveLocal();
        });
          div.innerHTML= `
          <div class="delete"><i class="fa-solid fa-trash"></i></div>
          </div>
          `;
          label.innerHTML = `
                    <span class="checkmark"><i class="fa-solid fa-check"></i></span>
                    <p>${task.task}</p>
          `;
          label.prepend(checkbox);
          div.prepend(label);
          tasksContainer.appendChild(div);

        //   delete function
        const deleteButton = div.querySelector(".delete");
        deleteButton.addEventListener("click", () =>{
            const index = tasks.findIndex((t) => t.id === task.id);
            // remove the task
            tasks.splice(index, 1);
            saveLocal();
            renderTasks();
        });
        });
        renderCategories();
        calculateTotal();
    };
 };

// save and get task from local storage
const saveLocal = () =>  {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
const getLocal = () =>  {
    const localTasks = JSON.parse(localStorage.getItem("tasks"));
 
 //    if tasks found
   if(localTasks){
     tasks = localTasks;
   }
 };
// lets add funtion of new task

// render all the categories in select
const categorySelect = document.querySelector("#category-select");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");

const taskInput = document.querySelector("#task-input");

cancelBtn.addEventListener("click", toggleAddTaskForm);
addBtn.addEventListener("click", () =>{
  const task = taskInput.value;
  const category = categorySelect.value;

  if(task === "") {
    alert("please enter a task");
  }else{
    const newTask ={
      id : tasks.length + 1,
      task,
      category,
      completed: false, 
    };
    tasks.push(newTask);
    taskInput.value = "";
    saveLocal();
    toggleAddTaskForm();
    renderTasks();
  };
});


categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.title.toLowerCase();
    option.textContent = category.title;
    categorySelect.appendChild(option);
});


toggleScreen();
getLocal();
calculateTotal();
renderCategories();
renderTasks();