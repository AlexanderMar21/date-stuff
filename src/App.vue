<template>
  <div class="flex flex-col gap-8 w-400px mx-auto justify-center py-10">
    <h1>Date</h1>
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

    <h1>Month</h1>
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
  </div>
</template>

<script setup lang="ts">
import { useDate } from './composables/datify';
import { ref } from 'vue';

const value = ref('1999-12-19');
const monthValue = ref('1999-12');
const { isValid, inputRef } = useDate(value, 'dd.mm.yyyy');
const { isValid: isValidMonth, inputRef: monthInput } = useDate(
  monthValue,
  'mm.yyyy',
  'YYYY-MM'
);
</script>
