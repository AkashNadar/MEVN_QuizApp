<template>
  <div class="flex w-full mt-[100px] justify-center items-center">
    <div class="w-full max-w-lg bg-[white] rounded">
      <form class="w-full max-w-lg px-8 pt-6 pb-8 mb-4" 
        @submit.prevent="handleSubmit"
      >
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="
                block
                uppercase
                tracking-wide
                text-gray-700 text-xs
                font-bold
                mb-2
              "
              for="grid-first-name"
            >
              First Name
            </label>
            <input
              class="
                appearance-none
                block
                w-full
                bg-gray-200
                text-gray-700
                border border-red-500
                rounded
                py-3
                px-4
                mb-3
                leading-tight
                focus:outline-none focus:bg-white
              "
              id="grid-first-name"
              type="text"
              placeholder="Jane"
              v-model="firstName"
              required
            />
            <p class="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="
                block
                uppercase
                tracking-wide
                text-gray-700 text-xs
                font-bold
                mb-2
              "
              for="grid-last-name"
            >
              Last Name
            </label>
            <input
              class="
                appearance-none
                block
                w-full
                bg-gray-200
                text-gray-700
                border border-gray-200
                rounded
                py-3
                px-4
                leading-tight
                focus:outline-none focus:bg-white focus:border-gray-500
              "
              id="grid-last-name"
              type="text"
              placeholder="Doe"
              v-model="lastName"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="
                block
                uppercase
                tracking-wide
                text-gray-700 text-xs
                font-bold
                mb-2
              "
              for="email"
            >
              Email
            </label>
            <input
              class="
                appearance-none
                block
                w-full
                bg-gray-200
                text-gray-700
                border border-gray-200
                rounded
                py-3
                px-4
                mb-3
                leading-tight
                focus:outline-none focus:bg-white focus:border-gray-500
              "
              id="email"
              type="email"
              placeholder="JaneDoe11@gmail.com"
              v-model="email"
              required
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="
                block
                uppercase
                tracking-wide
                text-gray-700 text-xs
                font-bold
                mb-2
              "
              for="grid-password"
            >
              Password
            </label>
            <input
              class="
                appearance-none
                block
                w-full
                bg-gray-200
                text-gray-700
                border border-gray-200
                rounded
                py-3
                px-4
                mb-3
                leading-tight
                focus:outline-none focus:bg-white focus:border-gray-500
              "
              id="grid-password"
              type="password"
              placeholder="******************"
              v-model="password"
              required
            />
            <p class="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div class="flex items-center justify-center">
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
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import {addUser} from '@/services/user.js'; 

export default {
  name: "SignUp-Component",
  data() {
    return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: null,
        response: null,
    }
  },
  methods: {
    async handleSubmit(){
        const data = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
        };

        try {
            const response = await addUser(data)
            this.response = response
            this.$router.push('/login')
        }
        catch (err) {
            this.error = err;
        }
    }
  } 
};
</script>

<style>
</style>