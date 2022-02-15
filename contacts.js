const fs = require("fs/promises");
const { randomUUID } = require("crypto");
const { dirname } = require("path");
const path = require("path");
const { get } = require("http");

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, "./db/contact.json"),
    "utf8"
  );
  const result = JSON.parse(content);

  return result;
};

async function addContact(name, email, phone) {
  const contacts = await readContent();
  const newContact = {
    id: randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "./db/contact.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}

async function listContacts() {
  return await readContent();
}

async function getContactById(contactId) {
  const contacts = await readContent();
  const contact = contacts.find((el) => el.id === contactId);
  return contact ? contact : "contact is not exist";
}

async function removeContact(contactId) {
  const contacts = await readContent();
  const deletedContact = await getContactById(contactId);
  const newContacts = contacts.filter((el) => el.id !== contactId);
  await fs.writeFile(
    path.join(__dirname, "./db/contact.json"),
    JSON.stringify(newContacts, null, 2)
  );
  return deletedContact ? deletedContact : "contact is not exist";
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
