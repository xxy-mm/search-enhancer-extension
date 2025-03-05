import type { Meta, StoryObj } from '@storybook/react'

import { PopupDemo } from './PopupDemo'

const meta: Meta<typeof PopupDemo> = {
  component: PopupDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
}

export default meta

type Story = StoryObj<typeof PopupDemo>

export const Basic: Story = { args: {} }
