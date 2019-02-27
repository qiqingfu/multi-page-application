<template>
  <div id="app">
    <h3>Page 3</h3>
    <hello-world></hello-world>
  </div>
</template>

<script>

import helloWorld from 'components/HelloWorld.vue'
export default {
  name: 'page3',
  components: {
    helloWorld,
  }
}
</script>