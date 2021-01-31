let json = localStorage.getItem("json") ? JSON.parse(localStorage.getItem("json")) : [
    {
        name: "To do",
        tasks: [
            "1", "2"
        ]
    },
    {
        name: "In Progress",
        tasks: [
            "3", "4", "5", "6"
        ]
    },
    {
        name: "Completed",
        tasks: [
            "1", "2"
        ]
    }
]

let containerFragment = document.createDocumentFragment()

json.forEach((e, i) => {
    let container = document.createElement("div");
    container.classList.add("container")
    container.classList.add(i + "col")
    container.setAttribute("data-name", e.name)
    container.innerHTML = container.innerHTML + (`<span>${e.name}</span>`)
    for (let i = 0; i < e?.tasks?.length; i++) {
        container.innerHTML = container.innerHTML + (`<p class="draggable" draggable="true">${e.tasks[i]}</p>`)
    }
    containerFragment.append(container)
})

document.querySelector(".mainWrapper").append(containerFragment)
let draggables = document.querySelectorAll(".draggable")
let containers = document.querySelectorAll(".container")

draggables.forEach((drag) => {
    drag.addEventListener("dragstart", () => {
        drag.classList.add("dragging")
    })
    drag.addEventListener("dragend", () => {
        drag.classList.remove("dragging")
        getLatestJson()
    })
})

containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
        let dragging = document.querySelector(".dragging");
        let aft = afterElem(container, e.clientY)
        console.log(dragging)
        if (aft && aft !== null) {
            aft.before(dragging)
        } else
            container.append(dragging)
    })
})

const afterElem = (container, y) => {
    let drags = [...container.querySelectorAll(".draggable:not(.dragging)")]
    return drags.reduce((closest, child) => {
        let box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { element: child, offset: offset }
        } else
            return closest
    }, { offset: -Infinity }).element
}

const getLatestJson = () => {
    let mainWrap = document.querySelector(".mainWrapper");
    let final = []
    if (mainWrap?.childNodes?.length) {
        mainWrap.childNodes.forEach((node) => {
            if (node.nodeName === "DIV") {
                // console.log(node)
                let temp = {};
                node.childNodes.forEach((child) => {
                    if (child.nodeName === "P") {
                        if (temp['tasks'])
                            temp['tasks'].push(child.innerHTML)
                        else
                            temp['tasks'] = [child.innerHTML]
                    }
                })
                temp['name'] = node.dataset.name
                final.push(temp)
            }
        })
    }
    console.log(final)
    localStorage.setItem("json", JSON.stringify(final))
}

let addCol = () => {
    let drag = document.createElement("P")
    drag.classList.add("draggable")
    drag.setAttribute("draggable", true)
    drag.innerHTML = "ghgh"
    //append(`<p class="draggable" draggable="true">hhgh</p>`)
    drag.addEventListener("dragstart", () => {
        drag.classList.add("dragging")
    })
    drag.addEventListener("dragend", () => {
        drag.classList.remove("dragging")
    })
    document.querySelector(".container").append(drag)
    getLatestJson()
}