<template>
  <div>
    <h2>Loading</h2>
    <div class="flex">
      <Loading1 class="mr-[40px]" />
      <Loading2 />
    </div>
    <project1 />
  </div>
</template>
<script>
import { defineComponent, defineAsyncComponent } from 'vue';
import { Loading1, Loading2 } from '@/components/Loading';
const project1 = defineAsyncComponent(() => import('app1/AppContainer'));
export default defineComponent({
  name: 'DEMO',
  components: {
    Loading1,
    Loading2,
    project1
  }
});
</script>