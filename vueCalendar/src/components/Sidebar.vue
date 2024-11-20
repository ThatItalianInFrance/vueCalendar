<script setup lang="ts">
import { useRouter } from 'vue-router'

// Access the router instance
const router = useRouter()

// Extract all routes from the router instance
const routes = router.getRoutes()
</script>

<template>
  <aside class="sidebar">
    <ul>
      <li v-for="route in routes" :key="route.name">
        <RouterLink :to="route.path">{{ route.name }}</RouterLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 200px;
  background: #f4f4f4;
  padding: 15px;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.sidebar a:hover {
  color: #007bff;
}
</style>
