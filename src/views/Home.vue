<template>

  <div class="wrapper">
    <NavDos />
    <div class="mt-10 lg:mx-44 flex  flex-col lg:flex-row lg:justify-between justify-center items-center gap-2">
      <p class=" flex flex-col lg:flex-row lg:justify-between gap-2 items-center ">Account of:   <p class="font-bold"> {{email}} </p></p>
      <p class=" ">{{ moment().format('DD-MM-YYYY') }}</p>
      
    </div>

    <div
      class="class-test"
    >
      <p class="dina-tailwind-test">
        Are you ready to do your tasks?
      </p>
      
      <p class=" text-2xl  font-extrabold text-marronoscuro text-center">
        Write them down here!
      </p>
    </div>
    <NewTask />

    <div class="flex flex-col justify-center items-center">
      <div
        class="w-9/12 flex inline-grid lg:grid-cols-3 gap-20 items-center sm:grid-cols-1"
      >
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @childComplete="completeTaskSupabase"
          @editCild="getTasks"
        />
      </div>
    </div>
    <!--<TaskItem  class="taskBox" v-for="task in tasks" :key="task.id" :task="task" @child-complete="completeTaskSupabase" @child-edit="editTaskSupabase"/>-->
  </div>
  <Footer />
</template>

<script setup>
import { ref, onUpdated } from "vue";
import { useTaskStore } from "../stores/task";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import NavDos from "../components/NavDos.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import Footer from "../components/Footer.vue";
import { defineStore } from "pinia";
import moment from 'moment';

//hora actual
 



//console.log(horaActual.split())

const taskStore = useTaskStore();
const userStore = useUserStore();

// Variable para guardar las tareas de supabase
const tasks = ref([]);

// Creamos una función que conecte a la store para conseguir las tareas de supabase
const getTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
};

getTasks();

onUpdated(() => {
  getTasks();
});
//definir emits para pasar lógica y eventos hacia componentes padres

//const emit = defineEmits(["booleanChild"]);
//funcion para completar tarea que se encarga de ennviar la info al padre

//const completeTask = () => {
  //emit("booleanChild", props.changeTasckBooleanValue);
 
//};



//const props = defineProps({
 // changeTasckBooleanValue: boolean,
//});

//funcion para completar tarea conectandose a supabase
const completeTaskSupabase = async (taskObject) => {
  //initial log to verify that is connected
  console.log("click from home");
  let taskId = taskObject.id;
  await taskStore.completeTask(taskObject.is_complete, taskId);
};

//traer el email de userstore 
onMounted(() => {
  getProfile();
});

const email = ref(null);

async function getProfile() {
  await userStore.fetchUser();

  email.value = userStore.profile.email;
 

}
</script>

<style>
 .class-test{
  @apply  flex flex-col justify-center items-center mt-8 leading-10
 }

 .dina-tailwind-test{
  @apply text-3xl   font-extrabold text-turquesa  text-center p-4
 }

</style>

<!-- 
**Hints**
1. ref() is used here!
2. (NewTask, TaskItem, Footer, Nav) components are used here! 
3. Tasks are going to be contained in an array here!
4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will 
contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function 
needs to be called within the setUp script in order to run within the first instance of this component lifecycle.

5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function
6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this 
async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the 
backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask 
Component. 

7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem 
component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show 
either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the 
task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function 
mentioned on hint4.


7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument 
will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the 
value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in 
order to call the right id. 
7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to 
call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call 
the function mentioned on hint4. 
7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to 
take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument 
oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function 
needs to call the function mentioned on hint4.
-->
