<template>
  <div>

    <div class="mt-[30px]">
      <t-modal class="text-[black]" header="Add Question" v-model="showAddQuestion">
        <form @submit="addQuestion">
          <t-input name="question" v-model="data.question" placeholder="Question"/>
          <t-input name="op1" v-model="data.op1" placeholder="Option 1"/>
          <t-input name="op2" v-model="data.op2" placeholder="Option 2"/>
          <t-input name="op3" v-model="data.op3" placeholder="Option 3"/>
          <t-input name="op4" v-model="data.op4" placeholder="Option 4"/>
          <t-input name="ans" v-model="data.ans" placeholder="Answer"/>

          <div class="m-4 mx-auto">
              <t-button type="submit">Add</t-button>
          </div>
        </form>
      </t-modal>
      <t-button type="button" @click="showAddQuestion=true" class="mx-auto"> Add Question </t-button>
    </div>
    <ul class="text-center w-[550px] mx-auto" v-if="questions">
      <li v-for="question in questions" :key="question._id" class="m-6">
        <t-card :header="'Question:-' + question.question">
          <div class="">
            <p>a. {{question.options[0]}}</p>
            <p>b. {{question.options[1]}}</p>
            <p>c. {{question.options[2]}}</p>
            <p>d. {{question.options[3]}}</p>
            <p>Answer:- {{question.ans}}</p>
          </div>
          <template v-slot:footer>
            <div>
              <t-button @click="deleteQuestion(question._id)" type="button"> Delete </t-button>
            </div>
          </template>
        </t-card>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {    
    name: "edit-test",
    data() {
      return {
        questions: [],
        showAddQuestion: false,
        data : {
          question: '',
          op1: '',
          op2: '',
          op3: '',
          op4: '',
          ans: '',
        },
        error: '',
      }
    },
    methods:{ 
      addQuestion(){
        axios.patch(`/question/${this.$route.params.id}`, this.data)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err.message);
        })
      },
      deleteQuestion(id) {
        // console.log(this.$route.params.id);
        // console.log(id);
        axios.delete(`/question/${this.$route.params.id}/removeQuestion/${id}`)
        .then(() => {

        })
        .catch((err) =>{
          this.error = err.message;
        });
      }
    },
    mounted() {
      axios.get(`/question/${this.$route.params.id}`)
      .then((Response) => {
        this.questions = Response.data.questions
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
}
</script>

<style>

</style>