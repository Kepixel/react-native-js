import { EventBase } from '../BaseEvent';


export class DownloadEvent extends EventBase {
  event_name = 'download';
  constructor(params = {}) {
    super(params);
  }
}
