<template>
  <defaultLayout>
    <div class="script-editor">
      <h1>{{ isEditMode ? 'Edit Script' : 'Create Script' }}</h1>
      <form @submit.prevent="handleFormSubmit">
        <div class="form-row">
          <div>
            <label for="name">Name:</label>
            <input id="name" v-model="script.name" required />
          </div>
          <!-- <div>
            <label for="route">Route:</label>
            <select id="route" v-model="actualEndp">
              <option
                v-for="endpoint in endpoints"
                :key="endpoint._id"
                :value="endpoint"
                :selected="endpoint._id === actualEndp?._id"
              >
                {{ endpoint.route }}
              </option>
            </select>
          </div> -->
          <div>
            <label for="language">Language:</label>
            <select id="language" v-model="script.language" required>
              <option v-for="language in languages" :key="language" :value="language">
                {{ language }}
              </option>
            </select>
          </div>
        </div>

        <div class="editor-container">
          <prism-editor
            v-model="code"
            :highlight="highlightCode"
            :line-numbers="true"
            class="my-editor"
          />
        </div>

        <div class="form-row">
          <button class="delete" v-if="isEditMode" @click.prevent="handleDelete">Delete</button>
          <button class="submit" type="submit" @click.prevent="handleSubmit(script)">
            {{ isEditMode ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </defaultLayout>
</template>

<script setup lang="ts">
import defaultLayout from '../layouts/defaultLayout.vue'
import { ref, onMounted, getCurrentWatcher } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '../utils/axiosInstance'
import type { Script } from '../types/Script'
// @ts-ignore
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import 'highlight.js/styles/monokai.css'
import hljs from 'highlight.js'
import 'highlight.js/lib/common'

const route = useRoute()
const router = useRouter()
const isEditMode = ref(false)
// import type { Endpoint } from '../types/Endpoint'
// const endpoints = ref<Endpoint[]>([])
// const initialEndp = ref<Endpoint>()
const scriptTextarea = ref<HTMLTextAreaElement | null>(null)
const languages = ref<string[]>([])
const code = ref('console.log("Hello, Vue!");')

const script = ref<Script>({
  _id: '',
  name: '',
  userId: '',
  code: '',
  language: '',
  __v: 0,
})

// const actualEndp = ref<Endpoint>({
//       _id: '',
//       route: 'No route',
//       petitionType: 'GET',
//       authentication: '',
//       status: false,
//       scriptId: '',
//     })

const fetchScript = async (scriptId: string) => {
  try {
    const response = await axiosInstance.get(`/scripts/${scriptId}`)
    script.value = response.data
    console.log('Script:', script.value)
  } catch (error) {
    console.error('Error fetching script:', error)
  }
}

// const fetchEndpoints = async () => {
//   try {
//     const response = await axiosInstance.get('/endpoints')
//     endpoints.value = response.data
//     endpoints.value.unshift(actualEndp.value)
//     initialEndp.value = endpoints.value.find((endp) => endp.scriptId === script.value._id)
//     console.log('Current endpoint:', initialEndp.value)
//     actualEndp.value = initialEndp.value || {
//       _id: '',
//       route: '',
//       petitionType: 'GET',
//       authentication: '',
//       status: false,
//       scriptId: '',
//     }
//   } catch (error) {
//     console.error('Error fetching endpoints:', error)
//   }
// }

const fetchLanguages = async () => {
  try {
    const response = await axiosInstance.get('/languages')
    languages.value = response.data
  } catch (error) {
    console.error('Error fetching languages:', error)
  }
}

const handleTabKey = (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    event.preventDefault()
    const textarea = event.target as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end)
    textarea.selectionStart = textarea.selectionEnd = start + 1
    textarea.dispatchEvent(new Event('input'))
  }
}

const highlightCode = (code: string) => {
  if (!script.value.language) {
    return hljs.highlightAuto(code).value
  } else {
    console.log('language:', script.value.language)
    return hljs.highlight(code, { language: script.value.language }).value
  }
}

const handleFormSubmit = async (event: Event) => {
  event.preventDefault()
  await handleSubmit(script.value)
}

const handleSubmit = async (script: Script /*, endpoint: Endpoint*/) => {
  try {
    if (isEditMode.value) {
      // console.log('Updating script:', script)
      await axiosInstance.put(`/scripts/${route.params.id}`, script)
    } else {
      await axiosInstance.post('/scripts', script)
    }
    // router.push('/scripts')
  } catch (error) {
    console.error('Error saving script:', error)
  }

  // // Update endpoint
  // if (endpoint._id !== initialEndp.value?._id) {
  //   // 1º Update old endpoint
  //   if (initialEndp.value?._id) {
  //     initialEndp.value.scriptId = ''
  //     console.log(initialEndp)
  //     console.log('old endp:', initialEndp.value)
  //     await axiosInstance.put(`/endpoints/${initialEndp.value._id}`, initialEndp.value)
  //   }

  //   // 2º Update new endpoint
  //   if (endpoint._id) {
  //     endpoint.scriptId = script._id
  //     console.log('new endp:', endpoint)
  //     await axiosInstance.put(`/endpoints/${initialEndp.value?._id}`, endpoint)
  //   }
  // }
}

const handleDelete = async () => {
  try {
    await axiosInstance.delete(`/scripts/${script.value._id}`)
    router.push('/scripts')
  } catch (error) {
    console.error('Error deleting script:', error)
  }
}

onMounted(async () => {
  const scriptId = route.params.scriptId as string
  console.log('Script ID:', scriptId)
  if (scriptId) {
    isEditMode.value = true
    await fetchScript(scriptId)
  } else {
    console.log('Creating new script')
  }
  // await fetchEndpoints()
  await fetchLanguages()

  if (scriptTextarea.value) {
    scriptTextarea.value.addEventListener('keydown', handleTabKey)
  }
})
</script>

<style scoped>

@font-face{
  font-family: 'nothing';
  src: url('../assets/nothing-font-5x7.ttf');
}

h1 {
  font-size: 70px;
  font-family: 'nothing';
}

.script-editor {
  padding: 20px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-row {
  display: flex;
  justify-content: space-between;
  width: 80vw;
  
}

div {
  margin-bottom: 10px;
}

label {
  margin-right: 10px;
}

input,
select,
textarea {
  padding: 5px;
  width: 300px;
}

button {
  margin: 5px;
  padding: 10px 20px;
}

.delete {
  background-color: #ff0000;
  color: #000000;
}

.editor-container {
  background-color: #000000;
  font-size: medium;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 80vw;
  height: 60vh;
  caret-color: auto;
}
</style>
