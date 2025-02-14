import {
  FILTER_OPTION_DEFAULT,
  type IFilter,
  type IFilterOptions,
} from '@/models/base'

// filter options
export const FILETYPE_FILTER_OPTIONS: IFilterOptions = [
  { label: 'All File Types', value: FILTER_OPTION_DEFAULT },
  { label: 'PDF(.pdf)', value: 'pdf' },
  { label: 'Word(.doc,.docx)', value: 'doc,docx' },
  { label: 'Excel(.xls,.xlsx)', value: 'xls,xlsx' },
  { label: 'PPT(.ppt,.pptx)', value: 'ppt,pptx' },
  { label: 'Adobe Postscript(.ps)', value: 'ps' },
  { label: 'Rich Text Format(.rtf)', value: 'rtf' },
  { label: 'Google Earth KML(.kml)', value: 'kml' },
]

export const fileTypeFilter: IFilter = {
  name: 'filetype',
  options: FILETYPE_FILTER_OPTIONS,
  value: FILTER_OPTION_DEFAULT,
}
