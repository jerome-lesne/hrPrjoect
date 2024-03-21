const editEmployee = document.querySelectorAll(".editEmployee");
const editEmployeeWindow = document.querySelector("#editEmployeeWindow");
const closeBtn = document.getElementById("closeBtn");
const formEditEmployee = document.querySelector("#editEmployeeWindow form");
console.log(formEditEmployee);

editEmployee.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
        editEmployeeWindow.classList.remove("hidden");
        console.log(editBtn.id);
        formEditEmployee.setAttribute(
            "action",
            `/update-employee/${editBtn.id}`,
        );
    });
});

closeBtn.addEventListener("click", function () {
    editEmployeeWindow.classList.add("hidden");
});
