import { vi } from 'vitest'

vi.mock('fs', () => ({
  default: {
    readFileSync: (path) => {
      if (path.includes('public.pem')) return 'MOCK_PUBLIC_KEY'
      return ''
    }
  }
}))

vi.spyOn(console, 'error').mockImplementation(() => {})
