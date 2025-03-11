<template>
  <div class="script-editor">
    <h1>{{ isEditMode ? 'Edit Script' : 'Create Script' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="route">Route:</label>
        <select id="route" v-model="script.endpointId" required>
          <option v-for="endpoint in endpoints" :key="endpoint._id" :value="endpoint._id">
            {{ endpoint.route }}
          </option>
        </select>
      </div>
      <div>
        <label for="petitionType">Petition Type:</label>
        <select id="petitionType" v-model="script.endpointId" required>
          <option v-for="endpoint in endpoints" :key="endpoint._id" :value="endpoint._id">
            {{ endpoint.petitionType }}
          </option> <!-- TODO: make this dynamic -->
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div>
        <label for="language">Language:</label>
        <select id="language" v-model="script.language" required>
          <option value="js">JavaScript</option>
          <option value="sh">Shell</option>
        </select>
      </div>
      <div>
        <label for="content">Script:</label>
        <textarea id="content" v-model="script.code" required></textarea>
      </div>
      <div>
        <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
        <button v-if="isEditMode" @click.prevent="handleDelete">Delete</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '../utils/axiosInstance'
import type { Script } from '../types/Script'
import type { Endpoint } from '../types/Endpoint'

const route = useRoute()
const router = useRouter()
const isEditMode = ref(false)
const script = ref<Script>({
  _id: '',
  name: '',
  code: '',
  language: '',
  endpointId: '',
  userId: '',
  __v: 0,
})

const endpoints = ref<Endpoint[]>([])

onMounted(async () => {
  if (route.params.id) {
    isEditMode.value = true
    try {
      const response = await axiosInstance.get(`/scripts/${route.params.id}`)
      script.value = response.data
    } catch (error) {
      console.error('Error fetching script:', error)
    }
  }
  try {
    const response = await axiosInstance.get('/endpoints')
    endpoints.value = response.data
  } catch (error) {
    console.error('Error fetching endpoints:', error)
  }
})

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await axiosInstance.put(`/scripts/${route.params.id}`, script.value)
    } else {
      await axiosInstance.post('/scripts', script.value)
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
</style>
