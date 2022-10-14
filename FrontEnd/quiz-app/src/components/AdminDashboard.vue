<template>
  <div>
    <ul class="text-center w-[550px] mx-auto">
      <li v-for="user in users" :key="user._id" class="m-6" v-show="user.accessLevel !== 'admin'">
        <t-card :header="user.firstName + user.lastName" >
          <div class="flex justify-around">
            <p>EmaiId :- {{ user.email }}</p>
            <p>AccessLevel :- {{ user.accessLevel }}</p>
          </div>
          <template v-slot:footer>
            <div class="flex justify-between">
              <t-button type="button" @click="removeUser(user._id)">
                RemoveUser
              </t-button>
              <t-button type="button" @click="changeAccessLevel(user.accessLevel, user.email)">
                Change AccessLevel
              </t-button>
            </div>
          </template>
        </t-card>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "admin-dashboard",
  data() {
    return {
      users: [],
      error: "",
    };
  },
  methods: {
    updateUser() {
      axios
      .get(`/users/`)
      .then((resp) => {
        this.users = resp.data.users;
      })
      .catch((err) => {
        this.error = err.message;
      });
    },
    removeUser(id) {
        axios.delete(`/users/${id}`)
        .then(()=> {
          this.updateUser();
        })
        .catch(()=> {

        });
    },
    changeAccessLevel(accessLevel, email){
        const data = {
            email: email,
            accessLevel: '',
        }
        if(accessLevel === 'student'){
            data.accessLevel = 'teacher';
        }
        else {
            data.accessLevel = 'student';
        }
        axios.post('/users/updateAccessLevel', data)
        .then(() => {
            this.updateUser();
        })
        .catch((err) => {
            console.log(err);
        });
    }
  },
  mounted() {
    this.updateUser();
  },
};
</script>

<style>
</style>