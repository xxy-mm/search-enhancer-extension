import type { Meta, StoryObj } from '@storybook/react'

import { Popup } from './Popup'

const meta: Meta<typeof Popup> = {
  component: Popup,
  parameters: {
    layout: 'centered',
  },
  args: {
    sites: [
      { domain: 'abc.com', isActive: false },
      { domain: 'abd.com', isActive: true },
    ],
  },
}

export default meta

type Story = StoryObj<typeof Popup>

export const Basic: Story = { args: {} }
