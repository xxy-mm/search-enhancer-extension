import {
  FILTER_OPTION_DEFAULT,
  type IFilter,
  type IFilterOptions,
} from '../models/base'

export const languages = {
  Afrikaans: 'lang_af',
  Arabic: 'lang_ar',
  Armenian: 'lang_hy',
  Belarusian: 'lang_be',
  Bulgarian: 'lang_bg',
  Catalan: 'lang_ca',
  'Chinese(Simplified)': 'lang_zh-CN',
  'Chinese(Traditional)': 'lang_zh-TW',
  Croatian: 'lang_hr',
  Czech: 'lang_cs',
  Danish: 'lang_da',
  Dutch: 'lang_nl',
  English: 'lang_en',
  Esperanto: 'lang_eo',
  Estonian: 'lang_et',
  Filipino: 'lang_tl',
  Finnish: 'lang_fi',
  French: 'lang_fr',
  German: 'lang_de',
  Greek: 'lang_el',
  Hebrew: 'lang_iw',
  Hindi: 'lang_hi',
  Hungarian: 'lang_hu',
  Icelandic: 'lang_is',
  Indonesian: 'lang_id',
  Italian: 'lang_it',
  Japanese: 'lang_ja',
  Korean: 'lang_ko',
  Latvian: 'lang_lv',
  Lithuanian: 'lang_lt',
  Norwegian: 'lang_no',
  Persian: 'lang_fa',
  Polish: 'lang_pl',
  Portuguese: 'lang_pt',
  Romanian: 'lang_ro',
  Russian: 'lang_ru',
  Serbian: 'lang_sr',
  Slovak: 'lang_sk',
  Slovenian: 'lang_sl',
  Spanish: 'lang_es',
  Swahili: 'lang_sw',
  Swedish: 'lang_sv',
  Thai: 'lang_th',
  Turkish: 'lang_tr',
  Ukrainian: 'lang_uk',
  Vietnamese: 'lang_vi',
}

const languageOptions: IFilterOptions = Object.entries(languages).map(
  ([label, value]) => {
    return { label, value }
  }
)
languageOptions.unshift({
  label: 'Language',
  value: FILTER_OPTION_DEFAULT,
})

const languageFilter: IFilter = {
  name: 'lr',
  options: languageOptions,
  value: FILTER_OPTION_DEFAULT,
}

export { languageOptions, languageFilter }
