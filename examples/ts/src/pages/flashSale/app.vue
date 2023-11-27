<template>
  <div class="flash">
    <p>姓名：ts</p>
    <p>年龄：</p>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  name: string,
  age: number
}>(), {
  name: '',
  age: 0
});

</script>