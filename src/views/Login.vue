<template>
  <v-img 
    src="@/assets/farm-login-cut.jpg" 
    aspect-ratio="1.7"
    max-height="600px" 
    style="display:flex; align-items:center"
    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
    class="elevation-8"
  >
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col class="col-md-4 col-xs-12 col-sm-8">
          <v-card class="elevation-12">
            <v-app-bar dark color="pink" justify>
              <v-toolbar-title>Form Login</v-toolbar-title>
            </v-app-bar>

            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="mdi-account"
                  name="login"
                  label="Login"
                  type="text"
                  v-model="form.usuario"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="form.senha"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="logar" color="primary" to="/">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script>
import MaterialCard from "../components/MaterialCard.vue";
export default {
  components: { MaterialCard },
  name: "Login",
  props: {
    source: String,
  },
  data: ()=> ({
    form: {
      login:"",
      senha:""
    }
  }),
  methods: {
    logar() {
      console.log(this.form)

    }
  }
};
</script>

<style></style>
