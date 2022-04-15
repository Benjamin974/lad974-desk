import { EventBus } from '../../eventBus.js';
import { apiService } from '../../_services/api.service.js';

export default {
    props: {
        product: {
            default: function () {
                return {}
            },

        },
        products: {
            default: function () {
                return {}
            },

        },
    },

    data() {
        return {
            dialog: false,
            timeout: 3000,
        }
    },

    methods: {
        deleteProduct(product) {
            const index = this.products.indexOf(product);
            apiService.post('https://app-benj.com/api/product/delete/' + product.id).then(
                this.products.splice(index, 1)
            )
            this.products.splice(index, 1)
            let contentSnackbar = {
                text: '',
                color: 'error',
                etat: false
            }
            contentSnackbar.text = product.name + " a été supprimé"
            contentSnackbar.etat = true
            EventBus.$emit('updateSnack', contentSnackbar);
            this.dialog = false

        }
    },

}
