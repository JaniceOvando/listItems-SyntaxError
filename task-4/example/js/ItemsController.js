// Create a ItemsController class
class ItemsController {
    // Set up the items and currentId property in the contructor
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }

    // Create the addItem method
    addItem(name, description,createdAt) {
        const item = {
            // Increment the currentId property
            id: this.currentId++,
            name: name,
            description: description,
            img: 'https://via.placeholder.com/150?text=MT',
            createdAt: createdAt
        };

        // Push the item to the items property
        this.items.push(item);
    }

    //Returns all items
    getItems() {
        return this.items;
    }
}

