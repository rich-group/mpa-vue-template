<template>
  <div>
    <h2>Loading</h2>
    <div class="flex">
      <Loading1 class="mr-[40px]" />
      <Loading2 />
    </div>
  </div>
</template>
{{#if}}
<script setup lang="ts">
import { Loading1, Loading2 } from '@/components/Loading';
</script>
{{else}}
<script setup>
import { Loading1, Loading2 } from '@/components/Loading';
</script>
{{/if}}
