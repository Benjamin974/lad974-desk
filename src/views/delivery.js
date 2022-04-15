import { apiService } from '../_services/api.service';
import { authenticationService } from '../_services/authentication.service';
import DeliveredOrNot from './components/DeliveredOrNot.vue'

export default {
  components: {
    DeliveredOrNot
  },
  data() {
    return {
      search: '',
      isDelivered: false,
      items: [
        { title: 'Livraison 1' },
        { title: 'Livraison 2' },
        { title: 'Livraison 3' },
      ],
      headers: [
        {
          text: 'Livraison',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Statut', value: 'actions' },
      ],
      deliveries: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      commands: []
    }
  },
  created() {
    this.getCommands();
    this.getCommandsDeliveryMan();
  },
  methods: {
    getCommands() {
      apiService.get('https://app-benj.com/api/command/get').then(({ data }) => {
        data.data.forEach(command => {
          this.commands.push(command)
        })
      })
    },

    getCommandsDeliveryMan() {
      apiService.get('https://app-benj.com/api/delivery/delivery-man/' + authenticationService.currentUserValue.id).then(({ data }) => {
        data.data.forEach(delivery => {
          this.deliveries.push(delivery)
        })
      })
    },
    addCommandToDeliveryMan(command) {
      apiService.post('https://app-benj.com/api/delivery/delivery-man', { id_delivery_man: authenticationService.currentUserValue.id, id_command: command.id }).then(({ data }) => {
        console.log(data);
      })
    }
  },

}