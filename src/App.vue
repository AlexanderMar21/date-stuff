<template>
  <div class="flex flex-col gap-8 w-400px mx-auto justify-center py-10">

    <h1>Cleave.js && Dayjs</h1>
    <p>43.07 kB │ gzip: 12.16 kB</p><br>
    <input
      type="tel"
      ref="inputCleave"
      :class="{ error: validCleave === false }"
      placeholder="dd/mm/yyyy"
      class="border-2 outline-0 input-element"
    />
    <br>
    <br>
    <input type="date" v-model="cleave" />
    <p>
      {{ cleave }}
    </p>
    <br>
    <input
      type="tel"
      ref="inputCleaveMonth"
      :class="{ error: validCleaveMonth === false }"
      placeholder="mm/yyyy"
      class="border-2 outline-0 input-element"
    />
    <p>
      {{ cleaveMonth }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useCleave } from './composables/cleave';
import { onMounted, ref } from 'vue';


const inputCleave = ref();
const inputCleaveMonth = ref();
const cleave = ref('1999-12-19');
const cleaveMonth = ref('1900-11');

const [ validCleave ] = useCleave(inputCleave, cleave, {
});
const [ validCleaveMonth ] = useCleave(inputCleaveMonth, cleaveMonth, {
  format: 'mm/yyyy',
  parseFormat: 'YYYY-MM',
  datePattern: ['m', 'Y'],
});
onMounted(() => {
  console.log('app')
})
</script>
