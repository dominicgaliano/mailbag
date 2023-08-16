import axios, { AxiosResponse } from "axios";
import { config } from "./config";

export interface IContact {
  _id?: string;
  name: string;
  email: string;
}

export class Worker {
  /**
   * Lists contacts
   *
   * @returns A promise that eventually resolves to an array of contacts
   */
  public async listContacts(): Promise<IContact[]> {
    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/contacts`
    );
    return response.data;
  }

  /**
   * Adds a contact
   *
   * @param inContact The contact to add
   * @returns A promise that eventually resolves to the added contact
   */
  public async addContact(inContact: IContact): Promise<IContact> {
    const response: AxiosResponse = await axios.post(
      `${config.serverAddress}/contacts`,
      inContact
    );
    return response.data;
  }

  /**
   * Deletes a contact
   *
   * @param inId The ID of the contact to delete
   * @returns A promise that eventually resolves to void
   */
  public async deleteContact(inId: string): Promise<void> {
    await axios.delete(`${config.serverAddress}/contacts/${inId}`);
  }

  public async updateContact(
    inId: string,
    inContact: IContact
  ): Promise<IContact> {
    const response: AxiosResponse = await axios.put(
      `${config.serverAddress}/contacts/${inId}`,
      inContact
    );
    return response.data;
  }
}
