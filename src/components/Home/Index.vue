<template>
  <div class="home-view">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h3 class="text-center noselect">Media Sources</h3>

          <div class="card" v-for="source in ['New York Times', 'CNN', 'Wall Street Journal', 'Houston Chronicle', 'Washington Post']">
            <div class="card-content has-text-weight-bold">
              {{ source }} <span class="tag is-primary is-pulled-right">345 links</span>
            </div>
            <footer class="card-footer noselect">
              <div class="card-footer-item">
                <span>
                  <a>View</a>
                </span>
              </div>
              <div class="card-footer-item">
                <span>
                  <a>Share</a>
                </span>
              </div>
            </footer>
          </div>

          <a class="button is-primary home-view-card-show-all">Show All</a>
        </div>

        <div class="column">
          <h3 class="text-center noselect">Media Sets</h3>

          <div class="card" v-for="source in ['New York Times + CNN', 'CNN + Wall Street Journal', 'CNN + Wall Street Journal', 'CNN + Wall Street Journal', 'CNN + Wall Street Journal']">
            <div class="card-content has-text-weight-bold">
              {{ source }}
            </div>
            <footer class="card-footer">
              <div class="card-footer-item noselect">
                <span>
                  <a>View</a>
                </span>
              </div>
              <div class="card-footer-item">
                <span>
                  <a>Share</a>
                </span>
              </div>
            </footer>
          </div>

          <a class="button is-primary home-view-card-show-all">Show All</a>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-index',
    components: {},
    data () {
      return {}
    },
    created () {},
    methods: {}
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Home/index.scss'
</style>
