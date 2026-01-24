import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue' // Import the 404 component

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Devrymel | Reymel Mislang  ', 
    }
  },
  // Catch-all route for 404 errors
  {
    path: '/:pathMatch(.*)*', // Matches any invalid route
    name: 'not-found',
    component: NotFound, // Redirect to the 404 component
    meta: {
      title: '404 - Page Not Found', 
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Optional: Add a global navigation guard to update the page title
router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title || '' // Use the meta title or a default title
  document.title = pageTitle // Update the document title
  next()
})

export default router