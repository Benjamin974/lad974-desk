import Vue from 'vue';
import VueRouter from 'vue-router';
import Company from './views/Company.vue'
import Delivery from './views/Delivery.vue'
import Profil from './views/Profil.vue'
import Product from './views/Product.vue'
import Login from './auth/Login.vue';
import { Role } from './_helpers/role';
import { authenticationService } from './_services/authentication.service';
import _ from 'lodash';
import Register from './auth/Register.vue';
Vue.use(VueRouter);
const routes = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: Role.Company,
      component: Company,
      meta: { authorize: [Role.Company] }
    },
    {
      path: '/dashboard/delivery',
      name: Role.DeliveryMan,
      component: Delivery,
      meta: { authorize: [Role.DeliveryMan] }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product,
      meta: { authorize: [Role.Company] }
    },
    {
      path: '/profil',
      name: 'profil',
      component: Profil,
      meta: { authorize: [Role.DeliveryMan, Role.Admin, Role.Company] }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ]
});


routes.beforeEach((to, from, next) => {

  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;

  if (authorize && !_.isEmpty(authorize)) {
    const currentUser = authenticationService.currentUserValue;

    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: "/login", query: { returnUrl: to.path } });
    }
    // // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role.role)) {
      //   // role not authorised so redirect to home page
      return next('/profil');
    } else {
      return next();
    }

  }

  return next();
});

export default routes;