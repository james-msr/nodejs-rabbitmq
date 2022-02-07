import mongoose from 'mongoose';
import { ContactSchema } from '../models/Contact';
import { Request, Response } from 'express';
import { Producer } from '../services/producer';

const Contact = mongoose.model('Contact', ContactSchema);
export class ContactController{
    public addNewContact (req: Request, res: Response) {
        let newContact = new Contact(req.body);

        newContact.save((err:any, contact:any) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
        const producer = new Producer()
        producer.producer('Added new contact')
    }

    
    public getContacts (req: Request, res: Response) {
        Contact.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
        const producer = new Producer()
        producer.producer('Got contacts')
    }


    public getContactWithID (req: Request, res: Response) {
        Contact.findById(req.params.contactId, (err:any, contact:any) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
        const producer = new Producer()
        producer.producer('Got contact')
    }


    public updateContact (req: Request, res: Response) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
        const producer = new Producer()
        producer.producer('Contact updated')
    }


    public deleteContact (req: Request, res: Response) {
        Contact.deleteOne({ _id: req.params.contactId }, (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
        const producer = new Producer()
        producer.producer('Contact deleted')
    }
}