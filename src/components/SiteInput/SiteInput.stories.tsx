import type { Meta, StoryObj } from '@storybook/react'

import { SiteInput } from './SiteInput'
import { fn } from '@storybook/test'

const meta: Meta<typeof SiteInput> = {
  component: SiteInput,
  parameters: {
    layout: 'centered',
  },

  args: {
    onEnter: fn(),
    onChange: fn(),
  },
}

export default meta

type Story = StoryObj<typeof SiteInput>

export const Basic: Story = {
  args: {
    placeholder: 'type a site then press enter',
  },
}
