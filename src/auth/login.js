
import _ from 'lodash'
import { authenticationService } from '../_services/authentication.service';

export default {

  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      emailRules: [
        (v) => !!v || "E-mail requis",
        (v) => /.+@.+\..+/.test(v) || "Ce champ doit être un email"
      ],
      pwdRules: [(v) => !!v || "Mot de passe requis"],
      lazy: false,
      valid: true,
      loading: false,
      returnUrl: "",
      erreur: ''
    };
  },
  created() {
    let self = this;

    if (authenticationService.currentUserValue) {
      return self.$router.push('/profil');
    }

    self.returnUrl = self.$route.query.returnUrl || "/profil";
  },
  methods: {
    connection() {
      let self = this;

      self.loading = true;
      authenticationService.login(self.user).then(
        (user) => {
          if (user == 'Utilisateur suspendu') {
            self.erreur = 'Utilisateur suspendu'
          } else if (user == 'login invalide') {
            self.erreur = 'mot de passe ou email oublié'
          } else {
            for (let i = 0; i < 4; i++) {
              if (user == 'tentative restant: ' + i) {
                self.erreur = 'tentative restant: ' + i;
              }
              else if (user == "trop de tentative, vous pourrez reessayer dans 1 heure") {
                self.erreur = 'trop de tentative, vous pourrez reessayer dans 1 heure'
              } else if (_.isObject(user)) {
                self.erreur = '';
                self.$router.push(self.returnUrl);
                break
              }

            }
          }
        },
        (error) => {
          console.log(error)
          self.loading = false;
        }
      );
    }
  }
};