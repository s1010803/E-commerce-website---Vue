<template>
  <nav class="breadcrumb">
    <ul>
      <li
        v-for="(item, index) in breadcrumbList"
        :key="index"
        :class="{ active: index === breadcrumbList.length - 1 }"
      >
        <router-link
          v-if="item.path && index !== breadcrumbList.length - 1"
          :to="item.path"
        >
          {{ item.name }}
        </router-link>
        <span v-else>{{ item.name }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbList = computed(() => {
  return route.matched
    .filter(r => r.meta?.breadcrumb)
    .map(r => ({
      name: r.meta.breadcrumb,
      path: r.path
    }))
})
</script>

<style scoped>
.breadcrumb ul {
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
}
.breadcrumb li::after {
  content: '/';
  margin-left: 10px;
}
.breadcrumb li:last-child::after {
  content: '';
}
.breadcrumb a {
  text-decoration: none;
  color: inherit;
}
.breadcrumb li.active span {
  color: DodgerBlue;
  font-weight: bold;
}
</style>