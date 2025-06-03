{

    let tasks = [];
    let hideDoneTasks = false;

    const removeTask = (taskIndex) => {
        tasks = tasks.filter((_, index) => index !== taskIndex);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => 
            index === taskIndex 
            ? { ...task, done: !task.done }
            : task
        );
        render();
    }

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const finishAllTasks = () => {
        tasks = tasks.map(task => ({ ...task, done: true }))
        render();
    };
    

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
        if (!hideDoneTasks || !task.done) {
            tasksListHTMLContent += `
                <li class="tasks__item js-task">
                    <button class="tasks__button tasks__button--done js-toggleDone">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="tasks__button tasks__button--remove js-remove">
                        🗑
                    </button>
                </li>
            `;
        }
    }

    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
};

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks

        render();
    };
    
    const BindButtonsEvents = () => {
        const hideDoneButton = document.querySelectorAll(".js-hide");
        hideDoneButton.forEach((hideDoneButton) => {
          hideDoneButton.addEventListener("click", toggleHideDoneTasks);
        });

        const finishAllButton = document.querySelectorAll(".js-finishAll");
        finishAllButton.forEach((finishAllButton) => {
          finishAllButton.addEventListener("click", finishAllTasks);
        });
      };


    const renderButtons = () => {
        let showButtons = "";

        if (tasks.length > 0) {
            showButtons = `
                <button class="section__buttons--hideDoneTasks js-hide">
                    ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button class="section__buttons--finishAllTasks js-finishAll">
                    Ukończ wszystkie
                </button>
            `;
        }

        document.querySelector(".js-buttons").innerHTML = showButtons;
    };
    

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        BindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}