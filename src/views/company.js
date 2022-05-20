import AddOrUpdate from './components/AddOrUpdate.vue'
import ViewProduct from './components/ViewProduct.vue'
import Delete from './components/Delete.vue'
import { apiService } from '../_services/api.service'
import { authenticationService } from '../_services/authentication.service'
import _ from 'lodash'
export default {
  components: {
    AddOrUpdate,
    Delete,
    ViewProduct
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Nom de l\'article',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Quantité', value: 'quantite' },
        { text: 'Prix', value: 'price' },
        { text: 'Actions', value: 'actions' }
      ],
      products: [],
      company: {},
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      currentUser: null,

    }
  },

  created() {
    authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
    this.getCompany();
  },

  methods: {
    getCompany() {
      apiService.get('https://app-benj.com/api/company/find/user/' + this.currentUser.id).then(({ data }) => {
        this.company = data[0];
        this.getProducts(data[0].id);
      })
    },
    getProducts(id) {
      apiService.get('https://app-benj.com/api/product/get-all/' + id).then(({ data }) => {
        data.data.forEach(product => {
          this.products.push(product);
        });
      })
    },
    updateProduct(product) {
      console.log(product);
      const index = _.findIndex(this.products, { id: product.data.id });
      this.products.splice(index, 1, product.data);
    },
    addProduct(product) {
      this.products.push(product.data);
    }
  }
}