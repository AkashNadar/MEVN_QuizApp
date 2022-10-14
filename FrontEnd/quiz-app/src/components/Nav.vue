<template>
  <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-[#1C6758]">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a class="flex items-center" @click.prevent="homeRoute">
        <img
          src="../assets/Quiz-Logo-PNG-HD.png"
          class="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
      </a>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="
          inline-flex
          items-center
          p-2
          ml-3
          text-sm text-gray-500
          rounded-lg
          md:hidden
          hover:bg-gray-100
          focus:outline-none focus:ring-2 focus:ring-gray-200
          dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600
        "
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="
            flex flex-col
            p-4
            mt-4
            bg-gray-50
            rounded-lg
            border border-gray-100
            md:flex-row
            md:space-x-8
            md:mt-0
            md:text-sm
            md:font-medium
            md:border-0
            md:bg-white
            dark:bg-gray-800
            md:dark:bg-[#1C6758]
            dark:border-gray-700
          "
        >
          <template v-if="!authenticated">
            <li>
              <a
                href="#"
                class="
                  block
                  py-2
                  pr-4
                  pl-3
                  text-white
                  bg-blue-700
                  rounded
                  md:bg-transparent md:text-[#252c2d] md:p-0
                  dark:text-white
                  font-bold
                "
                aria-current="page"
                @click.prevent="homeRoute"
                >Home</a
              >
            </li>
            <li>
              <a
                href="#"
                class="
                  block
                  py-2
                  pr-4
                  pl-3
                  text-gray-700
                  rounded
                  hover:bg-gray-100
                  md:hover:bg-transparent
                  md:border-0
                  md:hover:text-blue-700
                  md:p-0
                  dark:text-gray-300
                  md:dark:hover:text-white
                  dark:hover:bg-gray-700 dark:hover:text-white
                  md:dark:hover:bg-transparent
                "
                >About</a
              >
            </li>
            <li>
              <a
                href="#"
                class="
                  block
                  py-2
                  pr-4
                  pl-3
                  text-gray-700
                  rounded
                  hover:bg-gray-100
                  md:hover:bg-transparent
                  md:border-0
                  md:hover:text-blue-700
                  md:p-0
                  dark:text-gray-300
                  md:dark:hover:text-white
                  dark:hover:bg-gray-700 dark:hover:text-white
                  md:dark:hover:bg-transparent
                "
                @click.prevent="loginRoute"
                >Login</a
              >
            </li>
            <li>
              <a
                href="#"
                class="
                  block
                  py-2
                  pr-4
                  pl-3
                  text-gray-700
                  rounded
                  hover:bg-gray-100
                  md:hover:bg-transparent
                  md:border-0
                  md:hover:text-blue-700
                  md:p-0
                  dark:text-gray-300
                  md:dark:hover:text-white
                  dark:hover:bg-gray-700 dark:hover:text-white
                  md:dark:hover:bg-transparent
                "
                @click.prevent="signupRoute"
                >SignUp</a
              >
            </li>
          </template>
          <template v-else>
            <li>
              <div class="flex items-center md:order-2">
                <button
                  @click="
                    toggleUserIcon
                      ? (toggleUserIcon = false)
                      : (toggleUserIcon = true)
                  "
                  type="button"
                  class="
                    flex
                    mr-3
                    text-sm
                    bg-gray-800
                    rounded-full
                    md:mr-0
                    focus:ring-4 focus:ring-gray-300
                    dark:focus:ring-gray-600
                  "
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="w-8 h-8 rounded-full"
                    src="../assets/blank-profile-picture-973460__340.png"
                    alt="user photo"
                  />
                </button>
                <!-- Dropdown menu -->
                <div
                  v-if="toggleUserIcon"
                  class="
                    absolute
                    mt-[250px]
                    ml-[-108px]
                    z-50
                    my-4
                    text-base
                    list-none
                    bg-white
                    rounded
                    divide-y divide-gray-100
                    shadow
                    dark:bg-gray-700 dark:divide-gray-600
                  "
                  id="user-dropdown"
                >
                  <div class="py-3 px-4">
                    <span class="block text-sm text-gray-900 dark:text-white">
                      {{user.firstName + " " + user.lastName}}
                    </span>
                    <span
                      class="
                        block
                        text-sm
                        font-medium
                        text-gray-500
                        truncate
                        dark:text-gray-400
                      "
                      >
                      {{user.email}}
                      </span
                    >
                  </div>
                  <ul class="py-1" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="#"
                        class="
                          block
                          py-2
                          px-4
                          text-sm text-gray-700
                          hover:bg-gray-100
                          dark:hover:bg-gray-600
                          dark:text-gray-200
                          dark:hover:text-white
                        "
                        @click.prevent="showDashboard"
                        >Dashboard</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="
                          block
                          py-2
                          px-4
                          text-sm text-gray-700
                          hover:bg-gray-100
                          dark:hover:bg-gray-600
                          dark:text-gray-200
                          dark:hover:text-white
                        "
                        @click.prevent="passwordRoute"
                        >Settings</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="
                          block
                          py-2
                          px-4
                          text-sm text-gray-700
                          hover:bg-gray-100
                          dark:hover:bg-gray-600
                          dark:text-gray-200
                          dark:hover:text-white
                        "
                        @click.prevent="signOut"
                        >Sign out</a
                      >
                    </li>
                  </ul>
                </div>
                <button
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  class="
                    inline-flex
                    items-center
                    p-2
                    ml-1
                    text-sm text-gray-500
                    rounded-lg
                    md:hidden
                    hover:bg-gray-100
                    focus:outline-none focus:ring-2 focus:ring-gray-200
                    dark:text-gray-400
                    dark:hover:bg-gray-700
                    dark:focus:ring-gray-600
                  "
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  <span class="sr-only">Open main menu</span>
                  <svg
                    class="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Nav-Component",
  data() {
    return {
      toggleUserIcon: false,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      signOutAction: 'auth/signOut'
    }),

    signOut(){
      this.signOutAction()
      .then(()=> {
        this.$router.replace({
          name: 'login'
        })
      })
    },

    showDashboard(){
      this.$router.replace({
        name: 'dashboard',
      })
    },

    loginRoute(){
      this.$router.replace({
        name: 'login',
      })
    },
    signupRoute(){
      this.$router.replace({
        name: 'signup',
      })
    },
    passwordRoute() {
      this.$router.replace({
        name: 'changePassword'
      })
    },
    homeRoute() {
      if(this.user){
        this.$router.replace({
          name: 'dashboard'
        })
      }
      else {
        this.$router.replace({
          name: 'home'
        })
      }
    }
  }

};
</script>

<style>
</style>