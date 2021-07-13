import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import { users } from '../assets/users';
import Home from '../views/Home.vue'
import UserProfile from '../views/UserProfile.vue'
import Admin from '../views/Admin'

const routes = [ //variable that is a list of routing objects
  {
    path: '/',
    name: 'Home',
    component: Home //three needed for route
  },
  {
    path: '/user/:userId', // having the  : makes it a variable thus making the userId dynamic or it is based on an input
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta:{
      requiresAdmin:true
    }
  }
]

const router = createRouter({ //This is where the router is actually being created
  ///history: createWebHashHistory(),
  history: createWebHistory(), //will remove the # in the url bar in the browser
  routes //references the routes varaiable above
})

router.beforeEach(async (to, from, next) => { //this makes a page appear before the intended page e.g loading pages before going to the inteded page or login first before accessing other pages
  const user = store.state.User.user;

  if (!user) {
    await store.dispatch('User/setUser', users[0]);   //function you call to run actions
  }
  const isAdmin = true;
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin); //getting meta information from a route

  if (requiresAdmin && !isAdmin) {//if the route requires Admin and if user is not admin, then redirect to home
    next ({name: 'Home'});
  }else{
    next(); 
  } 
})

export default router
