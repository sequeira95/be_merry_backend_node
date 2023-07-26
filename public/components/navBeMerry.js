const navBar = Vue.component('navbar-component',{
  components:{},
  data(){
    return{
      navegationList:[
        {
          link:'#',
          name:'Inicio',
          icon:'mdi-home-roof'
        },
        {
          link:'./views/productos.html',
          name:'Productos',
          icon:'mdi-format-list-checkbox'
        },
      ]
    }
  },
  props:[],
  methods:{},

  template:`
  <v-navigation-drawer
    absolute
    permanent
    left
    color='primary'
  >
    <v-list dense>
      <v-list-item
        v-for="item in navegationList"
        :key="item.name"
        :href="item.link"
        dark
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>`,

})