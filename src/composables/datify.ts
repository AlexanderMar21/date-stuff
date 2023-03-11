import { Ref, watch, ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import { Mask } from 'maska';
import Cleave from 'cleave.js';

export const useDate = (
  remoteValue: Ref<string>,
  format: string,
  parseFormat = 'YYYY-MM-DD'
) => {
  const maskPattern = format.replace(/[a-zA-Z]/gi, '#');
  format = format.toUpperCase();
  const mask = new Mask({ mask: maskPattern });
  const isValid = ref(false);
  const inputRef = ref('');
  if (remoteValue.value.length === format.length) {
    const parsed = dayjs(remoteValue.value, parseFormat, true);
    inputRef.value = parsed.format(format.toUpperCase());
    isValid.value = parsed.isValid();
  }
  watch(remoteValue, (val) => {
    console.log(val);
    if (val) {
      const parsed = dayjs(val, parseFormat, true);
      inputRef.value = parsed.format(format.toUpperCase());
    }
  });
  watch(inputRef, (val) => {
    const parsed = dayjs(val, format.toUpperCase(), true);
    inputRef.value = mask.masked(inputRef.value);
    isValid.value = parsed.isValid();
    if (val.length === format.length) {
      if (!isValid.value) {
        return;
      }
      remoteValue.value = parsed.format(parseFormat.toUpperCase());
    }
  });

  return { isValid, inputRef };
};

export const useCleave = (el: any, options = {}) => {
    if (el) {
      el.cleave = new Cleave(el, options)
    }
}
