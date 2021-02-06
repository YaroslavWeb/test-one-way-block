import axios, { AxiosInstance, AxiosResponse } from "axios"
import { IDataMessage } from "interfaces"

class Api {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      headers: {
        common: {
          Accept: "application/json",
        },
      },
    })
  }

  async getChatMessages(
    skip: number,
    limit: number
  ): Promise<AxiosResponse<Array<IDataMessage>>> {
    const url = `https://test-task-chat-4tmzp.ondigitalocean.app/api/messages?skip=${skip}&limit=${limit}`
    console.log("getChatMessages", url)
    return await this.instance.get(url)
  }
}

export default new Api()
