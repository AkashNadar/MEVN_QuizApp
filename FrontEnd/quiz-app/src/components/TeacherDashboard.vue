<template>
  <div>
    <div class="mx-[300px]">
      <t-input name="testName" v-model="testName" placeholder="Test Name"/>
      <t-button type="button" @click.prevent="createTest" class="mx-auto">CreateTest</t-button>
    </div>
    <ul class="text-center w-[550px] mx-auto">
      <li v-for="test in tests" :key="test._id" class="m-6">
        <t-card :header="test.testName">
          <div class="flex justify-around">
            <p>Total No of Questions :- {{ test.test.length }}</p>
            <p>Code :- {{ test._id }}</p>
          </div>
          <template v-slot:footer>
            <div class="flex justify-between">
              <t-button @click="removeTest(test._id)" type="button">
                Delete
              </t-button>
              <t-button type="button" @click.prevent="editTest(test._id)">
                Edit
              </t-button>
            </div>
          </template>
        </t-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "teacher-dashboard",
  data() {
    return {
      tests: [],
      testName: '',
      error: "",
      createTestErr: ''
    };
  },
  methods: {
    getQuestion(){
      axios
      .get(`/question/getAllTest/${this.user.email}`)
      .then((response) => {
        this.tests = response.data.tests;
      })
      .catch((err) => {
        console.log(err.message);
      });
    },
    editTest(id) {
      this.$router.replace({
        path: `/dashboard/editTest/${id}`,
      });
    },
    removeTest(id) {
      axios
        .delete(`/question/deleteTest/${id}`)
        .then(() => {
          this.getQuestion();
        })
        .catch((err) => {
          this.error = err;
        });
    },
    createTest() {
      const data = {
        email: this.user.email,
        testName: this.testName,
      }
      axios.post('/question/createTest', data)
      .then((resp) => {
        // console.log(resp.data);
        this.$router.replace({
          path: `/dashboard/editTest/${resp.data.id}`,
        });
      })
      .catch((err) => {
        this.createTestErr = err.message;
      });
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  mounted() {
    this.getQuestion();
  },
};
</script>

<style>
</style>