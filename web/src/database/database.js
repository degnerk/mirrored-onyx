import { openDB } from 'idb';


const DB_NAME = 'NodeApp';
const DB_VERSION = 1;
const STORE_NODES = 'nodes';
const STORE_LINKS = 'links';

let db;

// Initialize IndexedDB
export async function initDB() {
    db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NODES)) {
                db.createObjectStore(STORE_NODES, { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains(STORE_LINKS)) {
                db.createObjectStore(STORE_LINKS, { autoIncrement: true });
            }
        },
    });

    // Ensure the central node exists
    const nodes = await getAllNodes();
    if (nodes.length === 0) {
        await addCentralNode();
    }
}

// Add a central node
export async function addCentralNode() {
    const centralNode = { id: `node-${Date.now()}`, top: 206, left: 465, type: 'Central Node', ring:0, place:0,id:0, childCount:0 };
    await addNodeToDB(centralNode);
}

// Add a node
export async function addNodeToDB(node) {
    return db.put(STORE_NODES, node);
}

// Fetch all nodes
export async function getAllNodes() {
    return db.getAll(STORE_NODES);
}

// Add a link
export async function addLinkToDB(link) {
    return db.put(STORE_LINKS, link);
}

// Fetch all links
export async function getAllLinks() {
    return db.getAll(STORE_LINKS);
}

// Reset the database
export async function resetDatabase() {
    const tx = db.transaction([STORE_NODES, STORE_LINKS], 'readwrite');
    await tx.objectStore(STORE_NODES).clear();
    await tx.objectStore(STORE_LINKS).clear();
    await tx.done;
    await initDB();
}