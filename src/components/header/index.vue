<template>
  <header class="header-wrapper">
    <div class="container display-flex flex-align-center flex-justify-content-space-between">
      <div class="logo-wrapper">
        <router-link to="/">
          <img src="@/assets/images/logo/logo.svg" class="responsive-image" />
        </router-link>
      </div>
      <nav class="header-wrapper--navigation-menu">
        <ul v-if="$route.name !== 'dashboard' && $route.name !== 'adminDashboard'">
          <li>
            <router-link to="/login" class="text-uppercase">Login</router-link>
          </li>
          <li>
            <router-link to="/register" class="text-uppercase">Sign Up</router-link>
          </li>
        </ul>
        <ul v-if="$route.name === 'dashboard'">
          <li>
            <router-link to="/logout" class="text-uppercase">Logout</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
@import "@/assets/scss/common/_variables.scss";

.header-wrapper {
  background-color: $theme-primary-color;
  padding: 15px 0;
  &--navigation-menu {
    li {
      display: inline-block;
      &:not(:last-child) {
        margin-right: 16px;
      }
      a {
        color: $theme-white-color;
        font-weight: $semi-bold-font-weight;
        &:hover {
          color: $theme-secondary-color;
        }
        &.router-link-exact-active {
          color: $theme-secondary-color;
        }
      }
    }
  }
}
</style>
