<template>
  <div class="flex flex-col gap-8 w-400px mx-auto justify-center py-10">
    <h1>Maska && Dayjs</h1>
    <p>20.02 kB │ gzip: 6.80 kB</p><br>
    <input
      type="tel"
      v-model="inputRef"
      class="border-2 outline-0"
      :class="{ error: !isValid }"
      placeholder="dd.mm.yyyy"
    />
    <p>
      {{ value }}
    </p>
    <input type="date" v-model="value" />
    <br />
    <br />
    <input
      type="tel"
      v-model="monthInput"
      class="border-2 outline-0"
      :class="{ error: !isValidMonth }"
      placeholder="mm.yyyy"
    />
    <p>
      {{ monthValue }}
    </p>
    <input type="month" v-model="monthValue" />
    <br />

    <h1>Cleave.js && Dayjs</h1>
    <p>43.07 kB │ gzip: 12.16 kB</p><br>
    <input
      type="tel"
      ref="inputCleave"
      v-model="cleaveValue"
      :class="{ error: !validCleave }"
      placeholder="dd/mm/yyyy"
      class="border-2 outline-0 input-element"
    />
    <p>
      {{ cleave }}
    </p>
    <br>
    <input
      type="tel"
      ref="inputCleaveMonth"
      v-model="cleaveMonthValue"
      :class="{ error: !validCleaveMonth }"
      placeholder="mm/yyyy"
      class="border-2 outline-0 input-element"
    />
    <p>
      {{ cleaveMonth }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useDate } from './composables/datify';
import { useCleave } from './composables/cleave';
import { onMounted, ref } from 'vue';

const value = ref('1999-12-19');
const monthValue = ref('1999-12');
const { isValid, inputRef } = useDate(value, 'dd.mm.yyyy');
const { isValid: isValidMonth, inputRef: monthInput } = useDate(
  monthValue,
  'mm.yyyy',
  'YYYY-MM'
);

const inputCleave = ref();
const inputCleaveMonth = ref();
const cleave = ref('');
const cleaveMonth = ref('');

const { inputRef: cleaveValue, isValid: validCleave  } = useDate(cleave, 'dd/mm/yyyy');
const { inputRef: cleaveMonthValue, isValid: validCleaveMonth  } = useDate(cleaveMonth, 'mm/yyyy', 'YYYY-MM');

onMounted(() => {
  useCleave(inputCleave.value, {
      date: true,
      delimiter: '/',
      datePattern: ['d', 'm', 'Y']
  });
  useCleave(inputCleaveMonth.value, {
      date: true,
      delimiter: '/',
      datePattern: ['m', 'Y']
  });

})
</script>
