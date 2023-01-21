export class Logger {
  static log(error: Error) {
    //console.log(JSON.stringify(error, null, 2));
    console.error(error);
  }
}
