import Cleave from 'cleave.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const useCleave = (el: any, options = {}) => {
  if (el) {
    dayjs(new Date(), 'YYYY-MM-DD')
    el.cleave = new Cleave(el, options)
  }
}