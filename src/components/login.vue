<template>
    <v-app>
        <v-card
            elevation="2"
            width="500"
            class="mx-auto mt-12 pa-2"
        >
            <v-card-text>
                <v-text-field
                    label="Username/Email"
                    prepend-icon="mdi-account-circle"
                    v-model.lazy="username"
                    required
                />
                <v-text-field
                    label="Password"
                    prepend-icon="mdi-lock"
                    v-model.lazy="password"
                    required
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                />
            </v-card-text>

            <v-card-actions>
                <v-btn class="mx-auto" type="submit" color="info" router-link to="/dashboard">Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: '',
                showPassword: false
            }
        },
        methods: {
        },
        emits: [ 'compName' ],
        beforeMount(){
            this.$emit( 'compName', 'Login')
        },
    }
</script>

<style lang="scss" scoped>

</style>