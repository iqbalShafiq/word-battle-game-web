import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

class SignalRService {
  private connection: HubConnection | null = null;
  private hubUrl = 'http://localhost:5098/gamehub';

  public startConnection = async () => {
    if (this.connection) return;
    this.connection = new HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    try {
      await this.connection.start();
      console.log('SignalR Connected');
    } catch (err) {
      console.error('SignalR Connection Error:', err);
    }
  };

  public stopConnection = async () => {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
      console.log('SignalR Disconnected');
    }
  };

  public on = (event: string, callback: (...args: any[]) => void) => {
    this.connection?.on(event, callback);
  };

  public off = (event: string, callback: (...args: any[]) => void) => {
    this.connection?.off(event, callback);
  };

  public invoke = async (method: string, ...args: any[]) => {
    if (!this.connection) throw new Error('SignalR not connected');
    return this.connection.invoke(method, ...args);
  };
}

const signalRService = new SignalRService();
export default signalRService;
