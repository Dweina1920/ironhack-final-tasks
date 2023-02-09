<template>
  <div v-if="inputContainer === false" class="container one  ">
    <div
      class="w-full h-60 bg-white border  rounded-xl  shadow-lg shadow-turquesa"
    >
      <div class="p-4 h-full flex flex-col justify-around items-center">
        <a href="#">
          <h5
            :class="
              props.task.is_complete
                ? 'my-2 text-2xl-center font-bold tracking-tight text-gray-900 dark:text-white  line-through'
                : 'my-2 text-2xl-center font-bold tracking-tight text-gray-900 dark:text-white'
            "
          >
            {{ task.title }}
          </h5>
        </a>
        <p
          :class="
            props.task.is_complete
              ? 'my-2 font-normal text-gray-700 text-center dark:text-gray-400  line-through'
              : 'my-2 font-normal text-gray-700 text-center dark:text-gray-400'
          "
        >
          {{ task.description }}
        </p>
        <div class="my-2 inline-flex rounded-md shadow-sm" role="group">
          <button
            @click="deleteTask"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-marron-900 rounded-l-lg hover:bg-verde hover:text-white focus:z-10 focus:ring-2 focus:ring-verde-500 focus:bg-verde-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-trash"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#615055"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
          <button
            @click="showInput"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-marron-900 hover:bg-verde hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-verde-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-edit"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#615055"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"
              />
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
              <line x1="16" y1="5" x2="19" y2="8" />
            </svg>
          </button>
          <button
            @click="completeTask"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-marron-900 rounded-r-md hover:bg-verde hover:text-white focus:z-10 focus:ring-2 focus:ring-verde-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-checks"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#615055"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 12l5 5l10 -10" />
              <path d="M2 12l5 5m5 -5l5 -5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container edit">
    <div
      class="max-w-sm bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-4 flex flex-col justify-center items-center">
        <a href="#">
          <input
            type="text"
            v-model="currentTaskTitle"
            class="my-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white border rounded-xl"
          />
        </a>
        <input
          type="text"
          v-model="currentTaskDescription"
          class="my-2 font-normal text-gray-700 text-center dark:text-gray-400 border rounded-xl"
        />
        <div class="my-2 inline-flex rounded-md shadow-sm" role="group">
          <button
            @click="deleteTask"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-trash"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ff4500"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
          <button
            @click="showInput"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-edit"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#009988"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"
              />
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
              <line x1="16" y1="5" x2="19" y2="8" />
            </svg>
          </button>
          <button
            @click="completeTask"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-checks"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#946E83"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 12l5 5l10 -10" />
              <path d="M2 12l5 5m5 -5l5 -5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";
//definir emits para pasar lógica y eventos hacia componentes padres

const emit = defineEmits(["childComplete", "editChild"]);
//funcion para completar tarea que se encarga de ennviar la info al padre

const completeTask = () => {
  emit("childComplete", props.task);
};

const taskStore = useTaskStore();

const props = defineProps({
  task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

const toggleButton = () => {
  tareaCompletada.value = !tareaCompletada.value;
};

// funcion editar
const inputContainer = ref(false);
const currentTaskTitle = ref("");
const currentTaskDescription = ref("");
const showInput = () => {
  console.log("click");
  inputContainer.value = !inputContainer.value;
  currentTaskTitle.value = props.task.title;
  currentTaskDescription.value = props.task.description;
};

const editTask = () => {
  if (
    currentTaskTitle.value.length === 0 ||
    currentTaskDescription.value.length === 0
  ) {
    alert("Title or Description can not be empty");
  } else {
    inputContainer.value = !inputContainer.value;
    taskStore.editTaskSupabase(
      currentTaskTitle.value,
      props.task.id,
      currentTaskDescription.value
    );
    emit("editChild");
  }
};
</script>

<style>
.clase1 {
  color: black;
}
.clase2 {
  color: black;
  text-decoration: line-through;
}
</style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
