import moment from "moment";

interface dateObject {
  id: number;
  value: number;
  date: Date;
  userId: string;
}

export default function dateFormatter(dateObject: dateObject) {
  return {
    ...dateObject,
    date: moment(dateObject.date).format("DD/MM/YYYY").toString(),
  };
}
