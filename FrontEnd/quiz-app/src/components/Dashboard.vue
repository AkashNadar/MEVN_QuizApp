<template>
  <div> 
    <div v-if="user.accessLevel === 'student'">
      <student-dashboard />
    </div>
    <div v-if="user.accessLevel === 'teacher'">
      <teacher-dashboard />
    </div>
    <div v-if="user.accessLevel === 'admin'">
      <admin-dashboard />
    </div>
  </div>
</template>

<script>
import StudentDashboard from '@/components/StudentDashboard.vue'
import TeacherDashboard from '@/components/TeacherDashboard.vue'
import { mapGetters } from "vuex";
import AdminDashboard from './AdminDashboard.vue';
export default {
  name: 'Dashboard-Component',
  components: {
    StudentDashboard,
    TeacherDashboard,
    AdminDashboard,
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    })
  },

}
</script>

<style>

</style>