let items = [];

const itemsDiv = document.getElementById("items");
const input = document.getElementById("itemInput");
const storageKey = "items";

function renderItem() {
    itemsDiv.innerHTML = ""; // Use empty string to clear instead of null
    // Loop through both index (idx) and item of the array
    for (const [idx, item] of Object.entries(items)) {
        const container = document.createElement("div");
        // Separate container by 10px
        container.style.marginBottom = "10px";

        const text = document.createElement("p");
        // Put the text and buttons in line.
        text.style.display = "inline";
        text.style.marginRight = "10px";
        text.textContent = item;

        // Create delete button
        const button = document.createElement("button");
        button.textContent = "Delete";
        // The function removeItem() will not be called right away
        button.onclick = () => removeItem(idx);

        container.appendChild(text);
        container.appendChild(button);

        itemsDiv.appendChild(container); // Append container instead of text
    }
}

function loadItems() {
    const oldItems = localStorage.getItem(storageKey);
    if (oldItems) items = JSON.parse(oldItems);
    renderItem();
}

function saveItems() {
    const stringItems = JSON.stringify(items);
    localStorage.setItem(storageKey, stringItems);
}

function addItem() {
    const value = input.value;
    if (!value) {
        alert("You can't add an empty item");
        return;
    }
    items.push(value);
    renderItem();
    input.value = "";
    saveItems();
}

function removeItem(idx) {
    items.splice(idx, 1); // Remove extra brace
    renderItem();
    saveItems();
}

document.addEventListener("DOMContentLoaded", loadItems);