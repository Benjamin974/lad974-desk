import { authenticationService } from "../_services/authentication.service";
import { apiService } from '../_services/api.service'
import { EventBus } from '../eventBus'
export default {

  data() {
    return {
      user: {
        name: '',
        email: '',
      },
      password: '',
      passwordValidation: '',
      emailRules: [
        (v) => !!v || "E-mail requis",
        (v) => /.+@.+\..+/.test(v) || "Ce champ doit être un email"
      ],
      nameRules: [
        (v) => !!v || "Le nom est requis"
      ],
      pwdRules: [(v) => !!v || "Mot de passe requis"],
      lazy: false,
      valid: true,
      loading: false,
      returnUrl: "",
      erreur: '',
      role: '',
      roles: [{id: 2, role: 'Company', name: 'Commerce'}, {id: 3, role: 'DeliveryMan', name: 'Livreur'}, {id: 4, role: 'Admin', name: 'Administrateur'}]
    };
  },
  watch: {
    passwordValidation: function (val) {
      const self = this;
      if (val != self.password) {
        self.erreur = "Le mot de passe n'est pas identique"
        self.valid = false;
      }
      else {
        self.erreur = "";
        self.valid = true;
      }

    },
    password: function (val) {
      const self = this;
      val == '' ? self.erreur = '' : null;
    }

  },
  created() {
    let self = this;

    if (authenticationService.currentUserValue) {
      return self.$router.push('/products');
    }

    self.returnUrl = self.$route.query.returnUrl || "/";
  },
  methods: {
    register() {

      this.loading = true;
      apiService.post('https://app-benj.com/api/register', { name: this.user.name, email: this.user.email, password: this.password, id_role: this.role }).then((response) => {
        console.log(response);
        EventBus.$emit('updateSnack', { etat: true, text: "vous êtes desormais inscrit", color: 'success' })
        this.$router.push('/login')

      })
    }
  }
};