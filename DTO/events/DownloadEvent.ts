import { EventBase, EventBaseParams } from '../BaseEvent.js';


export interface DownloadEventParams extends EventBaseParams {
  content_type?: string;
  content_id?: string;
}

export class DownloadEvent extends EventBase {
  event_name = 'download';
  content_type?: string;
  content_id?: string;

  constructor(params: DownloadEventParams = {}) {
    super(params);
    this.content_type = params.content_type;
    this.content_id = params.content_id;
  }
}
