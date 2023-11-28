<template>
  \{{ $t('message') }} 
  <div class="flex">
    <button @click="setLangCodition('zhCN')">
      切换中文
    </button>
    <button @click="setLangCodition('en')">
      切换英语
    </button>
    <button @click="setLangCodition('de')">
      切换德语
    </button>
    <button @click="setLangCodition('fr')">
      切换法语
    </button>
  </div>
</template>
{{#if ts}}
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
const setLangCodition = (val) => {
  locale.value = val;
  localStorage.setItem('language', locale.value);
};
</script>
{{else}}
<script setup>
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
const { locale } = useI18n();
const setLangCodition = (val) => {
  locale.value = val;
  localStorage.setItem('language', locale.value);
};
</script>

{{/if}}
