import {
  FILTER_OPTION_DEFAULT,
  type IFilter,
  type IFilterOptions,
} from '@/models/base'

// filter options
export const FILETYPE_FILTER_OPTIONS: IFilterOptions = [
  { label: 'Filetype', value: FILTER_OPTION_DEFAULT },
  { label: 'PDF', value: 'pdf' },
  { label: 'Word', value: 'doc,docx' },
  { label: 'Excel', value: 'xls,xlsx' },
  { label: 'PPT', value: 'ppt,pptx' },
]

export const fileTypeFilter: IFilter = {
  name: 'filetype',
  options: FILETYPE_FILTER_OPTIONS,
  value: FILTER_OPTION_DEFAULT,
}
