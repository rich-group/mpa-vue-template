<template>
  <div class="flex">
    <div v-for="u in users">
      <p>
        <span>姓名: {{ u.name }}</span>,
        <span>年龄: {{ u.age }}</span>,
        <span>性别: {{ u.sex }}</span>,
        <span>地址: {{ u.address }}</span>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { UserModel, User } from '@/apis/model/UserModel';
export default defineComponent({
  props: {
    defaultUser: {
      type: Object,
      default: () => ({})
    }
  },
  setup () {
    const users = ref<User[]>([]);
    $API.BFF.detail<UserModel>().then(res => {
      if (res.retCode === 20000) {
        console.log(res.data);
        users.value = res.data;
      }
    });
    return {
      users
    };
  }
});
</script>