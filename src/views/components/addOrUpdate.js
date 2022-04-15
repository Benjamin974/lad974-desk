import { apiService } from '../../_services/api.service'
export default {
  props: {
    product: {
      default: function () {
        return {}
      }
    },

    isUpdate: {
      default: function () {
        return {}
      }
    },
    idCompany: Number
  },

  data() {
    return {
      drawerRight: null,
      name: '',
      description: '',
      quantite: '',
      price: '',
      picture: '',
      id: '',
      snackbar: false,
      text: '',
      timeout: 3000,
      lazy: false,
      valid: true,
      rules: {
        field_required: [(v) => !!v || "champs requis"],
      }
    }
  },

  methods: {
    addUpdate() {
      let datas = {
        name: this.name,
        firstname: this.firstname,
        description: this.description,
        price: this.price,
        picture: this.picture,
        quantite: this.quantite,
        id_company: this.idCompany,
        id: this.id == '' ? '' : this.id
      }

      apiService.post('https://app-benj.com/api/product/add-update', datas).then((data) => {
        this.drawerRight = !this.drawerRight
        this.snackbar = true;
        if (this.isUpdate) {
          this.$emit('updateProduct', data.data)
          this.text = 'Le produit a été modifié'
        } else if (!this.isUpdate) {
          this.$emit('addProduct', data.data)
          this.text = 'Le produit a été ajouté'
        }
      })
    },
    update(product) {
      this.id = product.id;
      this.name = product.name;
      this.description = product.description;
      this.price = product.price;
      this.picture = product.picture;
      this.quantite = product.quantite;
    },
    onFileChange(file) {

      let reader = new FileReader;

      reader.onload = (file) => {
        this.picture = file.target.result;
      };
      reader.readAsDataURL(file);
    },

    removeImg() {
      this.product.picture = "";
      this.picture = "";
    }
  }
}