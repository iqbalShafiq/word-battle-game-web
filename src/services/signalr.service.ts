import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
  HubConnectionState,
} from '@microsoft/signalr';

class SignalRService {
  private connection: HubConnection | null = null;
  private hubUrl = 'http://localhost:5098/gamehub';

  public startConnection = async () => {
    if (this.connection) {
      if (this.connection.state === HubConnectionState.Connected) return;
      if (this.connection.state === HubConnectionState.Connecting) {
        await this.waitForConnected();
        return;
      }
    } else {
      this.connection = new HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
    }
    try {
      await this.connection.start();
      await this.waitForConnected();
      console.log('SignalR Connected');
    } catch (err) {
      console.error('SignalR Connection Error:', err);
    }
  };

  private waitForConnected = async (timeout = 5000) => {
    if (!this.connection) return;
    const start = Date.now();
    while (this.connection.state !== HubConnectionState.Connected) {
      if (Date.now() - start > timeout) throw new Error('SignalR connection timeout');
      await new Promise((res) => setTimeout(res, 100));
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
    if (this.connection.state !== HubConnectionState.Connected) {
      await this.waitForConnected();
    }
    return this.connection.invoke(method, ...args);
  };
}

const signalRService = new SignalRService();
export default signalRService;
