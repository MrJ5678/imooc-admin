import store from '@/store';
import i18n from '@/i18n';
import { watch } from 'vue';

export function genTitle(title) {
  return i18n.global.t('route.' + title);
}

export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach(cb => cb(store.getters.language));
    }
  );
}
