import Cleave from 'cleave.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { onMounted, onUnmounted, ref, Ref, watch } from 'vue';
dayjs.extend(customParseFormat);

export const useCleave = (el: Ref<HTMLInputElement>, remoteValue: Ref<string>, options = {}) => {
	const DEFAULT_OPTIONS = {
		parseFormat: 'YYYY-MM-DD',
		format: 'dd/mm/yyyy',
		delimeter: '/',
		datePattern: ['d', 'm', 'Y'],
	};

	const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

	const isValid = ref<boolean | undefined>(undefined);
	const isBlurred = ref<boolean>(false);
	const formatDate = (val: string): string => {
		const parsed = dayjs(val, mergedOptions.format.toUpperCase(), true);
		isValid.value = parsed.isValid();
		if (val.length === mergedOptions.format.length) {
			if (!isValid.value) {
				return '';
			}
			return parsed.format(mergedOptions.parseFormat.toUpperCase());
		}
		return '';
	};

	const handleInput = (evt: Event) => {
		const { value } = evt.target;
		const parsed = dayjs(value, mergedOptions.format, true);
		isValid.value = parsed.isValid();
		if (value?.length === mergedOptions.format.length) {
			remoteValue.value = formatDate(value);
		} else {
			remoteValue.value = '';
		}
	};
	onMounted(() => {
		if (el.value) {
			watch(remoteValue, (val) => {
				if (val?.length === mergedOptions.format.length) {
					const parsed = dayjs(val, mergedOptions.parseFormat, true);
					if (parsed.isValid()) {
						el.value.value = parsed.format(mergedOptions.format.toUpperCase());
					}
				}
			});

			const parsed = dayjs(remoteValue.value, mergedOptions.parseFormat, true);
			if (remoteValue.value?.length === mergedOptions.format.length) {
				isValid.value = parsed.isValid();
				el.value.value = parsed.format(mergedOptions.format.toUpperCase());
			}

			el.value.addEventListener('input', handleInput);
      el.value.addEventListener('blur', (_: Event) => {
        isBlurred.value = true;
      });
			el.value.cleave = new Cleave(el.value, {
				date: true,
				delimiter: mergedOptions.delimeter,
				datePattern: mergedOptions.datePattern,
			});
		}
	});
  onUnmounted(() => {
    if (el.value) {
      el.value.removeEventListener('input', handleInput);
    }
  });
	return [isValid];
};
