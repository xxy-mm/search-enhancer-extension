import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './Select'
import { fn } from '@storybook/test'

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {
    layout: 'centered',
  },
  args: {
    value: 'all',
    options: [
      { label: 'File Type', value: 'all' },
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    onChange: fn(),
  },
}

export default meta

type Story = StoryObj<typeof Select>

export const Basic: Story = {}
