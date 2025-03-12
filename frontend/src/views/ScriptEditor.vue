<template>
  <defaultLayout>
    <div class="script-editor">
      <h1>{{ isEditMode ? 'Edit Script' : 'Create Script' }}</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <div>
            <label for="name">Name:</label>
            <input id="name" v-model="script.name" required />
          </div>
          <div>
            <label for="route">Route:</label>
            <select id="route" v-model="currentEndp">
              <option
                v-for="endpoint in endpoints"
                :key="endpoint._id"
                :value="endpoint"
                :selected="endpoint._id === currentEndp.value?._id"
              >
                {{ endpoint.route }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label for="language">Language:</label>
          <select id="language" v-model="script.language" required>
            <option v-for="language in languages" :key="language" :value="language">
              {{ language }}
            </option>
          </select>
        </div>

        <div class="editor-container">
          <prism-editor
            v-model="code"
            :highlight="highlightCode"
            :line-numbers="true"
            class="my-editor"
          />
        </div>

        <div>
          <button type="submit" @click.prevent="handleSubmit(script)">{{ isEditMode ? 'Update' : 'Create' }}</button>
          <button v-if="isEditMode" @click.prevent="handleDelete">Delete</button>
        </div>
      </form>
    </div>
  </defaultLayout>
</template>

<script setup lang="ts">
import defaultLayout from '../layouts/defaultLayout.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '../utils/axiosInstance'
import type { Script } from '../types/Script'
import type { Endpoint } from '../types/Endpoint'
// @ts-ignore
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import 'highlight.js/styles/monokai.css'
import hljs from 'highlight.js'
import 'highlight.js/lib/common'

const route = useRoute()
const router = useRouter()
const isEditMode = ref(false)
const endpoints = ref<Endpoint[]>([])
const currentEndp = ref<Endpoint>()
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

const fetchScript = async (scriptId: string) => {
  try {
    const response = await axiosInstance.get(`/scripts/${scriptId}`)
    script.value = response.data
    console.log('Script:', script.value)
  } catch (error) {
    console.error('Error fetching script:', error)
  }
}

const fetchEndpoints = async () => {
  try {
    const response = await axiosInstance.get('/endpoints')
    endpoints.value = response.data
    endpoints.value.unshift({
      _id: '',
      route: 'No route',
      petitionType: 'GET',
      authentication: '',
      status: false,
      scriptId: '',
    })
    currentEndp.value = endpoints.value.find((endp) => endp.scriptId === script.value._id)
    console.log('Current endpoint:', currentEndp.value)
  } catch (error) {
    console.error('Error fetching endpoints:', error)
  }
}

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

const handleSubmit = async (script: Script) => {
  try {
    if (isEditMode.value) {
      console.log('Updating script:', script)
      await axiosInstance.put(`/scripts/${route.params.id}`, script)
    } else {
      await axiosInstance.post('/scripts', script)
    }
    router.push('/scripts')
  } catch (error) {
    console.error('Error saving script:', error)
  }
}

const handleDelete = async () => {
  try {
    await axiosInstance.delete(`/scripts/${route.params.id}`)
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
  await fetchEndpoints()
  await fetchLanguages()

  if (scriptTextarea.value) {
    scriptTextarea.value.addEventListener('keydown', handleTabKey)
  }
})
</script>

<style scoped>
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
  width: 100%;
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
