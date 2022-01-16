import { ru } from '@braid/vue-formulate-i18n'

export default {
  plugins: [ru],
  locale: 'ru',
  rules: {
    foobar: ({ value }) => ['foo', 'bar'].includes(value)
  }
}
