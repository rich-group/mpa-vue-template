<template>
  <div>
    <Tabs
      :animation="true"
      @change="onChange"
    >
      <Tab
        label="tab1"
        name="tab1"
      >
        Tab1
      </Tab>
      <Tab
        label="tab2"
        name="tab2"
      >
        Tab2
      </Tab>
      <Tab
        label="tab3"
        name="tab3"
      >
        Tab3
      </Tab>
    </Tabs>
  </div>
</template>
<script setup {{#if ts}} lang="ts"{{/if}}>
import { Tabs, Tab } from './components';
const onChange = (tab) => {
  console.log('tab', tab);
};
</script>