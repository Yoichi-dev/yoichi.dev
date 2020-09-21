<template>
  <v-app>
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
    >
      <v-container>
        <v-list-item>
          <v-list-item-title class="title">Menu</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')" v-text="title" />
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer :inset="footer.inset" app>
      <span class="px-4">&copy; {{ new Date().getFullYear() + " " + title }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-pencil-outline',
          title: 'My Skill',
          to: '/skill',
        },
        {
          icon: 'mdi-book-open-page-variant',
          title: 'Blog',
          to: '/blog',
        },
        {
          icon: 'mdi-folder-plus-outline',
          title: 'Create App & Site',
          to: '/create',
        },
        {
          icon: 'mdi-message-processing-outline',
          title: 'Diary',
          to: '/diary',
        },
      ],
      title: 'Yoichi.dev',
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: true,
        floating: false,
        mini: false,
      },
      footer: {
        inset: true,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
body {
  font-family: 'NotoSerifFont';
}
</style>