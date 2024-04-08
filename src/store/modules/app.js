import { getItem, setItem } from '@/utils/storage';
import { LANG } from '@/constant';
import { TAGS_VIEW } from '@/constant';

export default {
  namespaced: true,

  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),

  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
    setLanguage(state, lang) {
      setItem(LANG, lang);
      state.language = lang;
    },
    // 添加 tags
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find(item => item.path === tag.path);
      if (!isFind) {
        state.tagsViewList.push(tag);
        setItem(TAGS_VIEW, state.tagsViewList);
      }
    },
    // 为指定的 tag 修改 title
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag;
      setItem(TAGS_VIEW, state.tagsViewList);
    },
    /**
     *
     * @param {*} payload {type: 'other' || 'right' || 'index'}
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1);
      } else if (payload.type === 'other') {
        state.tagsViewList = state.tagsViewList.filter(
          (_, i) => payload.index === i
        );
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        );
      }
      setItem(TAGS_VIEW, state.tagsViewList);
    }
  }
};
