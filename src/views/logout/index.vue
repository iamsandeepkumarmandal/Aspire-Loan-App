<template>
  <section class="logout-wrapper">
  </section>
</template>

<script>
import { Logout } from '@/services/login-register.api';

export default {
  name: 'Logout',
  methods: {
    // method called to logout user (remove the session data & redirect to home/landing page)
    async logoutUser() {
      const response = await Logout();
      if (response.statusCode === 200) {
        this.$router.push('/');
      } else {
        this.$router.push('/');
      }
    },
  },
  mounted() {
    this.logoutUser();
  },
};
</script>
