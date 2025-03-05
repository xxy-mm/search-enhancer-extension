import type { Meta, StoryObj } from '@storybook/react'

import { SiteItem } from './SiteItem'

const meta: Meta<typeof SiteItem> = {
  component: SiteItem,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof SiteItem>

export const Basic: Story = {
  args: {
    site: { domain: 'abc.com', isActive: false },
  },
}

export const Active: Story = {
  args: {
    site: {
      domain: 'abc.com',
      isActive: true,
    },
  },
}
export const Disabled: Story = {
  args: {
    site: {
      domain: 'abc.com',
      isActive: true,
    },
  },
}
