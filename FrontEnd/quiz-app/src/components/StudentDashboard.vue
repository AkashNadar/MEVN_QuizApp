<template>
  <div>
    <div>
      <p class="text-2xl text-center">Welcome {{ user.firstName }}!</p>
    </div>
    <div>
      <t-modal class="text-[black]" header="Enter Quiz Code" v-model="showModal">
        <form @submit.prevent="startQuiz">
          <t-input name="my-input" v-model="quizCode"/>
        
          <div class="m-4 mx-auto">
              <t-button type="submit" class="mx-auto">Start</t-button>
          </div>
        </form>
      </t-modal>
      <t-button type="button" @click="showModal=true" class="mx-auto mt-[50px]"> Attempt a Quiz! </t-button>
    </div>
    <ul class="text-center w-[550px] mx-auto">
      <li v-for="result in quizResults" :key="result._id" class="m-6">
        <t-card :header="result.testName">
          <div class="flex justify-around">
            <p>
              <span class="text-[#43e043]">Right Ans:- </span
              >{{ result.rightAns }}
            </p>
            <p>
              <span class="text-[red]">Wrong Ans:- </span>{{ result.wrongAns }}
            </p>
          </div>

          <template v-slot:footer> Percentage {{ result.percent }} </template>
        </t-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Student-Dashboard",
  data() {
    return {
      quizResults: [],
      showModal: false,
      quizCode: '',
    };
  },
  methods: {
    startQuiz() {
      this.$router.replace({
        path: `/questions/${this.quizCode}`
      })
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  mounted() {
    axios
      .get(`/results/getResults/${this.user._id}`)
      .then((response) => {
        this.quizResults = response.data.results;
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
</script>

<style>
</style>