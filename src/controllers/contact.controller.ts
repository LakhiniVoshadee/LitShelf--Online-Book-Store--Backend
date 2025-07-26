import {Request, Response} from 'express'
import * as contactService from "../services/contact.service";


export const getAllContacts = (req: Request, res: Response) => {
    try {
        const contacts = contactService.getAllContacts();
        res.status(200).json(contacts)
    }catch (error) {
        console.error(error)
        res.status(500).json({error: 'Something went wrong'});
    }

}

export const saveContact = (req: Request, res: Response) => {
    try{
        const newContact = req.body;
        const validationError = contactService.validateContact(newContact);
        if (validationError) {
            res.status(400).json({error: validationError});
            return;
        }
        const savedContact = contactService.saveContact(newContact);
        res.status(201).json(savedContact);
    }catch (error) {
        console.error(error)
        res.status(500).json({error: 'Something went wrong'});
    }
}

export const getContact = (req: Request, res: Response) => {
    const contactId = parseInt(req.params.id);
    if(isNaN(contactId)){
        res.status(400).json({error: 'Invalid contact id'});
        return;
    }
    const contact = contactService.getContact(contactId);
    if (!contact) {
        res.status(404).json({error: 'Contact not found'});
        return;
    }
    res.status(200).json(contact);
}