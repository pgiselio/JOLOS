export function convertFromStringToDate(dateString : string) {
  let dateComponents = dateString.split("/");
  return new Date(dateComponents[2] + '-' + dateComponents[1] + '-' + dateComponents[0]);
}
