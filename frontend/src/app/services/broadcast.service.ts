import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class BroadcastService {
  public httpError: BehaviorSubject<string>;

  constructor() {
    this.httpError = new BehaviorSubject<string>("");
  }
}
