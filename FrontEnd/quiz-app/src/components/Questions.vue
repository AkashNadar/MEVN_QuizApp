<template>
  <div class="flex w-full h-screen justify-center items-center">
    <div class="w-full max-w-xl">
      <h1 class="font-bold text-5xl text-center text-[#EEF2E6]">{{testName}}</h1>

      <div class="bg-[#1C6758] p-12 rounded-lg shadow-lg w-full mt-8">
        <div v-if="index <= count - 1">
          <p class="text-2xl font-bold">{{ questions[index].question }}</p>
          <label
            v-for="ans in questions[index]['options']"
            :key="ans"
            :for="ans"
            class="
              block
              mt-4
              border border-[#EEF2E6]
              rounded-lg
              py-2
              px-6
              text-lg
            "
            :class="{
              'hover:bg-[#3D8361] cursor-pointer': selectedAnswer == '',
              'bg-[#2C3639]': selectedAnswer == ans,
            }"
          >
            <input
              type="radio"
              class="hidden"
              :id="ans"
              :value="ans"
              @change="answered($event)"
              :disabled="selectedAnswer != ''"
            />
            {{ ans }}
          </label>
          <div class="mt-6 flow-root">
            <button
              class="
                float-right
                bg-[#2C3639]
                text-[#EEF2E6] text-sm
                font-bold
                tracking-wide
                rounded-full
                px-5
                py-2
              "
              v-show="selectedAnswer != '' && index < count - 1"
              @click="nextQuestion"
            >
              Next &gt;
            </button>

            <button
              class="
                float-right
                bg-[#2C3639]
                text-[#EEF2E6] text-sm
                font-bold
                tracking-wide
                rounded-full
                px-5
                py-2
              "
              v-show="selectedAnswer != '' && index == count - 1"
              @click="showResults"
            >
              Finish
            </button>
          </div>
        </div>
        <div v-if="index == count">
          <h2 class="text-bold text-3xl">Result</h2>
          <div class="flex justify-start space-x-4 mt-6">
            <p>
              Correct Answers:
              <span class="text-2xl font-bold">{{ correctAnswers }}</span>
            </p>
            <p>
              Wrong Answers:
              <span class="text-2xl font-bold">{{ wrongAnswers }}</span>
            </p>
          </div>
          <div>
            <t-button @click="dashNavigate">Dashboard</t-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQuest } from "../services/getQuestions.js";
import { mapGetters } from "vuex";
import axios from 'axios';

export default {
  name: "Question-List",
  data() {
    return {
      index: 0,
      questions: [],
      testName: '',
      count: 0,
      selectedAnswer: "",
      correctAnswers: 0,
      wrongAnswers: 0,
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    answered(event) {
      this.selectedAnswer = event.target.value;
      if (this.selectedAnswer == this.questions[this.index]["ans"])
        this.correctAnswers++;
      else this.wrongAnswers++;
    },
    nextQuestion() {
      this.index++;
      this.selectedAnswer = "";
    },
    showResults() {
      const percent = Math.floor((this.correctAnswers/this.questions.length) * 100);
      const data = {
        userId: this.user._id,
        rightAns: this.correctAnswers,
        wrongAns: this.wrongAnswers,
        percent: percent,
        testName: this.testName,
      }
      axios.post('/results', data)
      .then(() => {
        this.index++;
      })
      .catch((err) => {
        console.log(err.message);
      })
      
    },
    dashNavigate() {
      this.$router.replace({
        name: 'dashboard'
      })
    }
  },
  async mounted() {
    try {
      const data = await getQuest(this.$route.params.id);
      this.questions = data.questions;
      this.testName = data.testName;
      this.count = this.questions.length;
    } catch (error) {
      this.error = error;
    }
  },
};
</script>

<style>
/* 
#1C6758 
#3D8361
#D6CDA4
#EEF2E6
#2C3639
*/
</style>