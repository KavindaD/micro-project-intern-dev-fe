import login from './components/login.vue'
import dashboard from './components/dashboard.vue'
import addNew from './components/new-admin.vue'

export default [ 
    { path: '/', component: login },
    { path: '/dashboard', component: dashboard },
    { path: '/add-new', component: addNew }
]
