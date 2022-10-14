<template>
  <div class="">
    <div class="w-96 mx-auto mt-[100px]">
      <form @submit.prevent="submitPassword">
        <t-input name="oldPass" placeholder="Old Password" type="password" v-model="data.oldPassword" required/>
        <t-input name="newPass" placeholder="New Password" type="password" v-model="newPassword" required/>
        <t-input name="cnfPass" placeholder="Confirm New Password" type="password" v-model="data.confirmPassword" required/>
        <t-button type="submit" class="mx-auto">Change Password</t-button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: "change-password",
  data() {
    return {
        newPassword: '',
        data : {
            oldPassword: '',
            confirmPassword: ''
        },
    }
  },
  computed: {
    ...mapGetters({
        user: 'auth/user',
    })
  },
  methods: {
    submitPassword() {
        if(this.newPassword === this.data.confirmPassword){
            axios.patch(`/users/password/${this.user._id}`, this.data)
            .then(() => {
                this.$router.replace({
                  name: 'dashboard'
                })
            })
            .catch(err => {
                console.log(err.data);
            });
        }
    }
  }
};
</script>

<style>
</style>