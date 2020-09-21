<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <p class="display-1">
          <v-icon class="mr-3" x-large>mdi-face</v-icon>Profile
        </p>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-for="profile in profiles" :key="profile.key">
                <td class="nowrap">{{ profile.name }}</td>
                <td>{{ profile.value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="12" md="8">
        <p class="display-1">
          <v-icon class="mr-3" x-large>mdi-laptop-windows</v-icon>Skill
        </p>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-for="skill in skills" :key="skill.key">
                <td class="nowrap">{{ skill.name }}</td>
                <td>{{ skill.value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="12" md="8" class="mb-12">
        <p class="display-1">
          <v-icon class="mr-3" x-large>mdi-heart-outline</v-icon>Hobby
        </p>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-for="hobby in hobbys" :key="hobby.key">
                <td class="nowrap">{{ hobby.name }}</td>
                <td>{{ hobby.value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      profiles: [
        {
          key: '1',
          name: '名前',
          value: 'よーいちろー',
        },
        {
          key: '2',
          name: '年齢',
          value: '26歳',
        },
        {
          key: '3',
          name: '在住',
          value: '東京23区',
        },
        {
          key: '4',
          name: '出身',
          value: '鹿児島',
        },
        {
          key: '5',
          name: '職業',
          value: 'プロジェクトリーダー , システムエンジニア , プログラマ',
        },
        {
          key: '6',
          name: '業種',
          value: 'ユーザ系SIer',
        },
      ],
      skills: [
        {
          key: '1',
          name: '言語',
          value: 'HTML , JavaScript , CSS , PHP , Java , Bash , VB.net',
        },
        {
          key: '2',
          name: 'DB',
          value:
            'Oracle Database , MySQL , MariaDB , PostgreSQL , IndexedDB , Microsoft SQL Server , DB2 , Symfoware Server',
        },
        {
          key: '3',
          name: 'OS',
          value: 'Windows , Linux',
        },
        {
          key: '4',
          name: 'FW',
          value: 'jQuery , Bootstrap , Nuxt.js , Laravel , Spring Boot',
        },
        {
          key: '5',
          name: 'ツール',
          value: 'HULFT , GeneXus , IBM InfoSphere DataStage',
        },
        {
          key: '6',
          name: '管理',
          value: 'Git , SVN',
        },
        {
          key: '7',
          name: 'Cloud',
          value: 'Azure , AWS , Firebase',
        },
      ],
      hobbys: [
        {
          key: '1',
          name: '楽器',
          value: 'Piano',
        },
        {
          key: '2',
          name: '作曲家',
          value: 'Claude Achille Debussy',
        },
        {
          key: '3',
          name: '曲',
          value: "水の戯れ , Pour le Piano , Tarantelle Styrienne 'Danse'",
        },
        // {
        //   key: '4',
        //   name: '漫画',
        //   value: 'フェチップル , 青のオーケストラ , この音とまれ！'
        // },
        // {
        //   key: '5',
        //   name: 'アニメ',
        //   value:
        //     'citrus , 終末なにしてますか？忙しいですか？救ってもらっていいですか？ , デスマーチからはじまる異世界狂想曲 , BEATLESS , 東のエデン'
        // },
        // {
        //   key: '6',
        //   name: '配信者',
        //   value:
        //     '湊あくあ , 星街すいせい , 七瀬ユイ , 紡ひなた , 絵守エル , 乃嶋りま , 雪白愛梨 , 一花アスター'
        // }
      ],
    }
  },
  head() {
    return {
      title: 'スキル一覧',
    }
  },
}
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
}
</style>