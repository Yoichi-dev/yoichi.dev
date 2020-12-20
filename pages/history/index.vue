<template>
  <div class="container">
    <div class="row">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">配信日時</th>
            <th scope="col">削除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(history, i) in historyList" :key="i">
            <th scope="row">
              <button
                type="button"
                class="btn btn-outline-success"
                @click="show(history.date)"
              >
                表示
              </button>
            </th>
            <td>{{ formatDate(history.date * 1000) }}</td>
            <th>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="deleteHistory(history.date)"
              >
                削除
              </button>
            </th>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
    <div class="mt-5 row col-12 mx-auto">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            class="nav-link active"
            id="nav-comment-tab"
            data-bs-toggle="tab"
            href="#nav-comment"
            role="tab"
            aria-controls="nav-comment"
            aria-selected="true"
            >コメント</a
          >
          <!-- <a
            class="nav-link"
            id="nav-count-tab"
            data-bs-toggle="tab"
            href="#nav-count"
            role="tab"
            aria-controls="nav-count"
            aria-selected="false"
            >カウント</a
          > -->
          <a
            class="nav-link"
            id="nav-free-gift-tab"
            data-bs-toggle="tab"
            href="#nav-free-gift"
            role="tab"
            aria-controls="nav-free-gift"
            aria-selected="false"
            >フリーギフト</a
          >
          <a
            class="nav-link"
            id="nav-pre-gift-tab"
            data-bs-toggle="tab"
            href="#nav-pre-gift"
            role="tab"
            aria-controls="nav-pre-gift"
            aria-selected="false"
            >有料ギフト</a
          >
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-comment"
          role="tabpanel"
          aria-labelledby="nav-comment-tab"
        >
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ユーザ名</th>
                <th scope="col">コメント</th>
                <th scope="col">日時</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(comment, i) in commentList"
                :key="i"
                :class="comment.flg == 2 ? 'table-info' : ''"
              >
                <th scope="row">
                  <a
                    target="_blank"
                    class="btn btn-outline-secondary"
                    rel="nofollow"
                    :href="
                      'https://www.showroom-live.com/social/twitter/redirect_to_twitter?user_id=' +
                      comment.user_id
                    "
                    >SNS</a
                  >
                </th>
                <td>
                  <img
                    style="max-width: 50px; max-height: 50px"
                    :src="
                      'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                      comment.avatar +
                      '.png'
                    "
                    class="card-img-top"
                    alt=""
                  />{{ comment.user_name }}
                  {{ comment.flg == 2 ? '（初見）' : '' }}
                </td>
                <td>{{ comment.comment }}</td>
                <td>{{ formatDate(comment.create * 1000) }}</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <!-- <div
          class="tab-pane fade"
          id="nav-count"
          role="tabpanel"
          aria-labelledby="nav-count-tab"
        >
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ユーザ名</th>
                <th scope="col">カウント</th>
                <th scope="col">日時</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(count, i) in countList"
                :key="i"
                :class="count.flg == 2 ? 'table-info' : ''"
              >
                <th scope="row">
                  <a
                    target="_blank"
                    class="btn btn-outline-secondary"
                    rel="nofollow"
                    :href="
                      'https://www.showroom-live.com/social/twitter/redirect_to_twitter?user_id=' +
                      count.user_id
                    "
                    >SNS</a
                  >
                </th>
                <td>
                  <img
                    style="max-width: 50px; max-height: 50px"
                    :src="
                      'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                      count.avatar +
                      '.png'
                    "
                    class="card-img-top"
                    alt=""
                  />{{ count.user_name }}
                  {{ count.flg == 2 ? '（初見）' : '' }}
                </td>
                <td>{{ count.comment }}</td>
                <td>{{ formatDate(count.create * 1000) }}</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div> -->
        <div
          class="tab-pane fade"
          id="nav-free-gift"
          role="tabpanel"
          aria-labelledby="nav-free-gift-tab"
        >
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ユーザ名</th>
                <th scope="col">ギフト</th>
                <th scope="col">日時</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(freeGift, i) in freeGiftList"
                :key="i"
                :class="freeGift.flg == 2 ? 'table-info' : ''"
              >
                <th scope="row">
                  <a
                    target="_blank"
                    class="btn btn-outline-secondary"
                    rel="nofollow"
                    :href="
                      'https://www.showroom-live.com/social/twitter/redirect_to_twitter?user_id=' +
                      freeGift.user_id
                    "
                    >SNS</a
                  >
                </th>
                <td>
                  <img
                    style="max-width: 50px; max-height: 50px"
                    :src="
                      'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                      freeGift.avatar +
                      '.png'
                    "
                    class="card-img-top"
                    alt=""
                  />
                  {{ freeGift.user_name }}
                  {{ freeGift.flg == 2 ? '（初見）' : '' }}
                </td>
                <td>
                  <img
                    style="max-width: 50px; max-height: 50px"
                    :src="
                      'https://image.showroom-cdn.com/showroom-prod/assets/img/gift/' +
                      freeGift.gift_img +
                      '_s.png'
                    "
                    class="card-img-top"
                    alt=""
                  />
                  × {{ freeGift.count }}個
                </td>
                <td>{{ formatDate(freeGift.create * 1000) }}</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <div
          class="tab-pane fade"
          id="nav-pre-gift"
          role="tabpanel"
          aria-labelledby="nav-pre-gift-tab"
        >
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ユーザ名</th>
                <th scope="col">ギフト</th>
                <th scope="col">日時</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(preGift, i) in preGiftList"
                :key="i"
                :class="preGift.flg == 2 ? 'table-info' : ''"
              >
                <th scope="row">
                  <a
                    target="_blank"
                    class="btn btn-outline-secondary"
                    rel="nofollow"
                    :href="
                      'https://www.showroom-live.com/social/twitter/redirect_to_twitter?user_id=' +
                      preGift.user_id
                    "
                    >SNS</a
                  >
                </th>
                <td>
                  <img
                    style="max-width: 50px; max-height: 50px"
                    :src="
                      'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                      preGift.avatar +
                      '.png'
                    "
                    class="card-img-top"
                    alt=""
                  />
                  {{ preGift.user_name }}
                  {{ preGift.flg == 2 ? '（初見）' : '' }}
                </td>
                <td>
                  <img
                    style="max-width: 50px; max-height: 50px"
                    :src="
                      'https://image.showroom-cdn.com/showroom-prod/assets/img/gift/' +
                      preGift.gift_img +
                      '_s.png'
                    "
                    class="card-img-top"
                    alt=""
                  />
                  × {{ preGift.count }}個
                </td>
                <td>{{ formatDate(preGift.create * 1000) }}</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data() {
    return {
      historyList: [],
      commentList: [],
      countList: [],
      freeGiftList: [],
      preGiftList: [],
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.$store.state.history.length === 0) {
        this.$router.push('/')
      } else {
        this.historyList = this.$store.state.history
      }
    }, 0)
    let triggerTabList = [].slice.call(document.querySelectorAll('#nav-tab a'))
    triggerTabList.forEach(function (triggerEl) {
      let tabTrigger = new bootstrap.Tab(triggerEl)

      triggerEl.addEventListener('click', function (event) {
        event.preventDefault()
        tabTrigger.show()
      })
    })
  },
  computed: {
    formatDate: () => (inputDate) => {
      return moment(inputDate).format('YYYY/MM/DD HH:mm')
    },
  },
  methods: {
    show(key) {
      for (let i = 0; i < this.historyList.length; i++) {
        if (this.historyList[i].date === key) {
          this.commentList = this.historyList[i].comment
          this.countList = this.historyList[i].count
          this.freeGiftList = this.historyList[i].free
          this.preGiftList = this.historyList[i].pre
        }
      }
    },
    deleteHistory(key) {
      let result = this.historyList.filter((val) => val.date != key)
      this.$store.commit('deleteHistory', result)
      this.historyList = result
      this.commentList = []
      this.countList = []
      this.freeGiftList = []
      this.preGiftList = []
    },
  },
}
</script>