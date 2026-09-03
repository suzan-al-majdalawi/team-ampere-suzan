<template>
  <div>
    <h1>Mina uppgifter</h1>

    <div v-if="store.user" class="card" style="max-width: 560px">
      <div class="field">
        <span class="field-label">Kundnummer</span>
        <span>{{ store.user.customerNo }}</span>
      </div>

      <label for="profile-name">Namn</label>
      <input id="profile-name" type="text" v-model="name" />

      <label for="profile-email">E-post</label>
      <input id="profile-email" type="email" v-model="email" />

      <p v-if="emailError" class="error">{{ emailError }}</p>

      <label for="profile-address">Adress</label>
      <input id="profile-address" type="text" v-model="address" />

      <AppButton color="#12b76a" @click="save"> Spara ändringar </AppButton>

      <button class="button-secondary" style="margin-left: 10px" @click="reset">
        Ångra
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AppButton from "../components/AppButton.vue";
import { useUserStore } from "../stores/user";

const store = useUserStore();

const name = ref("");
const email = ref("");
const address = ref("");
const emailError = ref("");

const reset = () => {
  name.value = store.user.name;
  email.value = store.user.email;
  address.value = store.user.address;
  emailError.value = "";
};

const save = () => {
  emailError.value = "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = "Ange en giltig e-postadress";
    return;
  }

  store.save({
    name: name.value,
    email: email.value,
    address: address.value,
  });
};

onMounted(async () => {
  if (!store.user) await store.load();
  reset();
});
</script>

<style scoped>
.field {
  display: flex;
  justify-content: space-between;
  padding: 8px 0 14px;
  font-size: 14px;
}

.field-label {
  color: #7c8698;
}

.error {
  color: red;
  margin: 4px 0 12px;
}
</style>
