import { genColors } from '@/utils/theme';
import { getItem } from '@/utils/storage';
import { MAIN_COLOR } from '@/constant';

const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}';
  },

  cssVar: state => ({
    ...state.theme.variables,
    ...genColors(getItem(MAIN_COLOR))
  }),
  sidebarOpened: state => state.app.sidebarOpened,
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor,
  tagsViewList: state => state.app.tagsViewList
};

export default getters;
