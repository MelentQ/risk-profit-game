<script setup>
import {InputNumber, Button, FloatLabel} from 'primevue';
import {ref} from "vue";
import state from "@/state.js";

const probability = ref(0.5);
const playersCount = ref(100);
const winPercent = ref(55);
const losePercent = ref(45);
const startBalance = ref(100);
const betPercent = ref(100);
const gamesCount = ref(1000);

const start = async () => {
  state.result = [];

  const players = [];

  for (let j = 0; j < playersCount.value; j++) {
    players[j] = startBalance.value;
  }

  state.result.push({
    x: 1,
    y: startBalance.value,
  });

  for (let i = 1; i < gamesCount.value; i++) {
    for (let j = 0; j < playersCount.value; j++) {
      const isWin = Math.random() >= probability.value;

      const bet = players[j] * betPercent.value / 100;

      const profit = isWin
          ? bet * winPercent.value / 100
          : -1 * bet * losePercent.value / 100;

      players[j] = players[j] + profit;
    }

    state.result.push({
      x: i + 1,
      y: players.reduce((sum, balance) => sum + balance, 0) / playersCount.value,
    });
  }
}
</script>

<template>
  <form @submit.prevent="start" class="form">
    <FloatLabel variant="in">
      <InputNumber v-model.number="probability" :max-fraction-digits="2" required style="width: 100%;"/>
      <label>Вероятность успеха</label>
    </FloatLabel>
    <FloatLabel variant="in" v-tooltip.left="'Данные для всех игроков усредняются'">
      <InputNumber v-model.number="playersCount" required style="width: 100%;"/>
      <label>Количество игроков</label>
    </FloatLabel>
    <FloatLabel variant="in">
      <InputNumber v-model.number="winPercent" :max-fraction-digits="2" required style="width: 100%;"/>
      <label>Какой % получишь при выигрыше</label>
    </FloatLabel>
    <FloatLabel variant="in">
      <InputNumber v-model.number="losePercent" :max-fraction-digits="2" required style="width: 100%;"/>
      <label>Какой % отдашь при проигрыше</label>
    </FloatLabel>
    <FloatLabel variant="in">
      <InputNumber v-model.number="startBalance" required style="width: 100%;"/>
      <label>Начальный баланс</label>
    </FloatLabel>
    <FloatLabel variant="in">
      <InputNumber v-model.number="betPercent" required style="width: 100%;"/>
      <label>Какой % от баланса ставим на каждую игру</label>
    </FloatLabel>
    <FloatLabel variant="in">
      <InputNumber v-model.number="gamesCount" required style="width: 100%;"/>
      <label>Количество игр</label>
    </FloatLabel>
    <Button type="submit">Начать</Button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
