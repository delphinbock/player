// Redux
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { RootState } from '@redux/store'

// Testing library
import { render, screen } from '@testing-library/react'

// Component
import ErrorDisplay from '@atoms/ErrorDisplay'

// Mock Redux store
const mockStore = configureStore<Partial<RootState>>([])

describe('ErrorDisplay', () => {
  // Default store
  let store: ReturnType<typeof mockStore>

  beforeEach(() => {
    store = mockStore({
      player: {
        playing: false,
        loading: false,
        error: 'Test error message',
        logo: '',
        radioList: [],
        volume: 0.5,
        counter: { sec: '00', min: '00', hour: '00' },
        currentRadioUrl: '',
        audioRef: null,
      },
    })
  })

  // Test error
  test('renders error message and Counter component when there is an error', () => {
    render(
      <Provider store={store}>
        <ErrorDisplay error={''} />
      </Provider>
    )

    // Check text on screen
    expect(screen.getByText(/Player will be reset in/)).toBeInTheDocument()
    expect(screen.getByText('☹️​ Test error message')).toBeInTheDocument()
    expect(screen.getByText(/seconds/)).toBeInTheDocument()
  })

  // Test no error
  test('does not render error message or Counter component when there is no error', () => {
    // Default store
    store = mockStore({
      player: {
        playing: false,
        loading: false,
        error: '',
        logo: '',
        radioList: [],
        volume: 0.5,
        counter: { sec: '00', min: '00', hour: '00' },
        currentRadioUrl: '',
        audioRef: null,
      },
    })

    render(
      <Provider store={store}>
        <ErrorDisplay error={''} />
      </Provider>
    )

    // Check no text on screen
    expect(screen.queryByText(/Player will be reset in/)).not.toBeInTheDocument()
    expect(screen.queryByText('☹️​')).not.toBeInTheDocument()
  })
})
