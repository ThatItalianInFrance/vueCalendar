import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    // {
    //   path: '/planningmanager',
    //   name: 'planningmanager',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/PlanningManagerView.vue'),
    // },
    {
      path: '/groups',
      name: 'groups',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroupsView.vue'),
    },
    {
      path: '/newplanning',
      name: 'planning manager',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NewPlanningView.vue'),
    },
    {
      path: '/employee',
      name: 'employee',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EmployeeManagementView.vue'),
    },
    {
      path: '/newevent',
      name: 'newevent',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NewEventView.vue'),
    },

    {
      path: '/scheduler',
      name: 'scheduler',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SchedulerView.vue'),
    },
    {
      path: '/calendargrid',
      name: 'calendargrid',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CalendarGridView.vue'),
    },
    {
      path: '/calendartimegrid',
      name: 'calendartimegrid',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CalendarTimeGridView.vue'),
    },
    {
      path: '/resourcetimeline',
      name: 'resourcetimeline',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ResourceTimelineView.vue'),
    },
  ],
})

export default router
