const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid")

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  }
  
async function getContactById(contactId) {
    const contact = await listContacts();
    const result = contact.find(item => item.id === contactId);

    return result || null;
  }
  
async function removeContact(contactId) {
    const contact = await listContacts();
    const index = contact.findIndex(item => item.id === contactId);
    if(index === -1) {
        return null
    };
    
    const [result] = contact.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

    return result;

  }
  
async function addContact(name, email, phone) {
    const contact = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    
    contact.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
    return newContact;



}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}