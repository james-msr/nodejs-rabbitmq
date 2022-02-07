import {Request, Response} from "express";
import { ContactController } from "../controllers/ContactController";

export class Routes {

    public contactController: ContactController = new ContactController();

    public routes(app: any): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })

        // Contacts
        app.route('/contacts')
        // GET endpoint
        .get(this.contactController.getContacts)
        // POST endpoint
        .post(this.contactController.addNewContact)

        // Contact detail
        app.route('/contacts/:contactId')
        // get specific contact
        .get(this.contactController.getContactWithID)
        .put(this.contactController.updateContact)
        .delete(this.contactController.deleteContact)
    }
}