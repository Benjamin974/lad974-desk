import { authenticationService } from "../_services/authentication.service";

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
      erreur: ''
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
    password: function(val) {
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
      let self = this;

      self.loading = true;
      // authenticationService.register(self.user).then(
      //   (user: any) => {
      //     console.log(user);
      //   },
      //   (error: any) => {
      //     self.loading = false;
      //   }
      // );
    }
  }
};