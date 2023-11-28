<template>
  <div class="flash">
    <p>姓名：{{ name }}</p>
    <p>年龄：{{ age }}</p>
  </div>
</template>

{{#if ts}}
<script setup lang="ts">
withDefaults(defineProps<{
  name: string,
  age: number
}>(), {
  name: '',
  age: 0
});
</script>
{{else}}
<script setup>
defineProps({
  name: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    default: 0
  }
})
</script>
{{/if}}