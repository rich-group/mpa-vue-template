<template>
  <Provider :store="store">
    <com-list />
  </Provider>
</template>
{{#if}}
<script setup lang="ts">
import { Provider } from '@/components/Provider';
import ComList from './components/List';
const store = createStore({
  defaultUser: {
    name: 'sa',
    age: 23,
    sex: '男',
    address: '江苏省'
  }
});
</script>
{{else}}
<script setup>
import { Provider } from '@/components/Provider';
import ComList from './components/List';
const store = createStore({
  defaultUser: {
    name: 'sa',
    age: 23,
    sex: '男',
    address: '江苏省'
  }
});
</script>
{{/if}}
