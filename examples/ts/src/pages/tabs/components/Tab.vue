<template>
  <div class="tab ">
    <slot />
  </div>
</template>

<script lang="ts" setup>
export type TabProps = {
  name: string,
  label: string
}
withDefaults(defineProps<TabProps>(), {});
</script>