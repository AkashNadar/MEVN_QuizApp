<template>
  <div class="flex w-full mt-[100px] justify-center items-center"> 
    <div class="w-full max-w-xl">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        @submit.prevent="handleSubmit"
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            id="email"
            type="email"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="
              shadow
              appearance-none
              border border-red-500
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              mb-3
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            id="password"
            type="password"
            placeholder="******************"
            v-model="password"
            required
          />
          <p class="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="
              bg-[#1C6758]
              hover:bg-[#12463c]
              text-white
              font-bold
              py-2
              px-4
              rounded
              focus:outline-none focus:shadow-outline
            "
            type="submit"
          >
            Sign In
          </button>
          <a
            class="
              inline-block
              align-baseline
              font-bold
              text-sm text-[#1C6758]
              hover:text-[#12463c]
            "
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
// import {loginUser} from '@/services/user.js';
import { mapActions } from 'vuex';

export default {
  name: "Login-Component",
  data() {
    return {
      email: '',
      password: '',
      response: null,
      error: null,
    }
  },
  methods: {

    ...mapActions({
      login: 'auth/login'
    }),

    handleSubmit(){
      const data = {
        email: this.email,
        password: this.password
      };
      this.login(data)
      .then(()=> {
        this.$router.replace({
          name: 'dashboard'
        })
      })
      .catch((err)=> {
        console.log(err);
      })
      // try{
      //   const response = await loginUser(data);
      //   this.response = response;
      //   console.log(this.login);
      // }
      // catch(err) {
      //   this.error = err;
      //   console.log(this.error);
      // }

    }
  }
};
</script>

<style>
</style>