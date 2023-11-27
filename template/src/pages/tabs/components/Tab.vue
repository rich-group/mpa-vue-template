<template>
  <div class="tab ">
    <slot />
  </div>
</template>

<script setup {{#if ts}} lang="ts"{{/if}}>

export type TabProps = {
  name: string,
  label: string
}
withDefaults(defineProps<TabProps>(), {});
</script>