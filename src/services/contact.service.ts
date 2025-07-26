import {contactList} from "../db/db";
import {Contact} from "../model/contact.model";


// Get all contacts service logic

export const getAllContacts = (): Contact[] => {
    return contactList;
}

export const saveContact = (Contact: Contact) => {
    contactList.push(Contact);
    return Contact;
}

export const getContact = (id: number): Contact | undefined => {
    return contactList.find(contact => contact.id === id);
}

export const validateContact = (Contact: Contact) => {
    if (!Contact.id || !Contact.name || !Contact.phone || !Contact.email || !Contact.subject || !Contact.message) {
        return 'All fields are required';
    }
    return null;
}