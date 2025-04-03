<template>
  <div class="login">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input v-model="email" placeholder="Correo" required />
      </div>
      <div class="form-group">
        <input v-model="password" type="password" placeholder="Contraseña" required />
      </div>
      <button @click="handleLogin">Login</button>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
import { identifyUmamiSession } from '@jaseeey/vue-umami-plugin';

const handleLogin = async () => {
  try {
    // Realiza una solicitud POST al servidor para iniciar sesión
    const response = await axios.post('http://localhost:4000/login', {
      email: email.value,
      password: password.value,
    })
    identifyUmamiSession({
      email: email.value,
    });
    console.log(response.data)
    // Almacena el token recibido en el localStorage del navegador
    localStorage.setItem('token', response.data.token)
    // Redirige al usuario a la ruta '/Scritps' después de iniciar sesión
    router.push('/')
  } catch (error) {
    // Muestra un mensaje de error si la solicitud falla
    errorMessage.value = 'Error al iniciar sesión. Por favor, verifica tus credenciales.'
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background: #ffffff;
  color: #000000;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background: #0d9722;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: large;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}
</style>
