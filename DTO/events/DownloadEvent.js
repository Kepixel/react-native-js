import { EventBase } from '../BaseEvent.js';


export class DownloadEvent extends EventBase {
  event_name = 'download';
  constructor(params = {}) {
    super(params);
  }
}
