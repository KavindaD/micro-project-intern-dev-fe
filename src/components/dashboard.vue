<template>
  <v-app>
    <ul>
        <li> <h4 class="ml-16 my-5 subtitle-1">All Admin Users List</h4> </li>
        <li><v-btn color="success" router-link to="/add-new" >Add New Admin</v-btn></li>
    </ul>

    <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">Edit Admin</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedAdmin.username"
                      label="Username"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedAdmin.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="6">
                    <v-text-field
                      prefix="+94"
                      v-model.number="editedAdmin.contact_number"
                      label="Contact Number"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="6">
                    <v-text-field
                      v-model="editedAdmin.password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save(editedAdmin)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

    <v-simple-table fixed-header class="mx-16">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left">Username</th>
            <th class="text-left">Contact Number</th>
            <th class="text-left">Email</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(admin, index) in adminList" :key="admin.username">
            <td>{{ index + 1 }}</td>
            <td>{{ admin.username }} </td>
            <td>{{ admin.contact_number }}</td>
            <td>{{ admin.email }}</td>
            <td>
              <v-icon small class="mr-2" @click="editAdmin(admin)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteAdmin(admin.id)">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: "dashboard",
  created(){
    this.getAdminList()
  },
  data() {
    return {
      adminList: [],
      editedAdmin: {
        id : '',
        username : '',
        email: '',
        contact_number: null,
        password: ''
      },
      dialog: false
    };
  },
  methods: {
    getAdminList() {
      axios.get('http://localhost:5000/getAll')
        .then((response) => {
          console.log(response.data)
          this.adminList = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteAdmin(id) {
      axios.delete('http://localhost:5000/delete/' + id)
      .then(() => {
        this.getAdminList()
      })
    },
    editAdmin(admin) {
      this.editedAdmin = Object.assign({}, admin)
      this.dialog = true
    },
    save (editedAdmin) {
      axios.put('http://localhost:5000/update', editedAdmin)
      .then(() => {
        this.getAdminList()
      })
      .catch(error => console.log(error))
      this.dialog =false
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editAdmin = {
          id : '',
          username : '',
          email: '',
          contact_number: null,
          password: ''
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
    list-style-type: none;
    margin: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
</style>