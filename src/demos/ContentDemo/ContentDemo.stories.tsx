import type { Meta, StoryObj } from '@storybook/react'

import { ContentDemo } from './ContentDemo'

const meta: Meta<typeof ContentDemo> = {
  component: ContentDemo,
  parameters: {
    layout: 'centered',
  },
  args: {},
}

export default meta

type Story = StoryObj<typeof ContentDemo>

export const Basic: Story = { args: {} }
