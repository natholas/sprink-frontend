import { paddTo } from './padd-to'
import * as moment from 'moment-timezone';

export const dateToUtcString = (date: moment.Moment) => {
  date = moment(date)
  return `${paddTo(date.date().toString(), 2)}-${paddTo((date.month() + 1).toString(), 2)}-${paddTo(date.year().toString(), 4)}`
}