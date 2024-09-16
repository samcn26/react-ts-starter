import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Counter from './Counter.tsx'

describe('Counter Component', () => {
  it('renders with initial count 0', () => {
    render(<Counter />)
    const countText = screen.getByText(/Current count: 0/i)
    expect(countText).toBeInTheDocument() // 验证初始计数器文本
  })

  it('increments count when button is clicked', async () => {
    render(<Counter />)
    const button = screen.getByRole('button', { name: /increment/i })

    // 使用 act 包裹状态更新的操作
    await userEvent.click(button) // 模拟用户点击按钮

    const updatedCountText = screen.getByText(/Current count: 1/i)
    expect(updatedCountText).toBeInTheDocument() // 验证计数器被增加
  })
})
