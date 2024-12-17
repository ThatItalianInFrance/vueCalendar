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
  height: 100vh; /* Full height of the viewport */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  /* position: fixed; Fix it to the left side of the viewport */
  /* top: 0; */
  /* left: 0; */
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
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

/* Ensure the page content adjusts */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

main {
  margin-left: 200px; /* Adjust the main content to not overlap the sidebar */
}
</style>

