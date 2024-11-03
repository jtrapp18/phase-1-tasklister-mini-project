document.addEventListener("DOMContentLoaded", () => {
  // your code here

  const myForm = document.querySelector("#create-task-form")
  const descr = myForm.querySelector("#new-task-description")
  const due = myForm.querySelector("#new-task-due-date")
  const priority = myForm.querySelector("#new-task-priority")
  
  myForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if (descr.value != "") {
      const myToDos = document.querySelector("#list .tasks")
      const completedToDos = document.querySelector("#complete .tasks")
      
      // create new task
      const newTask = document.createElement("li")
      newTask.classList.add("disabled")
      newTask.classList.add(priority.value)

      // add description to new task
      const newTaskDesc = document.createElement("input")
      newTaskDesc.value = descr.value
      newTaskDesc.disabled = true
      newTaskDesc.classList.add("task-description")
      newTask.append(newTaskDesc)

      // add priority to new task
      const newTaskPriority = document.createElement("select")
      newTaskPriority.innerHTML = priority.innerHTML // copy the user options from the inputs
      newTaskPriority.value = priority.value
      newTaskPriority.disabled = true
      newTaskPriority.classList.add("task-priority")
      newTaskPriority.addEventListener("change", ()=> {
        ["high", "medium", "low"].forEach(priority => {
          newTask.classList.remove(priority)})
        newTask.classList.add(newTaskPriority.value)
      })
     
      newTask.append(newTaskPriority)

      // add due date to new task
      const newTaskDue = document.createElement("input")
      newTaskDue.type = "date"
      newTaskDue.value = due.value
      newTaskDue.disabled = true
      newTaskDue.classList.add("task-due-date")

      newTask.append(newTaskDue)

      // add button to edit task
      const editBtn = document.createElement("button")
      editBtn.textContent = "edit"
      editBtn.addEventListener("click", () => {
        if (editBtn.textContent === "edit") {
          editBtn.textContent = "save"
          newTaskDesc.disabled = false
          newTaskDue.disabled = false
          newTaskPriority.disabled = false
          newTask.classList.remove("disabled")}
        else if (editBtn.textContent === "save") {
          editBtn.textContent = "edit"
          newTaskDesc.disabled = true
          newTaskDue.disabled = true
          newTaskPriority.disabled = true
          newTask.classList.add("disabled")}
        })
      newTask.append(editBtn)

      // add button to mark task complete (delete task)
      const completeBtn = document.createElement("button")
      completeBtn.textContent = "✓"
      completeBtn.addEventListener("click", () => {
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti()

        completedToDos.append(newTask)
        completeBtn.remove()
        editBtn.remove()

        sortList(completedToDos)
      })
      newTask.append(completeBtn)

      // add button to delete task
      const deleteBtn = document.createElement("button")
      deleteBtn.textContent = "✗"
      deleteBtn.addEventListener("click", () => {newTask.remove()})
      newTask.append(deleteBtn)

      // add new task with all specified attributes
      myToDos.append(newTask)
      sortList(myToDos)

      // reset form values
      descr.value = ""

    }
  })
});

function sortList(activeList) {

  ["high", "medium", "low"].forEach(priority => {
    const priorityTasks = Array.from(activeList.children).filter(element => 
      element.classList.contains(priority));

      priorityTasks.forEach(task => {
        activeList.append(task)
      })
  })
}
