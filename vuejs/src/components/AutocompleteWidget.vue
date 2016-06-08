<template>
  <div>
    <div class="form-group">
      <div class="lookup">
        <div class="input-group">
          <input type="text" name="lookup" class="form-control" autocomplete="off" v-model="query" debounce="300" />
          <div class="input-group-btn">
            <button type="button" class="btn btn-default" v-on:click="toggleDropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>
            <button type="button" class="btn btn-default" v-on:click="addProduct"><span class="glyphicon glyphicon-plus"></span></button>
          </div>
        </div>
        <div class="search-results dropdown" v-bind:class="{ 'open': dropdown }">
          <table class="table table-list ng-scope">
            <tbody>
              <tr v-for="product in products" v-on:click="selectProduct(product)" v-bind:class="{ 'active': selectedProduct === product }">
                <td><img style="height:50px;" v-bind:src="'https://s3-ap-northeast-1.amazonaws.com/' + product.image_uri"></td>
                <td>{{ product.product_name }}</td>
              </tr>
            </tbody>
          </table>
          <div class="pagination btn-center">
            <button class="btn btn-default"><span class="glyphicon glyphicon-chevron-left"></span><span class="glyphicon glyphicon-chevron-left"></span></button>
            <button class="btn btn-default"><span class="glyphicon glyphicon-chevron-left"></span></button>
            <span class="box">1 / 1</span>
            <button class="btn btn-default"><span class="glyphicon glyphicon-chevron-right"></span></button>
            <button class="btn btn-default"><span class="glyphicon glyphicon-chevron-right"></span><span class="glyphicon glyphicon-chevron-right"></span></button>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div v-for="product in productCategories">
        <div class="assigned-property-wrapper">
          <span class="assigned-property">{{ product.product_name }}</span>
          <i class="property-remove-btn" v-on:click="removeProduct($index)"></i>
        </div>
      </div>
      <div class="clear-both"></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'

export default {
  data () {
    return {
      dropdown: false,
      selectedProduct: {},
      products: [],
      productCategories: [],
      query: ''
    }
  },
  methods: {
    toggleDropdown: function () {
      this.dropdown = !this.dropdown
      this.getData()
    },
    selectProduct: function (product) {
      this.selectedProduct = product
      this.query = product.product_name
      this.dropdown = false
    },
    addProduct: function () {
      this.productCategories.push(Vue.util.extend({}, this.selectedProduct))
    },
    removeProduct: function (index) {
      this.productCategories.splice(index, 1)
    },
    getData: function () {
      if (this.products.length === 0) {
        var that = this
        $.getJSON('/response.json').then(function (response) {
          that.products = response.data.products
        })
      }
    }
  },
  watch: {
    'query': function (val, oldVal) {
      if (val !== '' && val !== this.selectedProduct.product_name) {
        this.dropdown = true
        this.getData()
      }
    }
  }
}
</script>

<style scoped>
table > tbody > tr { cursor:pointer; }
</style>
