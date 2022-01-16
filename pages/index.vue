<template>
  <div class="layout">
    <div class="container">
      <div class="card rounded">
        <div class="card-header">
          Форма заказа оборудования
        </div>
        <div class="card-body">
          <FormulateForm
            #default="{ hasErrors }"
          >
            <FormulateInput
              type="email"
              v-model="email"
              validation="required|email"
              label="Твой email"
              validation-behavior="live"
            />
            <FormulateInput
              v-model="equip_type"
              :options="equipTypeList"
              v-on:input="updateEquip"
              type="select"
              validation="required"
              placeholder="Выбери тип оборудования"
              label="Тип оборудования"
              validation-behavior="live"
            />
            <FormulateInput
              v-if="equip_type !== 'Другое'"
              v-model="equip"
              :options="equipList"
              type="select"
              validation="required"
              placeholder="Выбери оборудования"
              label="Оборудование"
              validation-behavior="live"
            />
            <FormulateInput
              v-else
              type="text"
              validation="required"
              v-model="equip"
              label="Напиши, какое оборудование требуется"
              validation-behavior="live"
            />
            <FormulateInput
              v-model="ship"
              :options="shipList"
              type="select"
              validation="required"
              placeholder="Выбери способ выдачи"
              label="Способ выдачи"
              validation-behavior="live"
            />
            <FormulateInput
              v-model="count"
              type="number"
              validation="required|number|between:0,3"
              min="1"
              max="2"
              label="Количество"
              validation-behavior="live"
            />
            <FormulateInput
              v-on:click="sendRequest"
              type="button"
              label="Заказать"
              :disabled="hasErrors"
            />
            <FormulateErrors/>
          </FormulateForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      equipTypeList: ['Ноутбук', 'Монитор', 'Клавиатура', 'Другое'],
      shipList: ['Самовывоз', 'Доставка'],
      equipList: [],
      noteBooksList: ['MacBook Air', 'Lenovo Thinkpad'],
      monitorsList: ['DELL UltraSharp UP3221Q 31.5', 'Acer ConceptD CP7271KP 27', 'ASUS ProArt PA329CV 32'],
      keyboardsList: ['Apple Keyboard', 'Keychron K2'],
      email: '',
      equip_type: '',
      equip: '',
      count: '1',
      ship: '',
    }
  },
  methods: {
    updateEquip() {
      const v = this.equip_type
      if (v == 'Ноутбук') {
        this.equipList = this.noteBooksList
      } else if (v == 'Монитор') {
        this.equipList = this.monitorsList
      } else if (v == 'Клавиатура') {
        this.equipList = this.keyboardsList
      } else {
        this.equipList = []
      }
      console.log(this.equipList)
    },
    async sendRequest() {
      const json = JSON.stringify({
        'email': this.email,
        'equip_type': this.equip_type,
        'equip': this.equip,
        'count': this.count,
        'ship': this.ship
      })
      return await this.$axios.post('http://localhost:8000/requestEquipment', json)
        .then(res => {
          this.$router.push('/success')
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
}
</script>
