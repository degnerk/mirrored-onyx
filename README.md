# Onyx Project Manager \[DEMO\] README

---

**Onyx Project Manager** is a project-management program that allows users to link nodes, ideas, and features to better visualize their upcoming project. Onyx offers an easy to use interface designed for all users to easily create their next big project.

---

## Background

### What is a Node?
A **node** is a type of element that can  display a variety of information. There are two different types of nodes, *Central Nodes* and *Sub-Nodes*.
#### Central Nodes
Responsible for holding all your ideas and features together. This central node should be responsible for identifying your project.

>Example: If we were to re-create the popular game [Wordle](https://www.nytimes.com/games/wordle/index.html), we would label our central node "Wordle"

#### Sub-Nodes
Responsible for holding general topics, features, and ideas revolved around a central node.

>Example: If we were to re-create the popular game [Wordle](https://www.nytimes.com/games/wordle/index.html), we would create some sub-nodes such as "Enter Word" and "Make Guess"

*Sub-Nodes can contain sub-nodes*
- *Max of 2 layers*

### Main Project Board
Your **project board** will contain all your created **nodes**, eventually forming into a [Content Map](https://blog.hubspot.com/marketing/content-mapping-template-personalize-marketing). Proper utilization of this structure will make it easier to visualize your upcoming project, and what all needs to be done.

---

## Features
### Creating a Node
You can create a node by clicking on the "New Node" button on the sidebar
- Note: A node cannot be made unless currently selecting a node

There are two main sub-nodes that can be created:
- Text Node: A .txt file
- File Node: A different variant of a file

### Saving Project
The project is saved with IndexDB, meaning the integrity of your projects remain safe through your session.

### Reset Project
A project can be reverted back to its original state by clicking on the "Reset" button on the sidebar.

---

## Deploying the Project
1. Switch to the `web` directory by entering the command `cd .\web\`
    - Note: Ensure in your terminal you are located at `C:\Users\username\WebstormProjects\onyx-demo>`
    - On success, should end up at: `C:\Users\username\WebstormProjects\onyx-demo\web>`
2. Run the command `npm run build`
3. Run the command `npm start`
    - May take a few seconds to startup, on success, should direct you to your default browser on `localhost:3000` with the Onyx demo loaded

### Troubleshooting
- Is there something running on `localhost:3000` that is not allowing the project to run?
    - Try to kill any running ports blocking the program by following [this tutorial](https://nerdschalk.com/how-to-kill-a-process-on-port-on-windows-11/)
    - Once the port `3000` has been killed, run through step 3 again
- Was the project properly cloned?
    - Improper cloning may lead to undesired results
    - Deleting the project folder and clone the project again. Then start again from step 1
- Do you have the correct dependencies installed?
    - Main being Node.js, if you do not have Node.js installed, you can download it [here](https://nodejs.org/en/download/package-manager), and run the [setup](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

---

## Project Roadmap

### onyx-demo
- \web\
    - \public\
        - **index.html** - Base HTML file for implementing react components
        - onyx.png
    - \src\
        - \components\
            - **Grid.jsx** - Generates a 17x17 grid on the project board
            - **Header.jsx** - Header item responsible for displaying the project title and logo
            - **Node.jsx** - Represents a node item on the project board
            - **ProjectNodes.jsx** - The collage of all nodes on the project board
            - **Sidebar.jsx** - Sidebar component responsible for holding editing features for the project board. Includes features such as adding a new node and resetting the project to its initial state
            - **SidebarIcon.jsx** - Represents the styling format of the buttons on the sidebar
        - \controller\
            - **logic.js** - Contains all of the general logic that does not apply to a component. Components are reserved for front end logic only. If the logic does not apply to the front end, then it is stored here.
        - \model\
            - **database.js** - Stores the current project in IndexDB
        - **App.css**
        - **App.jsx**
        - **index.js** - Main root of the React program
    - package.json
- README.md

---

## Tech Dependencies
- Node.JS
- React

---

## Development Team
Developed by Kadie Degner, Rudolph Evonich, Anthony Marchello, and Alexander Pearsall