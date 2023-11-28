<template>
  <div class="tab ">
    <slot />
  </div>
</template>

{{#if ts}}
<script setup lang="ts">
export type TabProps = {
  name: string,
  label: string
}
withDefaults(defineProps<TabProps>(), {});
</script>
{{else}}
<script setup>
defineProps({
  name: {
    type: String
  },
  label: {
    type: String
  }
});
</script>
{{/if}}