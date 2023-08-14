import * as path from "path";
const Datastore = require("nedb");

export interface IContact {
  _id?: string;
  name: string;
  email: string;
}

export class Worker {
  private db: Nedb;
  constructor() {
    this.db = new Datastore({
      filename: path.join(__dirname, "contacts.db"),
      autoload: true,
    });
  }

  /**
   * Lists contacts
   *
   * @returns A promise that eventually resolves to an array of contacts
   */
  public async listContacts(): Promise<IContact[]> {
    return new Promise((inResolve, inReject) => {
      this.db.find({}, (inError: Error, inDocs: IContact[]) => {
        if (inError) {
          inReject(inError);
        } else {
          inResolve(inDocs);
        }
      });
    });
  }

  /**
   * Adds a contact
   *
   * @param inContact The contact to add
   * @returns A promise that eventually resolves to the added contact
   */
  public async addContact(inContact: IContact): Promise<IContact> {
    return new Promise((inResolve, inReject) => {
      this.db.insert(inContact, (inError: Error | null, inNewDoc: IContact) => {
        if (inError) {
          inReject(inError);
        } else {
          inResolve(inNewDoc);
        }
      });
    });
  }

  /**
   * Deletes a contact
   *
   * @param inId The ID of the contact to delete
   * @returns A promise that eventually resolves to any
   */
  public async deleteContact(inId: string): Promise<any> {
    return new Promise((inResolve, inReject) => {
      this.db.remove(
        { _id: inId },
        {},
        (inError: Error | null, inNumRemoved: number) => {
          if (inError) {
            inReject(inError);
          } else {
            inResolve("ok");
          }
        }
      );
    });
  }

  public async updateContact(
    inId: string,
    inContact: IContact
  ): Promise<IContact> {
    return new Promise((inResolve, inReject) => {
      this.db.update(
        { _id: inId },
        inContact,
        {},
        (inError: Error | null, inNumReplaced: number, inUpsert: boolean) => {
          if (inError) {
            inReject(inError);
          } else {
            inResolve(inContact);
          }
        }
      );
    });
  }
}
