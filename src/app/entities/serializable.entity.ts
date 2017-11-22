export class Serializable {
  fromJson(json: string) {
    var jsonObj = JSON.parse(json);
    for (var propName in jsonObj) {
      this[propName] = jsonObj[propName]
    }
  }
}