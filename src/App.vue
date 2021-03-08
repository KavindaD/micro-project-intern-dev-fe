<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <v-toolbar-title>
        {{ getName(this.$router.history.current.path) }}
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    componentName: '',
  }),
  methods: {
    getName(name) {
      if(name === '/') {
        return 'Login'
      }else if(name === '/dashboard') {
        return 'Dashboard'
      }else if(name === '/add-new') {
        return 'New Admin Register'
      }
    }
  },
};
</script>
